import importlib.util
import json
import os
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('watch', Path(__file__).with_name('watch.py'))
watch = importlib.util.module_from_spec(spec)
spec.loader.exec_module(watch)


class RecorderTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        self.proc = self.root / 'proc'
        (self.proc / 'self').mkdir(parents=True)
        (self.proc / 'self/cgroup').write_text('0::/tenant\n')
        (self.proc / 'meminfo').write_text('MemTotal: 2048000 kB\nMemAvailable: 204800 kB\nSwapTotal: 1024000 kB\nSwapFree: 512000 kB\n')
        self.cg = self.root / 'cg'
        self.tenant = self.cg / 'tenant'
        self.tenant.mkdir(parents=True)
        for p, limit, used in [(self.cg, 1024, 900), (self.tenant, 2048, 700)]:
            (p / 'memory.max').write_text(str(limit))
            (p / 'memory.current').write_text(str(used))
            (p / 'memory.events').write_text('oom_kill 7\n')
        self.out = self.root / 'out'
        self.out.mkdir()
        pid = self.proc / '123'
        pid.mkdir()
        uid = os.getuid() if hasattr(os, 'getuid') else 1000
        (pid / 'status').write_text(f'Uid:\t{uid}\nPPid:\t1\nVmRSS:\t1234 kB\nVmSwap:\t20 kB\n')
        stat = ['0'] * 40
        stat[19] = '999'
        (pid / 'stat').write_text('123 (node weird)) ' + ' '.join(stat))
        (pid / 'cmdline').write_bytes(b'/usr/bin/node\0/home/bot/index.js\0--token=secret\0')

    def tearDown(self):
        self.temp.cleanup()

    def test_strictest_ancestor_limit_and_safe_process_origin(self):
        cg = watch.cgroup_memory(self.proc, self.cg)
        self.assertEqual(cg['limit'], 1024)
        self.assertEqual(cg['used'], 900)
        rows = watch.process_rows(self.proc)
        self.assertEqual(rows[0]['script'], 'index.js')
        self.assertEqual(rows[0]['rss'], 1234 * 1024)
        self.assertNotIn('secret', json.dumps(rows))

    def test_oom_keeps_pre_crash_evidence_after_bot_disappears(self):
        report = dict(pid=123, role='bot', at=1000000, memory={'rss': 500}, active=[{'source': ['task.js:12']}])
        (self.out / 'task-123.json').write_text(json.dumps(report))
        r = watch.Recorder(self.out, self.proc, self.cg, self.root)
        first = r.sample(1000)
        self.assertEqual(first['current']['botPid'], 123)
        (self.cg / 'memory.events').write_text('oom_kill 8\n')
        for p in (self.proc / '123').iterdir():
            p.unlink()
        (self.proc / '123').rmdir()
        result = r.sample(1002)
        oom = next(e for e in result['incidents'] if e['kind'] == 'oom')
        self.assertEqual(oom['before'][0]['tasks'][0]['active'][0]['source'], ['task.js:12'])
        self.assertIsNone(result['current']['botPid'])
        reloaded = watch.Recorder(self.out, self.proc, self.cg, self.root)
        self.assertEqual(len(reloaded.incidents), len(result['incidents']))

    def test_watcher_restart_preserves_oom_comparison_and_pre_crash_window(self):
        r = watch.Recorder(self.out, self.proc, self.cg, self.root)
        r.sample(1000)
        (self.cg / 'memory.events').write_text('oom_kill 9\n')
        restarted = watch.Recorder(self.out, self.proc, self.cg, self.root)
        result = restarted.sample(1002)
        oom = next(e for e in result['incidents'] if e['kind'] == 'oom')
        self.assertIn('2 arrêt', oom['text'])
        self.assertEqual(oom['before'][0]['at'], 1000000)

    def test_minute_peak_and_bounded_incidents(self):
        r = watch.Recorder(self.out, self.proc, self.cg, self.root)
        r.sample(1000)
        (self.cg / 'memory.current').write_text('950')
        r.sample(1002)
        (self.cg / 'memory.current').write_text('500')
        r.sample(1004)
        self.assertEqual(r.history[-1]['used'], 950)
        for i in range(40):
            (self.cg / 'memory.events').write_text(f'oom_kill {9+i}\n')
            r.sample(1006+i*2)
        self.assertLessEqual(len(r.incidents), 12)
        self.assertLess((self.out / 'summary.json').stat().st_size, 2 * 1024 * 1024)


if __name__ == '__main__':
    unittest.main()
