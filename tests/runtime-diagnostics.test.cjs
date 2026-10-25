const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path'),{spawnSync}=require('node:child_process');
test('entry point and deployment always install the independent diagnostics',()=>{
 const index=fs.readFileSync(path.join(__dirname,'../index.js'),'utf8');
 assert.ok(index.startsWith("require('./utils/runtimeDiagnostics').install();"));
 assert.ok(index.includes("app.use(require('./utils/runtimeDiagnostics').middleware)"));
 const deploy=fs.readFileSync(path.join(__dirname,'../.github/workflows/deploy.yml'),'utf8');
 assert.ok(deploy.includes('--name LN-Watch --interpreter python3'));
 assert.ok(deploy.includes('tests/runtime-diagnostics.test.cjs'));
});
test('timers and child processes acquire code origins without manual task names',()=>{
 const directory=fs.mkdtempSync(path.join(os.tmpdir(),'capel-diagnostic-'));
 try{
 const child=spawnSync(process.execPath,[path.join(__dirname,'fixtures/diagnostics-child.cjs')],{env:{...process.env,LN_DIAGNOSTICS_DIR:directory},timeout:15000,encoding:'utf8'});
 assert.equal(child.status,0,child.stderr);
 const file=fs.readdirSync(directory).find(n=>/^task-\d+\.json$/.test(n));assert.ok(file);
 const raw=fs.readFileSync(path.join(directory,file),'utf8'),report=JSON.parse(raw);
 assert.ok(report.memory.rss>0);assert.ok(report.recent.some(t=>t.kind==='setTimeout'&&t.source.some(s=>s.includes('diagnostics-child.cjs'))));
 assert.ok(report.children.some(c=>c.pid&&c.source.some(s=>s.includes('diagnostics-child.cjs'))));
 assert.ok(report.recent.some(t=>t.kind==='media'&&t.source.some(s=>s.includes('diagnostics-child.cjs'))));
 assert.ok(!raw.includes('sensitive-argument-must-not-be-recorded'));
 }finally{fs.rmSync(directory,{recursive:true,force:true});}
});
