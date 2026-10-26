/* Shared CSS reader: turns pasted CSS into generator settings. Used by the gallery (Open in studio) and the studio (Import). */
const splitTop=v=>{const o=[];let d=0,s='';for(const ch of v){if(ch==='(')d++;if(ch===')')d--;if(ch===','&&!d){o.push(s.trim());s=''}else s+=ch}o.push(s.trim());return o};
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const spl=v=>{const o=[];let d=0,s='';for(const ch of v){if(ch==='(')d++;if(ch===')')d--;if(ch===' '&&!d){if(s)o.push(s);s=''}else s+=ch}if(s)o.push(s);return o};
const pc=x=>{x=(x||'').trim();let m=x.match(/^#([0-9a-f]{3,8})$/i);if(m){let h=m[1];if(h.length<=4)h=[...h].map(c=>c+c).join('');return{c:'#'+h.slice(0,6),a:h.length===8?+(parseInt(h.slice(6),16)/255).toFixed(2):1}}
 m=x.match(/^rgba?\(([^)]*)\)$/i);if(m){const p=m[1].split(/[ ,\/]+/).filter(Boolean).map(parseFloat);return{c:'#'+p.slice(0,3).map(v=>Math.round(v).toString(16).padStart(2,'0')).join(''),a:p[3]==null||isNaN(p[3])?1:(/%/.test(m[1])?p[3]/100:p[3])}}return null};
const declsOf=t=>{const m=t.match(/\{([\s\S]*)\}/),o={};(m?m[1]:t).split(';').forEach(x=>{const i=x.indexOf(':');if(i>0)o[x.slice(0,i).trim()]=x.slice(i+1).trim().replace(/\s+/g,' ')});return o};
const layer=(str,box)=>{let s=str.trim(),inset=false;if(/\binset\b/.test(s)){inset=true;s=s.replace(/\binset\b/,'').trim()}const cm=s.match(/rgba?\([^)]*\)|#[0-9a-f]{3,8}\b/i),col=cm?pc(cm[0]):null;if(cm)s=s.replace(cm[0],'').trim();
 const n=s.split(/\s+/).filter(Boolean).map(parseFloat);if(n.length<2||n.some(isNaN))return null;return{x:cl(n[0],-60,60),y:cl(n[1],-60,60),b:cl(n[2]||0,0,100),s:box?cl(n[3]||0,-40,40):0,c:col?col.c:'#000000',a:col?col.a:1,inset}};
