const V='umbra-v1',CORE=['./','index.html','studio.html','style.css','theme.js','tools.js','home.js','script.js','icon.svg','icon-192.png','icon-512.png','manifest.webmanifest','404.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url),ok=u.origin===location.origin||/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname);if(!ok)return;
 e.respondWith(caches.open(V).then(c=>c.match(r,{ignoreSearch:true}).then(hit=>{const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque'))c.put(r,res.clone());return res}).catch(()=>hit||(r.mode==='navigate'?c.match('index.html'):Response.error()));return hit||net}))))});
