"""Bounded independent Linux memory recorder. No dependency on Node, Discord or SQL."""
import argparse
import collections
try:
    import fcntl
except ImportError:
    fcntl = None
import json
import os
from pathlib import Path
import secrets
import shutil
import time

MIB = 1024 * 1024
ROOT = Path(__file__).resolve().parents[2]


def read(path, default=''):
    try:
        return Path(path).read_text().strip()
    except (OSError, ValueError):
        return default


def fields(text):
    result = {}
    for line in text.splitlines():
        cells = line.replace(':', '').split()
        if len(cells) >= 2:
            try:
                result[cells[0]] = int(cells[1])
            except ValueError:
                pass
    return result


def number(path):
    value = read(path)
    return int(value) if value.isdigit() and int(value) < 2 ** 60 else None


def cgroup_memory(proc=Path('/proc'), mounts=Path('/sys/fs/cgroup')):
    # Check the process cgroup and its ancestors: an ancestor can enforce the actual limit.
    relative = next((line.split(':', 2)[2] for line in read(proc / 'self/cgroup').splitlines()
                     if line.startswith('0::')), '/')
    candidates = []
    p = mounts / relative.lstrip('/')
    if not p.exists():
        p = mounts
    while p == mounts or mounts in p.parents:
        limit, usage = number(p / 'memory.max'), number(p / 'memory.current')
        if usage is not None:
            candidates.append(dict(scope=str(p), used=usage, limit=limit,
                                   peak=number(p / 'memory.peak'),
                                   events=fields(read(p / 'memory.events')),
                                   swapUsed=number(p / 'memory.swap.current'),
                                   swapLimit=number(p / 'memory.swap.max')))
        if p == mounts:
            break
        p = p.parent
    limited = [c for c in candidates if c['limit']]
    selected = min(limited, key=lambda c: c['limit']) if limited else (candidates[0] if candidates else None)
    if selected:
        selected['eventScopes'] = {c['scope']: c['events'] for c in candidates}
        return selected
    # cgroup v1 fallback.
    p = mounts / 'memory'
    usage = number(p / 'memory.usage_in_bytes')
    if usage is not None:
        return dict(scope=str(p), used=usage, limit=number(p / 'memory.limit_in_bytes'),
                    peak=number(p / 'memory.max_usage_in_bytes'),
                    events={'failcnt': number(p / 'memory.failcnt') or 0})
    return None


def process_rows(proc=Path('/proc'), uid=None, root=ROOT):
    uid = (os.getuid() if hasattr(os, 'getuid') else 1000) if uid is None else uid
    result = []
    for directory in proc.iterdir():
        if not directory.name.isdigit():
            continue
        try:
            status = read(directory / 'status')
            user = next(line.split()[1] for line in status.splitlines() if line.startswith('Uid:'))
            if int(user) != uid:
                continue
            info = fields(status)
            stat = read(directory / 'stat').rsplit(')', 1)[1].split()
            # Never store arbitrary command arguments (tokens, messages, database credentials).
            command = (directory / 'cmdline').read_bytes().split(b'\0')
            executable = Path(command[0].decode(errors='replace')).name if command else '?'
            scripts = []
            for raw in command[1:]:
                arg = raw.decode(errors='replace')
                if arg.endswith(('.js', '.cjs', '.mjs', '.py')) and not arg.startswith('-'):
                    scripts.append(str(Path(arg).name)[:100])
            result.append(dict(pid=int(directory.name), ppid=info.get('PPid'), name=executable[:80],
                               script=scripts[0] if scripts else None, rss=info.get('VmRSS', 0) * 1024,
                               swap=info.get('VmSwap', 0) * 1024, start=stat[19],
                               cpuTicks=int(stat[11]) + int(stat[12])))
        except (OSError, ValueError, IndexError, StopIteration):
            continue
    return sorted(result, key=lambda r: r['rss'], reverse=True)


