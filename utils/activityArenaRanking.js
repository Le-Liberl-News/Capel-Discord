const dayOf = at => new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Paris',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(at));
const reward = row => row.wins ? Math.min(20,5+3*Math.max(0,row.streak-1)) : 0;
function createArenaRanking({store,credit,now=Date.now}) {
 const data=store.load()??{days:{},results:{}}; const save=()=>store.save(data);
 return {
  record(event) {
   if(data.results[event.captureId])return;
   const day=dayOf(event.at), rows=data.days[day]??={};
   for(const [user,name,win] of [[event.winner,event.winnerName,true],[event.loser,event.loserName,false]]) {
    const row=rows[user]??={name,wins:0,streak:0,delta:0};const before=reward(row);
    row.name=name;row.wins+=Number(win);row.streak=win?row.streak+1:Math.max(0,row.streak-2);row.lastWin=win;row.delta=reward(row)-before;
   }
   data.results[event.captureId]=true;save();
  },
  rows(day=dayOf(now())) {return Object.entries(data.days[day]??{}).map(([user,row])=>({user,...row,pb:reward(row)}));},
  async settle() {for(const [day,rows] of Object.entries(data.days))if(day<dayOf(now()))for(const [user,row] of Object.entries(rows))if(!row.paid){await credit(day,user,reward(row));row.paid=true;save();}}
 };
}
function createArenaCredit(db) {
 let ready;
 return async(day,user,amount)=>{
  ready??=db.query('CREATE TABLE IF NOT EXISTS activity_arena_awards (day DATE NOT NULL, user_id VARCHAR(32) NOT NULL, amount INT NOT NULL, PRIMARY KEY(day,user_id))').catch(e=>{ready=null;throw e;});await ready;
  const connection=await db.getConnection();
  try {await connection.beginTransaction();const [result]=await connection.query('INSERT IGNORE INTO activity_arena_awards(day,user_id,amount) VALUES(?,?,?)',[day,user,amount]);
   if(result.affectedRows&&amount)await connection.query("INSERT INTO users_stats(user_id,xp,niveau) VALUES(?,?,'Classe 10') ON DUPLICATE KEY UPDATE xp=xp+VALUES(xp)",[user,amount]);
   await connection.commit();
  }catch(e){await connection.rollback();throw e;}finally{connection.release();}
 };
}
module.exports={createArenaRanking,createArenaCredit,reward,dayOf};
