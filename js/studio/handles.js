/* Umbra studio: Drag handles and guides on the preview, the shadow lamp, and center snapping. */
const cl2=v=>Math.max(0,Math.min(100,v));
function overlay(pts,s,sub,stage){let gl=stage.querySelector('#gl');const lamp=!pts&&typeof tgt==='function'?tgt():null;
 if(!pts&&!lamp){if(gl)gl.remove();return}
 if(!gl){gl=h('div',{id:'gl',class:'gl'});stage.append(gl)}gl.replaceChildren();
 const sr=sub.getBoundingClientRect(),st=stage.getBoundingClientRect(),L=sr.left-st.left,T=sr.top-st.top,W=sr.width,H=sr.height;
 const ln=(c,l,t,w,hh)=>{const d=document.createElement('i');d.className='gd '+c;d.style.cssText=`left:${l}px;top:${t}px;width:${w}px;height:${hh}px`;gl.append(d)};
 const bd=(txt,ok)=>{const b=document.createElement('span');b.className='cbadge'+(ok?' ok':'');b.textContent=txt;gl.append(b)};
 if(pts){if(s.guides!==false){ln('bx',L,T,W,H);ln('cv',L+W/2,T-12,0,H+24);ln('ch',L-12,T+H/2,W+24,0)}
  if(s.grid)[25,75].forEach(p=>{ln('gv',L+W*p/100,T,0,H);ln('gh',L,T+H*p/100,W,0)});
  if(SNAP.x!=null)ln('sv',L+W*SNAP.x/100,T-12,0,H+24);if(SNAP.y!=null)ln('sh',L-12,T+H*SNAP.y/100,W+24,0);
  const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]),cx=(Math.min(...xs)+Math.max(...xs))/2,cy=(Math.min(...ys)+Math.max(...ys))/2,ok=Math.abs(cx-50)<=.5&&Math.abs(cy-50)<=.5;
  const m=document.createElement('i');m.className='gd cm';m.style.cssText=`left:${L+W*cx/100}px;top:${T+H*cy/100}px`;gl.append(m);
  bd(ok?'Centered':`Shape center ${r3(cx)}%, ${r3(cy)}%`,ok);
  if(SNAP.on&&pts[s.sel]){const l=document.createElement('span');l.className='hlab';l.textContent=`${pts[s.sel][0]}%, ${pts[s.sel][1]}%`;l.style.cssText=`left:${L+W*pts[s.sel][0]/100}px;top:${T+H*pts[s.sel][1]/100}px`;gl.append(l)}}
 else{const cx=L+W/2,cy=T+H/2;ln('cv',cx,0,0,st.height);ln('ch',0,cy,st.width,0);if(lamp.x===0)ln('sv',cx,0,0,st.height);if(lamp.y===0)ln('sh',0,cy,st.width,0);
  bd(lamp.x===0&&lamp.y===0?'Shadow centered':`Offset ${lamp.x}px, ${lamp.y}px`,lamp.x===0&&lamp.y===0)}}