def atomic(path, data):
    temp = path.with_suffix('.tmp')
    with temp.open('w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, separators=(',', ':'))
    os.chmod(temp, 0o600)
    temp.replace(path)


def telemetry(directory, processes, now):
    active = {row['pid'] for row in processes}
    reports = []
    for path in list(directory.glob('task-*.json'))[:256]:
        try:
            if path.stat().st_size > 256 * 1024:
                continue
            data = json.loads(path.read_text(encoding='utf-8'))
            pid = int(data['pid'])
            if now - data['at'] / 1000 > 24 * 3600:
                path.unlink(missing_ok=True)
                continue
            data['alive'] = pid in active
            reports.append(data)
        except (OSError, ValueError, KeyError, TypeError):
            continue
    return sorted(reports, key=lambda r: r['at'], reverse=True)[:16]


class Recorder:
    def __init__(self, directory, proc=Path('/proc'), cgroup=Path('/sys/fs/cgroup'), root=ROOT):
        self.directory, self.proc, self.cgroup, self.root = directory, proc, cgroup, root
        self.history = collections.deque(maxlen=1440)
        self.recent = collections.deque(maxlen=30)
        self.incidents = collections.deque(maxlen=12)
        self.previous = None
        self.last_minute = None
        try:
            saved = json.loads((directory / 'summary.json').read_text(encoding='utf-8'))
            self.history.extend(saved.get('history', []))
            self.incidents.extend(saved.get('incidents', []))
            self.recent.extend(saved.get('recent', []))
            self.previous = saved.get('current')
            if self.history:
                self.last_minute = int(self.history[-1]['at'] // 60000)
        except (OSError, ValueError):
            pass

    def sample(self, now=None):
        now = time.time() if now is None else now
        host = fields(read(self.proc / 'meminfo'))
        cg = cgroup_memory(self.proc, self.cgroup)
        rows = process_rows(self.proc, root=self.root)
        reports = telemetry(self.directory, rows, now)
        disk = shutil.disk_usage(self.root)
        bot_pid = next((r['pid'] for r in reports if r.get('role') == 'bot' and r.get('alive')), None)
        current = dict(at=round(now * 1000), memory=cg,
                       host=dict(total=host.get('MemTotal', 0) * 1024,
                                 available=host.get('MemAvailable', 0) * 1024,
                                 swapUsed=(host.get('SwapTotal', 0) - host.get('SwapFree', 0)) * 1024),
                       disk=dict(total=disk.total, free=disk.free), processes=rows[:48],
                       tasks=reports, botPid=bot_pid, watcherPid=os.getpid())
        compact = dict(at=current['at'], memory=cg, host=current['host'], botPid=bot_pid,
                       top=rows[:8], tasks=[dict(pid=r['pid'], at=r['at'], memory=r.get('memory'),
                           active=r.get('active', [])[-4:], recent=r.get('recent', [])[-3:],
                           children=r.get('children', [])[-4:], allocations=r.get('allocations', [])[:3])
                          for r in reports[:2]])
        events = []
        if self.previous:
            previous_cg = self.previous['memory'] or {}
            for scope, counts in (cg or {}).get('eventScopes', {}).items():
                before = previous_cg.get('eventScopes', {}).get(scope, {})
                delta = counts.get('oom_kill', 0) - before.get('oom_kill', 0)
                if delta > 0:
                    events.append(dict(kind='oom', text=f'{delta} arrêt(s) OOM supplémentaire(s)', scope=scope))
            if self.previous['botPid'] and self.previous['botPid'] != bot_pid:
                events.append(dict(kind='bot-exit', text='Le processus du bot a disparu ou a été remplacé.'))
            high = lambda c: bool(c and c.get('limit') and c['used'] / c['limit'] >= .9)
            if high(cg) and not high(previous_cg):
                events.append(dict(kind='pressure', text='La consommation du groupe a franchi 90 % de sa limite.'))
        for event in events:
            self.incidents.append(dict(**event, at=current['at'], before=list(self.recent)[-12:], current=compact,
                                       evidence='Compteur noyau' if event['kind'] == 'oom' else 'Observation'))
        self.recent.append(compact)
        minute = int(now // 60)
        point = dict(at=current['at'], used=cg['used'] if cg else None, limit=cg['limit'] if cg else None,
                     hostAvailable=current['host']['available'],
                     oom=(cg or {}).get('events', {}).get('oom_kill'),
                     botRss=next((p['rss'] for p in rows if p['pid'] == bot_pid), 0))
        if minute == self.last_minute and self.history:
            # Retain the peak of each minute, not just its last sample.
            if (point['used'] or 0) >= (self.history[-1]['used'] or 0):
                self.history[-1] = point
        else:
            self.history.append(point)
            self.last_minute = minute
        self.previous = compact
        summary = dict(version=1, current=current, history=list(self.history), incidents=list(self.incidents), recent=list(self.recent),
                       note='Le noyau confirme les OOM, pas le processus tué. Les tâches et allocations sont des indices ; les RSS partagés ne doivent pas être additionnés comme une mesure exacte.')
        atomic(self.directory / 'summary.json', summary)
        # Detailed 2-second journal, bounded to roughly 32 MiB; incidents retain their pre-crash window.
        log = self.directory / 'samples.jsonl'
        if log.exists() and log.stat().st_size > 16 * MIB:
            log.replace(self.directory / 'samples.previous.jsonl')
        with log.open('a', encoding='utf-8') as f:
            f.write(json.dumps(compact, ensure_ascii=False, separators=(',', ':')) + '\n')
        os.chmod(log, 0o600)
        return summary


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--directory', type=Path, default=ROOT / '.runtime/diagnostics')
    parser.add_argument('--once', action='store_true')
    args = parser.parse_args()
    if fcntl is None:
        parser.error('Le surveillant indépendant nécessite Linux (/proc et cgroups).')
    args.directory.mkdir(mode=0o700, parents=True, exist_ok=True)
    os.chmod(args.directory, 0o700)
    lock = (args.directory / 'watcher.lock').open('w')
    try:
        fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
    except BlockingIOError:
        raise SystemExit('Un surveillant fonctionne déjà.')
    key = args.directory / 'access.key'
    if not key.exists():
        fd = os.open(key, os.O_CREAT | os.O_EXCL | os.O_WRONLY, 0o600)
        with os.fdopen(fd, 'w') as f:
            f.write(secrets.token_urlsafe(32) + '\n')
    recorder = Recorder(args.directory)
    while True:
        try:
            recorder.sample()
        except Exception as e:
            # Disk full / unreadable process must not kill the independent recorder.
            print(f'Diagnostic: {type(e).__name__}: {e}', flush=True)
        if args.once:
            break
        time.sleep(2)


if __name__ == '__main__':
    main()
