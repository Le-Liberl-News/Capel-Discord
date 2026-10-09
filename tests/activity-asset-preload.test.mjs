import test from 'node:test';
import assert from 'node:assert/strict';
import {preloadAssets} from '../activity/asset-preload.mjs';
test('large scenes limit requests, deduplicate files and release their blob URLs',async()=>{
 let active=0,peak=0,calls=0;const revoked=[];
 const urls=Array.from({length:20},(_,i)=>`https://example.test/${i}.png`);
 const assets=await preloadAssets([...urls,urls[0]],{concurrency:3,fetcher:async url=>{calls++;peak=Math.max(peak,++active);await new Promise(r=>setTimeout(r,2));active--;return {ok:true,blob:async()=>url};},createURL:url=>`blob:${url}`,revokeURL:url=>revoked.push(url)});
 assert.equal(calls,20);assert.equal(peak,3);assert.equal(assets.resolve(urls[0]),`blob:${urls[0]}`);assets.dispose();assert.equal(revoked.length,20);
});
test('a temporary HTTP failure is retried before the scene loads',async()=>{
 let calls=0;const assets=await preloadAssets(['https://example.test/a.png'],{fetcher:async()=>({ok:++calls>1,status:503,blob:async()=>new Blob(['ok'])})});assert.equal(calls,2);assets.dispose();
});
test('a permanent failure reports the file and frees successful downloads',async()=>{
 const revoked=[];await assert.rejects(preloadAssets(['https://example.test/good.png','https://example.test/missing.png'],{fetcher:async url=>({ok:url.includes('good'),status:404,blob:async()=>url}),createURL:url=>`blob:${url}`,revokeURL:url=>revoked.push(url)}),/missing.png : HTTP 404/);assert.equal(revoked.length,1);
});