function syncHandles(g,s,sub,stage){let hs=[...stage.querySelectorAll('.hnd')];const pts=g&&g.handles?g.handles(s):null;if(!pts){hs.forEach(x=>x.remove());overlay(null,s,sub,stage);return}
 while(hs.length>pts.length)hs.pop().remove();
 while(hs.length<pts.length){const b=h('button',{class:'hnd',type:'button'});b.dataset.i=hs.length;b.setAttribute('aria-label','Drag handle '+(hs.length+1));
  const mv=(i,x,y,ns)=>{const g2=G[mode],t=g2.s;
   if(g2.hset)g2.hset(t,i,x,y);
   else{x=cl2(x);y=cl2(y);SNAP={x:null,y:null,on:!ns};
    if(!ns&&t.snap!==false){const sn=(v,ax)=>{let best=null,bd=2.5;[0,50,100,...(t.grid?[25,75]:[]),...t.pts.filter((_,k)=>k!==i).map(p=>p[ax])].forEach(q=>{const d=Math.abs(v-q);if(d<bd){bd=d;best=q}});return best},bx=sn(x,0),by=sn(y,1);if(bx!=null){x=bx;SNAP.x=bx}if(by!=null){y=by;SNAP.y=by}}
    t.pts[i]=[Math.round(x),Math.round(y)]}
   if(!hR)hR=requestAnimationFrame(()=>{hR=0;build();update()})};
  b.addEventListener('pointerdown',e=>{b.setPointerCapture(e.pointerId);b.dataset.d=1;const t=G[mode].s;if('sel' in t)t.sel=+b.dataset.i;build();update()});
  b.addEventListener('pointermove',e=>{if(!b.dataset.d)return;const r=$('#subject').getBoundingClientRect();mv(+b.dataset.i,(e.clientX-r.left)/r.width*100,(e.clientY-r.top)/r.height*100)});
  b.addEventListener('pointerup',()=>{delete b.dataset.d;SNAP={x:null,y:null,on:false};update()});
  b.addEventListener('keydown',e=>{const d={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key];if(!d)return;e.preventDefault();const g2=G[mode],p=g2.handles(g2.s)[+b.dataset.i],n=e.shiftKey?5:1;mv(+b.dataset.i,p[0]+d[0]*n,p[1]+d[1]*n,1)});
  stage.append(b);hs.push(b)}
 const sr=sub.getBoundingClientRect(),st=stage.getBoundingClientRect();
 hs.forEach((b,i)=>{b.className='hnd'+(pts[i][2]?' '+pts[i][2]:'')+(i===s.sel?' on':'');b.style.background=pts[i][3]||'';b.style.left=(sr.left-st.left+pts[i][0]/100*sr.width)+'px';b.style.top=(sr.top-st.top+pts[i][1]/100*sr.height)+'px'});
 overlay(g.gd?pts:null,s,sub,stage)}
const orb=$('#orb'),K=.35;
let drag=false;
const tgt=()=>mode==='filter'?(S.filter.ds.on?S.filter.ds:null):(mode==='box'||mode==='text')?S[mode].layers[S[mode].sel]:null;
function placeOrb(){const st=$('#stage'),t=tgt();orb.hidden=!t;$('#hint').hidden=!t;
 if(!t){st.style.setProperty('--lx','50%');st.style.setProperty('--ly','22%');return}
 const w=st.clientWidth,hh=st.clientHeight,px=Math.min(w-24,Math.max(24,w/2-t.x/K)),py=Math.min(hh-24,Math.max(24,hh/2-t.y/K));
 orb.style.left=px+'px';orb.style.top=py+'px';st.style.setProperty('--lx',px+'px');st.style.setProperty('--ly',py+'px')}
let aimR=0;
function aim(px,py){const t=tgt();if(!t)return;const st=$('#stage'),lim=mode==='filter'?40:60,c=v=>Math.round(Math.max(-lim,Math.min(lim,v)));
 t.x=c((st.clientWidth/2-px)*K);t.y=c((st.clientHeight/2-py)*K);if(Math.abs(t.x)<=2)t.x=0;if(Math.abs(t.y)<=2)t.y=0;if(!aimR)aimR=requestAnimationFrame(()=>{aimR=0;build();update()})}
orb.addEventListener('pointerdown',e=>{drag=true;orb.setPointerCapture(e.pointerId)});
orb.addEventListener('pointermove',e=>{if(!drag)return;const r=$('#stage').getBoundingClientRect();aim(e.clientX-r.left,e.clientY-r.top)});
orb.addEventListener('pointerup',()=>{drag=false});
orb.addEventListener('keydown',e=>{const t=tgt(),d={ArrowLeft:[1,0],ArrowRight:[-1,0],ArrowUp:[0,1],ArrowDown:[0,-1]}[e.key];
 if(!t||!d)return;e.preventDefault();const n=e.shiftKey?5:1;t.x+=d[0]*n;t.y+=d[1]*n;build();update()});
addEventListener('resize',placeOrb);
addEventListener('resize',()=>{if(G[mode]&&G[mode].handles)update()});
