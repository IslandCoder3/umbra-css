/* Umbra studio: Start-up: reads the URL, applies shared settings and opens the first tool. Loaded last. */
const ids=TOOLS.flatMap(g=>g[1].map(t=>t[0]));
ids.forEach(i=>{try{DEF[i]=JSON.stringify(stateOf(i))}catch(e){}});
function handoff(id,pl){try{const st=JSON.parse(decodeURIComponent(pl));
 if(id==='box'||id==='text'){const t=S[id];t.layers=st.layers.map(l=>mkLayer(l));t.sel=0;if(st.bg)t.bg=st.bg;if(st.el)t.el=st.el}
 else if(id==='filter')Object.assign(S.filter,FD,st,{ds:Object.assign({on:false,x:6,y:8,b:10,c:'#000000',a:.45},st.ds||{})});
 else if(G[id]){Object.assign(G[id].s,st);if(id==='gradient'){if(st.n===undefined&&st.use3!==undefined)G.gradient.s.n=st.use3?3:2;if(st.pos===undefined)G.gradient.s.pos=null}}}catch(e){}}
const parseHash=()=>{const h=location.hash.slice(1),i=h.indexOf(':'),id=i<0?h:h.slice(0,i);return ids.includes(id)?[id,i<0?null:h.slice(i+1)]:null};
const r0=parseHash();
if(r0&&r0[1])handoff(r0[0],r0[1]);
setMode(r0?r0[0]:'box');
addEventListener('hashchange',()=>{const r=parseHash();if(!r)return;if(r[1]){handoff(r[0],r[1]);setMode(r[0])}else if(r[0]!==mode)setMode(r[0])});
