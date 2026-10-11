import test from "node:test";import assert from "node:assert/strict";import {fetchJson,retryConnection,ApiError} from "../activity/network.mjs";
test("HTML outages produce a retryable API error without trying to interpret a page as JSON",async()=>{
 const before=globalThis.fetch;globalThis.fetch=async()=>({status:503,ok:false,text:async()=>"<!DOCTYPE html><h1>Unavailable</h1>"});
 try{await assert.rejects(()=>fetchJson("/api"),e=>e.status===502 && !e.message.includes("Unexpected token"));}finally{globalThis.fetch=before;}
});
test("expired sessions preserve the 401 signal needed for automatic reauthentication",async()=>{
 const before=globalThis.fetch;globalThis.fetch=async()=>({status:401,ok:false,text:async()=>JSON.stringify({erreur:"Reconnectez-vous"})});
 try{await assert.rejects(()=>fetchJson("/api"),e=>e.status===401);}finally{globalThis.fetch=before;}
});

test("initial connection retries a temporary 502 and returns the recovered profile",async()=>{
 let calls=0;const retries=[];
 const profile=await retryConnection(async()=>{calls++;if(calls<3)throw new ApiError("Unavailable",502);return {map:"arena",activity_token:"recovered"};},{wait:async()=>{},onRetry:(_,attempt)=>retries.push(attempt)});
 assert.equal(profile.map,"arena");assert.equal(calls,3);assert.deepEqual(retries,[2,3]);
});
test("OAuth retry obtains a new code instead of replaying the consumed exchange",async()=>{
 let issued=0;const exchanged=[];
 await retryConnection(async()=>{const code=++issued;exchanged.push(code);if(code===1)throw new ApiError("Lost response",502);return "token";},{wait:async()=>{}});
 assert.deepEqual(exchanged,[1,2]);
});
test("permanent access errors are not retried and an outage has a bounded retry budget",async()=>{
 let calls=0;await assert.rejects(()=>retryConnection(async()=>{calls++;throw new ApiError("Denied",403);},{wait:async()=>{}}),{status:403});assert.equal(calls,1);
 calls=0;await assert.rejects(()=>retryConnection(async()=>{calls++;throw new ApiError("Unavailable",502);},{attempts:3,wait:async()=>{}}),{status:502});assert.equal(calls,3);
});

test('diagnostic records state positions and errors without tokens, chat or user identifiers',async()=>{const {recordRequest,recordCorrection,diagnosticReport}=await import('../activity/diagnostics.mjs');recordRequest('/api.php?r=state',{headers:{Authorization:'Bearer SECRET'},body:JSON.stringify({x:1,z:2,sequence:42,action:{type:'say',text:'PRIVATE CHAT',id:'USER'},trace:[{x:0,z:2,sequence:41}]})},{position:{x:0,z:2},movementSequence:41,activity_token:'SECRET',joueurs:[{id:'USER'}],health:{serverTime:100}},200,615);recordCorrection({x:1,z:2},{x:0,z:2},{sequence:42},'tower1');const r=diagnosticReport(),text=JSON.stringify(r);assert.equal(text.includes('SECRET'),false);assert.equal(text.includes('PRIVATE CHAT'),false);assert.equal(text.includes('USER'),false);assert.equal(r.events.at(-2).durationMs,615);assert.equal(r.incidents.at(-1).type,'rollback');for(let i=0;i<700;i++)recordRequest('/api/state',{},null,502,20,new Error());assert.ok(diagnosticReport().events.length<=600);assert.ok(diagnosticReport().incidents.length<=8);});


test('diagnostic failure cannot interrupt successful state updates or replace API errors',async()=>{
 const fetchBefore=globalThis.fetch,cloneBefore=globalThis.structuredClone;
 globalThis.structuredClone=()=>{throw new Error('Unavailable clone');};
 try{
  globalThis.fetch=async()=>({status:200,ok:true,text:async()=>'{"position":{"x":1},"movementSequence":1}'});
  assert.equal((await fetchJson('/api.php?r=state',{body:'{"trace":{}}'})).movementSequence,1);
  const {recordDiagnostic}=await import('../activity/diagnostics.mjs');
  assert.doesNotThrow(()=>recordDiagnostic('render-stall',{durationMs:600},true));
  globalThis.fetch=async()=>({status:401,ok:false,text:async()=>'{"erreur":"Expired"}'});
  await assert.rejects(()=>fetchJson('/api.php?r=state',{body:'{"trace":{}}'}),{status:401});
 }finally{globalThis.fetch=fetchBefore;globalThis.structuredClone=cloneBefore;}
});
