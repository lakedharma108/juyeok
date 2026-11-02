const CACHE='gwan-juyeok-v1.4-wings';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(ASSETS);await self.skipWaiting()})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith('gwan-juyeok-')&&k!==CACHE)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener('message',e=>{if(e.data==='CHECK_OFFLINE')e.waitUntil((async()=>{const c=await caches.open(CACHE);if((await Promise.all(ASSETS.map(p=>c.match(p)))).every(Boolean)&&e.ports[0])e.ports[0].postMessage('offline-ready')})())});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;const u=new URL(e.request.url);if(!ASSETS.some(p=>new URL(p,self.location).pathname===u.pathname)&&e.request.mode!=='navigate')return;e.respondWith((async()=>{try{return await fetch(e.request)}catch{const c=await caches.open(CACHE);return await c.match(e.request)||await c.match('./index.html')}})())});
