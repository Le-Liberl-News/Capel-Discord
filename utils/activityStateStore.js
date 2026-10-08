const fs=require("node:fs"),path=require("node:path");
function createActivityStateStore(file) {
 return {
  load() { if (!file || !fs.existsSync(file)) return null; return JSON.parse(fs.readFileSync(file,"utf8")); },
  save(data) { if (!file) return; fs.mkdirSync(path.dirname(file),{recursive:true,mode:0o700}); fs.writeFileSync(file+".tmp",JSON.stringify(data),{mode:0o600}); fs.renameSync(file+".tmp",file); }
 };
}
module.exports={createActivityStateStore};
