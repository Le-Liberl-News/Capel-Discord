// The finale's film, made on this computer (never on the bot's server): waits for the siege to end, fetches the
// moments finale-archive.cjs kept, renders the cinematic from them (render-finale.cjs), squeezes it for the web and
// publishes it on the site, where the bot finds it and posts the last word (discord.cjs).
//   node finale-tonight.cjs [--site https://leliberlnews.fr/activite/api.php] [--website E:/dev/Website] [--music file]
// Env: as render-finale.cjs (PLAYWRIGHT, FFMPEG, NODE_PATH).
const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const args=process.argv.slice(2),flag=(name,fallback)=>{const i=args.indexOf('--'+name);return i<0?fallback:args[i+1];};
const site=flag('site','https://leliberlnews.fr/activite/api.php'),website=flag('website','E:/dev/Website'),music=flag('music','E:/To be continued!.mp3');
const work=path.resolve(__dirname,'../../../.runtime/finale'),ffmpeg=process.env.FFMPEG??require('ffmpeg-static');
const log=(...a)=>console.log(new Date().toLocaleTimeString('fr-FR'),...a);
const get=async route=>{for(let i=0;;i++){try{const r=await fetch(site+'?r='+route,{cache:'no-store'});if(r.ok)return r.json();throw Error(r.status+' '+route);}catch(e){if(i>=4)throw e;await new Promise(r=>setTimeout(r,5000));}}};
const run=(cmd,list,options={})=>{const r=spawnSync(cmd,list,{stdio:'inherit',...options});if(r.status)throw Error(cmd+' '+list.join(' ')+' : '+r.status);};

(async()=>{
 fs.mkdirSync(work,{recursive:true});
 // 1. the siege ends with the finale
 for(;;){const s=await get('siege/status').catch(e=>(log('statut :',e.message),null));if(s?.stopped&&s.finale)break;log('en attente de la fin du siège',s?.finale?'(film à '+new Date(s.finale.cinematicAt).toLocaleTimeString('fr-FR')+')':'');await new Promise(r=>setTimeout(r,60000));}
 // 2. the moments: the scene from the one nearest the film's start, the scores from the last
 const {moments}=await get('siege/finale');if(!moments?.length)throw Error('Aucun moment archivé.');
 const status=await get('siege/status'),start=status.finale.cinematicAt;
 const nearest=moments.reduce((best,at,i)=>Math.abs(at-start)<Math.abs(moments[best]-start)?i:best,0);
 const scene=await get('siege/finale&i='+nearest),last=await get('siege/finale&i='+(moments.length-1));
 const base={...scene,stats:last.stats,participants:last.participants};
 const file=path.join(work,'base.json');fs.writeFileSync(file,JSON.stringify(base));log('moment',nearest+1,'/',moments.length,'joueurs',base.view.players.length);
 // 3. the film, then its web copy
 const raw=path.join(work,'finale-raw.mp4'),web=path.join(work,'sanktheim-finale.mp4');
 run(process.execPath,[path.join(__dirname,'render-finale.cjs'),file,raw,'--music',music,'--fps','30','--size','1920x1080']);
 run(ffmpeg,['-v','error','-y','-i',raw,'-c:v','libx264','-preset','slow','-crf','24','-maxrate','4.5M','-bufsize','9M','-pix_fmt','yuv420p','-c:a','copy','-movflags','+faststart',web]);
 log('film',Math.round(fs.statSync(web).size/1048576),'Mo');
 // 4. online: the activity's own deployment carries it (the bot posts once it answers)
 const target=path.join(website,'activite/media/sanktheim-finale.mp4');fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(web,target);
 const git=list=>run('git',['-C',website,...list]);
 git(['add','activite/media/sanktheim-finale.mp4']);git(['commit','-m','[activity-only] Sanktheim: the finale\'s film']);git(['pull','--rebase','--autostash','origin','main']);git(['push','origin','HEAD:main']);
 log('publié : https://leliberlnews.fr/activite/media/sanktheim-finale.mp4');
})().catch(e=>{console.error(e);process.exit(1);});
