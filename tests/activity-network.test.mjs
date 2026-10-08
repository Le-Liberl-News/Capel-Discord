import test from "node:test";import assert from "node:assert/strict";import {fetchJson} from "../activity/network.mjs";
test("HTML outages produce a retryable API error without trying to interpret a page as JSON",async()=>{
 const before=globalThis.fetch;globalThis.fetch=async()=>({status:503,ok:false,text:async()=>"<!DOCTYPE html><h1>Unavailable</h1>"});
 try{await assert.rejects(()=>fetchJson("/api"),e=>e.status===502 && !e.message.includes("Unexpected token"));}finally{globalThis.fetch=before;}
});
test("expired sessions preserve the 401 signal needed for automatic reauthentication",async()=>{
 const before=globalThis.fetch;globalThis.fetch=async()=>({status:401,ok:false,text:async()=>JSON.stringify({erreur:"Reconnectez-vous"})});
 try{await assert.rejects(()=>fetchJson("/api"),e=>e.status===401);}finally{globalThis.fetch=before;}
});