const shadows=(v,box)=>{const L=splitTop(v).slice(0,5).map(x=>layer(x,box));return L.length&&!L.includes(null)?L:null};
const MAP={
 box:(p,st)=>{const L=p['box-shadow']&&shadows(p['box-shadow'],1);if(!L)return null;const bg=pc(p.background||p['background-color']);return{layers:L,bg:st==='dark'?'#141831':'#d5dafb',el:bg?bg.c:(st==='dark'?'#141831':'#ffffff')}},
 text:(p,st)=>{const L=p['text-shadow']&&shadows(p['text-shadow'],0);if(!L)return null;const c=pc(p.color);return{layers:L,bg:st==='dark'?'#12162b':'#d5dafb',el:c?c.c:'#1b2240'}},
 filter:p=>{if(!p.filter)return null;const o={};let hit=0;for(const t of spl(p.filter)){const m=t.match(/^([\w-]+)\((.*)\)$/);if(!m)continue;const n=parseFloat(m[2]),pct=/%/.test(m[2])?n:n*100;
  const k={blur:['blur',n],brightness:['brightness',pct],contrast:['contrast',pct],grayscale:['grayscale',pct],invert:['invert',pct],saturate:['saturate',pct],sepia:['sepia',pct],opacity:['opacity',pct],'hue-rotate':['hue',n]}[m[1]];
  if(k){o[k[0]]=k[1];hit++}else if(m[1]==='drop-shadow'){const l=layer(m[2],0);if(l){o.ds={on:true,x:cl(l.x,-40,40),y:cl(l.y,-40,40),b:cl(l.b,0,40),c:l.c,a:l.a};hit++}}}return hit?o:null},
 glass:p=>{const bf=p['backdrop-filter'];if(!bf)return null;const bg=pc(p.background);if(!bg)return null;const bl=bf.match(/blur\((\d+)px\)/),sa=bf.match(/saturate\((\d+)%\)/),bc=(p.border||'').match(/rgba?\([^)]*\)/),br=(p['border-radius']||'').match(/^(\d+)px$/);
  return{tint:bg.c,blur:bl?cl(+bl[1],0,40):10,alpha:cl(bg.a,0,.8),sat:sa?cl(+sa[1],100,250):100,border:bc?cl(pc(bc[0]).a,0,1):.3,radius:br?cl(+br[1],0,60):20}},
 gradient:p=>{const v=p.background||p['background-image'];if(!v||splitTop(v).length!==1)return null;const m=v.match(/^(linear|radial|conic)-gradient\((.*)\)$/i);if(!m)return null;const a=splitTop(m[2]);let ang=m[1]==='linear'?180:0;
  if(/^(\d+(\.\d+)?deg|to |circle|ellipse|from |at |closest|farthest)/.test(a[0])){const c=a.shift(),d=c.match(/(\d+(\.\d+)?)deg/);if(d)ang=+d[1];else if(/to right/.test(c))ang=90;else if(/to left/.test(c))ang=270;else if(/to top/.test(c))ang=0}
  const sp=a.map(x=>{const t=spl(x),c=pc(t[0]),ps=(t[1]||'').match(/^(\d+(\.\d+)?)%$/);return c?{c:c.c,p:ps?+ps[1]:null}:null});if(sp.length<2||sp.includes(null))return null;
  const n=Math.min(5,sp.length),o={type:m[1],angle:ang,n};sp.slice(0,n).forEach((x,i)=>o['c'+(i+1)]=x.c);if(n===3)o.p2=cl(sp[1].p==null?50:sp[1].p,5,95);const ps=sp.slice(0,n).map((x,i)=>x.p!=null?cl(x.p,0,100):(i===0?0:i===n-1?100:null));if(!ps.includes(null))o.pos=ps;return o},
 radius:p=>{const v=p['border-radius'];if(!v||/px|em|calc/.test(v))return null;const h=v.split('/').map(x=>x.trim().split(/\s+/).map(parseFloat));if(h.some(x=>x.some(isNaN)))return null;
  const ex=x=>x.length===1?[x[0],x[0],x[0],x[0]]:x.length===2?[x[0],x[1],x[0],x[1]]:x.length===3?[x[0],x[1],x[2],x[1]]:x.slice(0,4),H=ex(h[0]),V=ex(h[1]||h[0]);return Object.fromEntries('abcdefgh'.split('').map((k,i)=>[k,cl(i<4?H[i]:V[i-4],0,100)]))},
 clip:p=>{const v=(p['clip-path']||'').replace(/\s+/g,''),k=Object.keys(CP).find(x=>CP[x].replace(/\s+/g,'')===v);return k?{shape:k}:null}
};
const BYCAT={Shapes:['clip','radius','gradient'],Glass:['glass'],Gradients:['gradient'],Backgrounds:['gradient'],Text:['text','gradient'],Filters:['filter'],Shadows:['box'],Buttons:['box','glass','gradient','radius'],x:['box','text','filter','gradient','radius','clip']};

