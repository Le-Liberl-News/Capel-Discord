// Compact room history, independent of the recent Discord/media feed. Bounds also apply after restarts.
const MAX_LINES=4000,MAX_BYTES=512*1024;
const size=line=>Buffer.byteLength(JSON.stringify(line),'utf8');
function create(lines=[],partial=false){const history={lines:[],bytes:0,partial:!!partial};for(const line of lines)append(history,line);return history;}
function append(history,line){
 if(!['command','reply'].includes(line.kind)||line.room==null)return;
 const text=String(line.text??''),entry={at:line.at,kind:line.kind,room:String(line.room),text:text.slice(0,line.kind==='command'?2000:8000)};
 if(entry.text.length<text.length)entry.truncated=true;
 history.lines.push(entry);history.bytes+=size(entry);
 while(history.lines.length>MAX_LINES||history.bytes>MAX_BYTES){history.bytes-=size(history.lines.shift());history.partial=true;}
 // Never associate an orphan reply with a later command.
 while(history.partial&&history.lines[0]?.kind==='reply'){history.bytes-=size(history.lines.shift());}
}
module.exports={create,append,MAX_LINES,MAX_BYTES};
