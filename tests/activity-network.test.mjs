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