const cl2m=(v,a,b)=>Math.max(a,Math.min(b,v));
MAP.transform=p=>{const v=p.transform;if(!v||v==='none')return null;const o={};let hit=0;
 for(const t of spl(v)){const m=t.match(/^(\w+)\((.*)\)$/);if(!m)continue;const a=m[2].split(',').map(x=>parseFloat(x));
  if(m[1]==='rotate'){o.rot=cl(a[0],-180,180);hit++}else if(m[1]==='rotateX'){o.rx=cl(a[0],-90,90);hit++}else if(m[1]==='rotateY'){o.ry=cl(a[0],-90,90);hit++}
  else if(m[1]==='scale'){o.sc=cl(Math.round(a[0]*100),20,200);hit++}else if(m[1]==='skew'){o.skx=cl(a[0],-60,60);o.sky=cl(a[1]||0,-60,60);hit++}
  else if(m[1]==='translate'){o.tx=cl(a[0],-150,150);o.ty=cl(a[1]||0,-150,150);hit++}else if(m[1]==='perspective'){o.persp=cl(a[0],200,2000);hit++}}
 if(p['transform-origin'])o.org=p['transform-origin'];return hit?o:null};
MAP.border=p=>{const sides=['top','right','bottom','left'],all=p.border,picked=sides.filter(s=>p['border-'+s]);const v=all||(picked.length?p['border-'+picked[0]]:null);if(!v)return null;
 const t=spl(v),w=t.find(x=>/^\d+(\.\d+)?px$/.test(x)),st=t.find(x=>/^(solid|dashed|dotted|double|groove|ridge)$/.test(x)),c=t.map(pc).find(Boolean);if(!w)return null;
 const rr=(p['border-radius']||'').match(/^(\d+)px$/);return{w:cl(parseFloat(w),0,16),st:st||'solid',c:c?c.c:'#000000',r:rr?cl(+rr[1],0,100):0,sides:all?sides:picked}};
MAP.aspect=p=>{const v=p['aspect-ratio'];if(!v)return null;const m=v.match(/^(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/)||v.match(/^(\d+(?:\.\d+)?)$/);if(!m)return null;
 const s=`${m[1]} / ${m[2]||1}`,L=['16 / 9','4 / 3','1 / 1','3 / 2','21 / 9','9 / 16','4 / 5'];return L.includes(s)?{p:s}:{p:'custom',w:cl(+m[1],1,32),h:cl(+(m[2]||1),1,32)}};
MAP.convert=p=>{const c=pc(p.color||p.background||p['background-color']||'');return c?{c:c.c,a:Math.round(c.a*100)}:null};
MAP.clamp=p=>{for(const prop of ['font-size','padding','margin','gap','width','height']){const v=p[prop],m=v&&v.match(/^clamp\((.*)\)$/i);if(!m)continue;const a=splitTop(m[1]);if(a.length!==3)continue;
  const px=x=>{const q=(x||'').trim().match(/^(-?\d*\.?\d+)(rem|px)$/);return q?parseFloat(q[1])*(q[2]==='rem'?16:1):null};
  const mid=a[1].trim().match(/^(?:(-?\d*\.?\d+)(rem|px)\s*([+-])\s*)?(\d*\.?\d+)(vw|cqi)$/);if(!mid)continue;
  const lo=px(a[0]),hi=px(a[2]),ic=mid[1]==null?0:parseFloat(mid[1])*(mid[2]==='rem'?16:1)*(mid[3]==='-'?-1:1)*(mid[3]==='-'?-1:1),sl=parseFloat(mid[4])/100*(mid[3]==='-'&&mid[1]==null?-1:1);
  if(lo==null||hi==null||!(sl>0))continue;const v1=(lo-ic)/sl,v2=(hi-ic)/sl;if(!isFinite(v1)||!isFinite(v2))continue;
  return{mode:'Single value',prop,min:cl(Math.round(lo),1,200),max:cl(Math.round(hi),1,400),minVw:cl(Math.round(v1/10)*10,280,800),maxVw:cl(Math.round(v2/10)*10,800,2000),unit:/rem/.test(a[0])?'rem':'px',per:mid[5]}}return null};
const IMPORT_ORDER=['clamp','box','text','filter','glass','gradient','radius','clip','transform','aspect','border','convert'];
