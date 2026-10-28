const $=s=>document.querySelector(s);
const FD={blur:0,brightness:100,contrast:100,grayscale:0,hue:0,invert:0,saturate:100,sepia:0,opacity:100};
const mkLayer=o=>Object.assign({x:0,y:12,b:24,s:-4,c:'#1b2240',a:.28,inset:false},o);
const S={
 box:{layers:[mkLayer()],sel:0,bg:'#d5dafb',el:'#ffffff'},
 text:{layers:[mkLayer({x:3,y:3,b:4,c:'#000000',a:.4})],sel:0,bg:'#d5dafb',el:'#1b2240'},
 filter:Object.assign({ds:{on:false,x:6,y:8,b:10,c:'#000000',a:.45}},FD)
};
const PRE={
 box:{'Soft':[mkLayer()],'Layered':[mkLayer({y:1,b:2,s:0,a:.16}),mkLayer({y:4,b:8,s:0,a:.14}),mkLayer({y:16,b:32,s:0,a:.16})],'Hard offset':[mkLayer({x:8,y:8,b:0,s:0,a:1})],'Inset':[mkLayer({y:3,b:8,s:0,a:.35,inset:true})]},
 text:{'Soft':[mkLayer({x:3,y:3,b:4,s:0,c:'#000000',a:.4})],'Glow':[mkLayer({x:0,y:0,b:12,s:0,c:'#2f5bea',a:1}),mkLayer({x:0,y:0,b:28,s:0,c:'#2f5bea',a:.7})],'Hard':[mkLayer({x:4,y:4,b:0,s:0,c:'#2f5bea',a:1})]},
 filter:{'Noir':{grayscale:100,contrast:125,brightness:90},'Faded':{saturate:70,contrast:90,brightness:110,sepia:20},'Vivid':{saturate:160,contrast:110},'Reset':{}}
};
let mode='box';
const rgba=(h,a)=>{const n=parseInt(h.slice(1),16);return `rgba(${n>>16&255}, ${n>>8&255}, ${n&255}, ${+(+a).toFixed(2)})`};
function h(t,p,...k){const e=document.createElement(t);for(const a in p||{}){a==='class'?e.className=p[a]:a.startsWith('on')?e.addEventListener(a.slice(2),p[a]):(p[a]==null||(p[a]===false&&!a.startsWith('aria-')))?0:e.setAttribute(a,p[a])}k.flat().forEach(c=>e.append(c));return e}
function slider(label,o,key,min,max,step,unit=''){
 const out=h('output',{},o[key]+unit);
 const r=h('input',{type:'range',min,max,step,value:o[key],id:'s_'+label+key,oninput:e=>{o[key]=+e.target.value;out.textContent=o[key]+unit;update()}});
 return h('div',{class:'row'},h('label',{for:r.id},label),r,out);
}
function colorRow(label,o,ck,ak){
 const c=h('input',{type:'color',value:o[ck],'aria-label':label+' color',oninput:e=>{o[ck]=e.target.value;update()}});
 const wrap=h('div',{class:'inline'},h('span',{},label),c);return wrap;
}
function chips(map,fn){return h('div',{class:'inline'},...Object.keys(map).map(n=>h('button',{class:'chip',type:'button',onclick:()=>fn(n)},n)))}
function build(){build0();histBar();supNote();savedPanel()}
function build0(){
 const c=$('#controls');c.replaceChildren();if(G[mode]){buildGen(c);return}
 if(mode==='filter'){
  const f=S.filter;
  c.append(h('div',{class:'inline'},h('span',{},'Presets')),chips(PRE.filter,n=>{Object.assign(f,FD,PRE.filter[n]);build();update()}));
  [['Blur','blur',0,20,.5,'px'],['Brightness','brightness',0,250,1,'%'],['Contrast','contrast',0,250,1,'%'],['Grayscale','grayscale',0,100,1,'%'],['Hue rotate','hue',0,360,1,'deg'],['Invert','invert',0,100,1,'%'],['Saturate','saturate',0,300,1,'%'],['Sepia','sepia',0,100,1,'%'],['Opacity','opacity',0,100,1,'%']].forEach(a=>c.append(slider(a[0],f,a[1],a[2],a[3],a[4],a[5])));
  const g=h('div',{class:'group'});
  g.append(h('label',{class:'inline'},h('input',{type:'checkbox',checked:f.ds.on||null,onchange:e=>{f.ds.on=e.target.checked;update()}}),'Add drop-shadow'));
  g.append(slider('Offset X',f.ds,'x',-40,40,1,'px'),slider('Offset Y',f.ds,'y',-40,40,1,'px'),slider('Blur',f.ds,'b',0,40,1,'px'),slider('Opacity',f.ds,'a',0,1,.01),colorRow('Color',f.ds,'c'));
  c.append(g);return;
 }
 const st=S[mode],L=st.layers[st.sel];
 c.append(h('div',{class:'inline'},h('span',{},'Presets')),chips(PRE[mode],n=>{st.layers=PRE[mode][n].map(l=>({...l}));st.sel=0;if(mode==='text'){const g=n==='Glow';st.bg=g?'#12162b':'#d5dafb';st.el=g?'#ffffff':'#1b2240'}build();update()}));
 const lr=h('div',{class:'inline'},...st.layers.map((l,i)=>h('button',{class:'chip',type:'button','aria-pressed':i===st.sel,onclick:()=>{st.sel=i;build()}},'Layer '+(i+1))));
 if(st.layers.length<5)lr.append(h('button',{class:'chip',type:'button',onclick:()=>{st.layers.push(mkLayer({y:4,b:8,s:0,a:.2,c:L.c}));st.sel=st.layers.length-1;build();update()}},'+ Add'));
 if(st.layers.length>1)lr.append(h('button',{class:'chip',type:'button',onclick:()=>{st.layers.splice(st.sel,1);st.sel=0;build();update()}},'Remove'));
 c.append(lr,slider('Offset X',L,'x',-60,60,1,'px'),slider('Offset Y',L,'y',-60,60,1,'px'),slider('Blur',L,'b',0,100,1,'px'));
 if(mode==='box'){c.append(slider('Spread',L,'s',-40,40,1,'px'),h('label',{class:'inline'},h('input',{type:'checkbox',checked:L.inset||null,onchange:e=>{L.inset=e.target.checked;update()}}),'Inset'))}
 c.append(slider('Opacity',L,'a',0,1,.01),colorRow('Shadow color',L,'c'));
 const g=h('div',{class:'group'},colorRow('Stage',st,'bg'),colorRow(mode==='box'?'Box':'Text',st,'el'));
 c.append(g);
}
function layerCss(l){
 const col=rgba(l.c,l.a);
 return mode==='box'?`${l.inset?'inset ':''}${l.x}px ${l.y}px ${l.b}px ${l.s}px ${col}`:`${l.x}px ${l.y}px ${l.b}px ${col}`;
}
function update(){hist();
 const sub=$('#subject'),stage=$('#stage');let prop,val;
 sub.removeAttribute('style');sub.className='';if(G[mode]){updateGen(sub,stage);return}
 if(mode==='filter'){
  const f=S.filter,p=[];
  if(f.blur)p.push(`blur(${f.blur}px)`);
  [['brightness','brightness','%'],['contrast','contrast','%'],['grayscale','grayscale','%'],['hue','hue-rotate','deg'],['invert','invert','%'],['saturate','saturate','%'],['sepia','sepia','%'],['opacity','opacity','%']].forEach(a=>{if(f[a[0]]!==FD[a[0]])p.push(`${a[1]}(${f[a[0]]}${a[2]})`)});
  if(f.ds.on)p.push(`drop-shadow(${f.ds.x}px ${f.ds.y}px ${f.ds.b}px ${rgba(f.ds.c,f.ds.a)})`);
  prop='filter';val=p.length?p.join(' '):'none';
  sub.className='photo';sub.style.filter=val;stage.style.setProperty('--base','#141831');stage.style.setProperty('--glow','rgba(255,190,110,.22)');stage.classList.add('dark');
 }else{
  const st=S[mode];val=st.layers.map(layerCss).join(mode==='box'?',\n    ':',\n    ');
  stage.style.setProperty('--base',st.bg);stage.style.setProperty('--glow','rgba(255,255,255,.7)');stage.classList.toggle('dark',st.bg<'#6');
  if(mode==='box'){prop='box-shadow';sub.className='card';sub.style.background=st.el;sub.style.boxShadow=val.replace(/\n\s*/g,' ')}
  else{prop='text-shadow';sub.className='txt';sub.textContent='Shadow';sub.style.color=st.el;sub.style.textShadow=val.replace(/\n\s*/g,' ')}
 }
 if(mode!=='text')sub.textContent='';
 $('#prop').textContent=prop;
 OUT.css=`${prop}: ${val};`;OUT.dec=[[prop,val.replace(/,\n\s*/g,', ')]];showCode();syncHandles(null,null,sub,stage);placeOrb();
}
function setMode(m){mode=m;const gi=TOOLS.findIndex(g=>g[1].some(t=>t[0]===m));
 $('#groups').replaceChildren(...TOOLS.map((g,i)=>h('button',{class:'chip',type:'button','aria-pressed':i===gi,onclick:()=>setMode(g[1][0][0])},g[0])));
 $('#tabs').replaceChildren(...TOOLS[gi][1].map(t=>h('button',{type:'button',role:'tab','aria-selected':t[0]===m,onclick:()=>setMode(t[0])},t[1])));
 try{history.replaceState(null,'','#'+m)}catch(e){}
 build();update()}
$('#copy').addEventListener('click',async()=>{
 const t=$('#code').textContent,b=$('#copy');
 try{await navigator.clipboard.writeText(t)}catch(e){
  const ta=document.createElement('textarea');ta.value=t;document.body.append(ta);ta.select();try{document.execCommand('copy')}catch(_){}ta.remove();
 }
 b.dataset.busy=1;b.textContent='Copied';$('#live').textContent='Copied to clipboard';
 setTimeout(()=>{delete b.dataset.busy;showCode()},1400);
});
const rnd=()=>'#'+Math.floor(Math.random()*16777215).toString(16).padStart(6,'0');
const rn=(a,b)=>Math.round(a+Math.random()*(b-a));
const GRAD=[['background','linear-gradient(135deg,#4a5bdc,#8b9bff)']];
const KF={pulse:[['0%, 100%','transform: scale(1)'],['50%','transform: scale(1.12)']],bounce:[['0%, 100%','transform: translateY(0)'],['50%','transform: translateY(-28px)']],spin:[['to','transform: rotate(360deg)']],float:[['0%, 100%','transform: translateY(0) rotate(-2deg)'],['50%','transform: translateY(-14px) rotate(2deg)']],shake:[['0%, 100%','transform: translateX(0)'],['20%, 60%','transform: translateX(-10px)'],['40%, 80%','transform: translateX(10px)']],fade:[['from','opacity: 0'],['to','opacity: 1']]};
const lum=c=>{const n=parseInt(c.slice(1),16);return [n>>16&255,n>>8&255,n&255].reduce((a,v,i)=>{v/=255;v=v<=.03928?v/12.92:((v+.055)/1.055)**2.4;return a+v*[.2126,.7152,.0722][i]},0)};
const cr=s=>{const a=lum(s.fg),b=lum(s.bg);return (Math.max(a,b)+.05)/(Math.min(a,b)+.05)};
const fl=s=>{const sl=(s.max-s.min)/(s.maxVw-s.minVw),ic=s.min-sl*s.minVw;return {sl,ic,px:Math.min(s.max,Math.max(s.min,ic+sl*s.vw))}};
const r3=n=>+n.toFixed(3);
const FF={sans:'system-ui, -apple-system, "Segoe UI", sans-serif',serif:'Georgia, "Times New Roman", serif',mono:'ui-monospace, Menlo, Consolas, monospace'};
const rgb=c=>{const n=parseInt(c.slice(1),16);return [n>>16&255,n>>8&255,n&255]};
const hex=a=>'#'+a.map(v=>Math.round(v).toString(16).padStart(2,'0')).join('');
const mix=(c,t,p)=>hex(rgb(c).map((v,i)=>v+(t[i]-v)*p));
const hsl=c=>{const [r,g,b]=rgb(c).map(v=>v/255),mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2,d=mx-mn;let hh=0,s=0;if(d){s=d/(1-Math.abs(2*l-1));hh=(mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4)*60;if(hh<0)hh+=360}return `hsl(${Math.round(hh)} ${Math.round(s*100)}% ${Math.round(l*100)}%)`};
const LV=[50,100,200,300,400,500,600,700,800,900],PL=[[1,.9],[1,.78],[1,.58],[1,.38],[1,.18],[0,0],[0,.16],[0,.32],[0,.5],[0,.68]];
const shade=(c,i)=>PL[i][1]?mix(c,PL[i][0]?[255,255,255]:[0,0,0],PL[i][1]):c;
const bz=s=>`cubic-bezier(${r3(s.x1)}, ${r3(s.y1)}, ${r3(s.x2)}, ${r3(s.y2)})`;
const AP={'holy grail':{a:['header header header','nav main aside','footer footer footer'],c:'80px 1fr 80px',r:'auto 1fr auto',n:['header','nav','main','aside','footer']},'sidebar':{a:['sidebar main'],c:'90px 1fr',r:'1fr',n:['sidebar','main']},'dashboard':{a:['title title','stats chart','list chart'],c:'1fr 1.4fr',r:'auto 1fr 1fr',n:['title','stats','list','chart']}};
const MQ=[['min-width: 480px','Phones in landscape and up'],['min-width: 768px','Tablets and up'],['min-width: 1024px','Laptops and up'],['min-width: 1280px','Large desktops'],['max-width: 767px','Phones and small tablets only'],['max-width: 1023px','Anything below laptop size'],['prefers-color-scheme: dark','User prefers dark mode'],['prefers-reduced-motion: reduce','User wants less animation'],['hover: hover','Device can hover (mouse)'],['pointer: coarse','Touch screens'],['orientation: landscape','Wider than tall'],['print','Printing the page']];
const BPS=[1536,1400,1300,1280,1200,1090,1024,1010,992,900,800,768,720,640,600,576,500,480,425,400,375,360,320];
const DEV=w=>w>1200?'Large Screens':w>800?'Large Tablet Devices':w>600?'Tablet Devices':'Smartphones';
const ladder=s=>{let prev='';return [...s.bps].map(Number).sort((a,b)=>s.dir==='max-width'?b-a:a-b).map(w=>{
 const lab=s.cm?DEV(w):'',head=lab&&lab!==prev?(prev=lab,`/* ${lab} */\n`):'',pre=s.px==='only screen and'?'only screen':s.px==='screen and'?'screen':'';
 if(s.lay==='classic'){const c=`${s.dir} : ${w}px`;return head+(pre?`@media ${pre}\nand (${c}) {\n\n}`:`@media (${c}) {\n\n}`)}
 return head+`@media ${pre?pre+' and ':''}(${s.dir}: ${w}px) {\n  \n}`}).join('\n\n')};
const WID=[320,375,768,1024,1280,1440,1920],STEPS=[-2,-1,0,1,2,3,4,5];
const sz=(a,b,s,v)=>{const v2=Math.max(s.maxVw,s.minVw+1),sl=(b-a)/(v2-s.minVw),ic=a-sl*s.minVw;return Math.min(Math.max(a,b),Math.max(Math.min(a,b),ic+sl*v))};
const spx=s=>sz(s.min,s.max,s,s.vw).toFixed(1);
const cv=(a,b,s)=>{const v2=Math.max(s.maxVw,s.minVw+1),sl=(b-a)/(v2-s.minVw),ic=a-sl*s.minVw,u=s.unit==='rem'?s.root:1,U=s.unit==='rem'?'rem':'px';return `clamp(${r3(Math.min(a,b)/u)}${U}, ${r3(ic/u)}${U} ${sl<0?'-':'+'} ${r3(Math.abs(sl*100))}${s.per}, ${r3(Math.max(a,b)/u)}${U})`};
const stepv=(s,n)=>[s.bmin*Math.pow(s.rmin,n),s.bmax*Math.pow(s.rmax,n)];
const kidsOf=s=>s.mode==='Type scale'?8:({gap:3,margin:2,padding:1}[s.prop]||0);
const eqb=(s,a,b,c,d)=>[s.x1,s.y1,s.x2,s.y2].every((v,i)=>Math.abs(v-[a,b,c,d][i])<.005);
const eqL=(a,b)=>{const n=x=>[...x].map(Number).sort((p,q)=>p-q).join();return n(a)===n(b)};
const toHsl=c=>{const [r,g,b]=rgb(c).map(v=>v/255),mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2,d=mx-mn;let hh=0,s=0;if(d){s=d/(1-Math.abs(2*l-1));hh=(mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4)*60;if(hh<0)hh+=360}return [hh,s,l]};
const fromHsl=([h2,s,l])=>{const a=s*Math.min(l,1-l),f=n=>{const k=(n+h2/30)%12;return l-a*Math.max(-1,Math.min(k-3,9-k,1))};return hex([f(0)*255,f(8)*255,f(4)*255])};
const fixC=(s,t)=>{let [h2,sa,l]=toHsl(s.fg);const up=lum(s.bg)<.4?1:-1;for(let i=0;i<100&&cr({fg:fromHsl([h2,sa,l]),bg:s.bg})<t;i++)l=Math.max(0,Math.min(1,l+up*.01));return fromHsl([h2,sa,l])};
const oklch=(c,a)=>{const [r,g,b]=rgb(c).map(v=>{v/=255;return v<=.04045?v/12.92:Math.pow((v+.055)/1.055,2.4)}),l=Math.cbrt(.4122214708*r+.5363325363*g+.0514459929*b),m=Math.cbrt(.2119034982*r+.6806995451*g+.1073969566*b),q=Math.cbrt(.0883024619*r+.2817188376*g+.6299787005*b),L=.2104542553*l+.793617785*m-.0040720468*q,A=1.9779984951*l-2.428592205*m+.4505937099*q,B=.0259040371*l+.7827717662*m-.808675766*q,C=Math.hypot(A,B);let H=Math.atan2(B,A)*180/Math.PI;if(H<0)H+=360;return `oklch(${r3(L*100)}% ${r3(C)} ${C<.0004?0:r3(H)}${a<100?` / ${a}%`:''})`};
const flexOut=s=>[['display','flex'],['flex-direction',s.dir],['justify-content',s.jc],['align-items',s.ai],['flex-wrap',s.wrap],['gap',s.gap+'px']];
const grOut=s=>{const g=s.gap===s.rgap?s.gap+'px':`${s.rgap}px ${s.gap}px`;return s.mode==='Fixed'?[['display','grid'],['grid-template-columns',`repeat(${s.cols}, ${s.tr})`],['grid-template-rows',`repeat(${s.rows}, ${s.tr})`],['gap',g]]:[['display','grid'],['grid-template-columns',`repeat(${s.mode}, minmax(${s.minw}px, 1fr))`],['gap',g]]};
const PK=Object.keys(CP).filter(k=>CP[k].startsWith('polygon'));
const polyPts=k=>[...CP[k].matchAll(/(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%/g)].map(m=>[+m[1],+m[2]]);
const arv=s=>s.p==='custom'?`${s.w} / ${s.h}`:s.p;
const spv=(s,i)=>s.type==='Multiples'?s.base*(i+1):Math.round(s.base*Math.pow(s.ratio,i)*10)/10;
const cmpS=(p,q)=>p[0]-q[0]||p[1]-q[1]||p[2]-q[2];
const spec1=x=>{let a=0,b=0,c=0;x=x.trim();
 x=x.replace(/:(not|is|has|matches)\(([^)]*)\)/g,(_,n,args)=>{const r=args.split(',').map(spec1).sort(cmpS).pop()||[0,0,0];a+=r[0];b+=r[1];c+=r[2];return ''});
 x=x.replace(/:where\([^)]*\)/g,'').replace(/\[[^\]]*\]/g,()=>{b++;return ''}).replace(/::[\w-]+(\([^)]*\))?/g,()=>{c++;return ''}).replace(/:[\w-]+(\([^)]*\))?/g,()=>{b++;return ''}).replace(/#[\w-]+/g,()=>{a++;return ''}).replace(/\.[\w-]+/g,()=>{b++;return ''}).replace(/(^|[\s>+~])([a-zA-Z][\w-]*)/g,(m,p)=>{c++;return p});
 return [a,b,c]};
const specRows=s=>s.sel.split('\n').flatMap(l=>l.split(',')).map(x=>x.trim()).filter(Boolean).map(x=>({x,v:spec1(x)})).sort((p,q)=>cmpS(q.v,p.v));
const rng0=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const r1=v=>Math.round(v*10)/10;
const cat=(P,close)=>{const n=P.length;let d=`M${r1(P[0][0])},${r1(P[0][1])}`;for(let i=0;i<(close?n:n-1);i++){const p0=P[close?(i-1+n)%n:Math.max(0,i-1)],p1=P[i],p2=P[(i+1)%n],p3=P[close?(i+2)%n:Math.min(n-1,i+2)];d+=` C${r1(p1[0]+(p2[0]-p0[0])/6)},${r1(p1[1]+(p2[1]-p0[1])/6)} ${r1(p2[0]-(p3[0]-p1[0])/6)},${r1(p2[1]-(p3[1]-p1[1])/6)} ${r1(p2[0])},${r1(p2[1])}`}return d};
const svgPath=s=>{if(s.shape==='Blob'){const R=rng0(s.seed),P=Array.from({length:s.pts},(_,i)=>{const a=i/s.pts*Math.PI*2,r=80*(1-R()*s.rnd/100*.6);return [100+r*Math.cos(a),100+r*Math.sin(a)]});return cat(P,true)+' Z'}
 const m=s.freq*2+1,P=Array.from({length:m},(_,k)=>[k*1440/(m-1),160+(k%2?-1:1)*s.amp]);return cat(P,false)+' L1440,320 L0,320 Z'};
const svgVB=s=>s.shape==='Blob'?'0 0 200 200':'0 0 1440 320';
const stepDecl=t=>`transform: translate(${t.x}px, ${t.y}px) rotate(${t.r}deg) scale(${r3(t.sc/100)}); opacity: ${r3(t.o/100)}`;
const kfOf=s=>s.kf==='custom'?[...s.steps].sort((a,b)=>a.p-b.p).map(t=>[t.p+'%',stepDecl(t)]):KF[s.kf];
const stp=s=>s.steps[s.si-1];
const anV=s=>`${s.kf} ${r3(s.dur)}s ${s.ease} ${r3(s.del)}s ${s.iter} ${s.dir} ${s.fill}`;
const declLines=v=>v.split(';').map(x=>x.trim()).filter(Boolean).map(x=>`    ${x};`).join('\n');
const PXS=[4,8,12,14,16,18,20,24,28,32,40,48,56,64,80,96];
const gn=s=>s.n||(s.use3?3:2);
const evenPos=s=>{const n=gn(s);return Array.from({length:n},(_,i)=>n===3&&i===1?(s.p2==null?50:s.p2):Math.round(i*100/(n-1)))};
const ensurePos=s=>{if(!s.pos||s.pos.length!==gn(s))s.pos=evenPos(s);return s.pos};
const gpos=s=>(s.pos&&s.pos.length===gn(s))?s.pos:evenPos(s);
const gstops=s=>{const n=gn(s),u=s.type==='conic'?'deg':'px',pos=gpos(s);return pos.map((p,i)=>`${s['c'+(i+1)]} ${s.rep?r3(p*s.rsz/100)+u:p+'%'}`).join(', ')};
const yp=y=>cl2((1.5-y)/2*100);
const BZP=[['Ease',.25,.1,.25,1],['Ease in',.42,0,1,1],['Ease out',0,0,.58,1],['Back out',.34,1.56,.64,1],['Snappy',.2,.9,.1,1]];
const cssMask=(src,drop)=>{const st=[],keep=(t,x)=>{st.push([t,x]);return '\u0001'+(st.length-1)+'\u0002'};
 const o=src.replace(/\/\*[\s\S]*?\*\//g,m=>drop?' ':keep('c',m)).replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g,m=>keep('s',m)).replace(/url\(\s*[^)'"\s][^)]*\)/gi,m=>keep('s',m));return [o,st]};
const cssBack=(o,st)=>o.replace(/\u0001(\d+)\u0002/g,(_,i)=>st[i][1]);
const cssTok=o=>{const ev=[];let buf='',pd=0;for(const ch of o){if(ch==='(')pd++;else if(ch===')')pd--;
 if(pd<=0&&ch==='{'){ev.push({t:'open',v:buf.trim()});buf=''}else if(pd<=0&&ch==='}'){if(buf.trim())ev.push({t:'decl',v:buf.trim()});buf='';ev.push({t:'close'})}
 else if(pd<=0&&ch===';'){if(buf.trim())ev.push({t:'decl',v:buf.trim()});buf=''}else buf+=ch}if(buf.trim())ev.push({t:'decl',v:buf.trim()});return ev};
const fmtCss=s=>{const min=s.mode==='Minify',[o,st]=cssMask(s.css,min),ev=cssTok(o),ind=s.ind==='Tab'?'\t':s.ind==='4 spaces'?'    ':'  ';let d=0;const P=()=>ind.repeat(d),out=[];
 const nd=t=>{if(/^\u0001\d+\u0002$/.test(t)&&st[+t.slice(1,-1)][0]==='c')return t;if(t[0]==='@')return t.replace(/\s+/g,' ');const i=t.indexOf(':');if(i<0)return t.replace(/\s+/g,' ');
  const p=t.slice(0,i).trim(),v=t.slice(i+1).trim().replace(/\s+/g,' ').replace(/\s*,\s*/g,min?',':', ').replace(/\s*!\s*important/i,min?'!important':' !important');return p+(min?':':': ')+v};
 for(const e of ev){if(e.t==='open'){let sel=e.v.replace(/\s+/g,' ');let m;while((m=sel.match(/^(\u0001\d+\u0002)\s*/))&&st[+m[1].slice(1,-1)][0]==='c'){out.push(P()+m[1]);sel=sel.slice(m[0].length)}
   if(min)out.push((sel[0]==='@'?sel.replace(/\s*([:,])\s*/g,'$1'):sel.replace(/\s*([,>~])\s*/g,'$1'))+'{');else out.push(P()+(sel[0]==='@'?sel:splitTop(sel).map(x=>x.trim()).join(',\n'+P()))+' {');d++}
  else if(e.t==='decl'){const x=nd(e.v),isC=/^\u0001\d+\u0002$/.test(x)&&st[+x.slice(1,-1)][0]==='c';out.push(min?x+';':P()+x+(isC?'':';'))}
  else{d=Math.max(0,d-1);if(min){if(out.length&&out[out.length-1].endsWith(';'))out[out.length-1]=out[out.length-1].slice(0,-1);out.push('}')}else{out.push(P()+'}');if(d===0)out.push('')}}}
 return cssBack(min?out.join(''):out.join('\n').trim(),st)};
const TWPAL={};'gray:f9fafb f3f4f6 e5e7eb d1d5db 9ca3af 6b7280 4b5563 374151 1f2937 111827|slate:f8fafc f1f5f9 e2e8f0 cbd5e1 94a3b8 64748b 475569 334155 1e293b 0f172a|red:fef2f2 fee2e2 fecaca fca5a5 f87171 ef4444 dc2626 b91c1c 991b1b 7f1d1d|orange:fff7ed ffedd5 fed7aa fdba74 fb923c f97316 ea580c c2410c 9a3412 7c2d12|yellow:fefce8 fef9c3 fef08a fde047 facc15 eab308 ca8a04 a16207 854d0e 713f12|green:f0fdf4 dcfce7 bbf7d0 86efac 4ade80 22c55e 16a34a 15803d 166534 14532d|blue:eff6ff dbeafe bfdbfe 93c5fd 60a5fa 3b82f6 2563eb 1d4ed8 1e40af 1e3a8a|indigo:eef2ff e0e7ff c7d2fe a5b4fc 818cf8 6366f1 4f46e5 4338ca 3730a3 312e81|purple:faf5ff f3e8ff e9d5ff d8b4fe c084fc a855f7 9333ea 7e22ce 6b21a8 581c87|pink:fdf2f8 fce7f3 fbcfe8 f9a8d4 f472b6 ec4899 db2777 be185d 9d174d 831843'.split('|').forEach(x=>{const [n,v]=x.split(':');TWPAL[n]=v.split(' ').map(h=>'#'+h)});
const TWSH=[50,100,200,300,400,500,600,700,800,900];
const SHD={sm:'0 1px 2px 0 rgb(0 0 0 / 0.05)',d:'0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',md:'0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',lg:'0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',xl:'0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)','2xl':'0 25px 50px -12px rgb(0 0 0 / 0.25)',none:'none'};
const FSZ={xs:['0.75rem','1rem'],sm:['0.875rem','1.25rem'],base:['1rem','1.5rem'],lg:['1.125rem','1.75rem'],xl:['1.25rem','1.75rem'],'2xl':['1.5rem','2rem'],'3xl':['1.875rem','2.25rem'],'4xl':['2.25rem','2.5rem'],'5xl':['3rem','1'],'6xl':['3.75rem','1'],'7xl':['4.5rem','1'],'8xl':['6rem','1'],'9xl':['8rem','1']};
const FWT={thin:100,extralight:200,light:300,normal:400,medium:500,semibold:600,bold:700,extrabold:800,black:900},LHT={none:'1',tight:'1.25',snug:'1.375',normal:'1.5',relaxed:'1.625',loose:'2'},TRK={tighter:'-0.05em',tight:'-0.025em',normal:'0em',wide:'0.025em',wider:'0.05em',widest:'0.1em'};
const MWD={xs:'20rem',sm:'24rem',md:'28rem',lg:'32rem',xl:'36rem','2xl':'42rem','3xl':'48rem','4xl':'56rem','5xl':'64rem','6xl':'72rem','7xl':'80rem',full:'100%',none:'none',screen:'100vw',prose:'65ch'},RDT={sm:'0.125rem',md:'0.375rem',lg:'0.5rem',xl:'0.75rem','2xl':'1rem','3xl':'1.5rem',full:'9999px',none:'0px'};
const TWST={block:[['display','block']],'inline-block':[['display','inline-block']],inline:[['display','inline']],flex:[['display','flex']],'inline-flex':[['display','inline-flex']],grid:[['display','grid']],hidden:[['display','none']],contents:[['display','contents']],static:[['position','static']],relative:[['position','relative']],absolute:[['position','absolute']],fixed:[['position','fixed']],sticky:[['position','sticky']],'flex-row':[['flex-direction','row']],'flex-col':[['flex-direction','column']],'flex-wrap':[['flex-wrap','wrap']],'flex-nowrap':[['flex-wrap','nowrap']],'flex-1':[['flex','1 1 0%']],'flex-auto':[['flex','1 1 auto']],'flex-none':[['flex','none']],grow:[['flex-grow','1']],'grow-0':[['flex-grow','0']],shrink:[['flex-shrink','1']],'shrink-0':[['flex-shrink','0']],'items-start':[['align-items','flex-start']],'items-center':[['align-items','center']],'items-end':[['align-items','flex-end']],'items-stretch':[['align-items','stretch']],'items-baseline':[['align-items','baseline']],'justify-start':[['justify-content','flex-start']],'justify-center':[['justify-content','center']],'justify-end':[['justify-content','flex-end']],'justify-between':[['justify-content','space-between']],'justify-around':[['justify-content','space-around']],'justify-evenly':[['justify-content','space-evenly']],'self-start':[['align-self','flex-start']],'self-center':[['align-self','center']],'self-end':[['align-self','flex-end']],'text-left':[['text-align','left']],'text-center':[['text-align','center']],'text-right':[['text-align','right']],italic:[['font-style','italic']],underline:[['text-decoration-line','underline']],'no-underline':[['text-decoration-line','none']],uppercase:[['text-transform','uppercase']],lowercase:[['text-transform','lowercase']],capitalize:[['text-transform','capitalize']],truncate:[['overflow','hidden'],['text-overflow','ellipsis'],['white-space','nowrap']],'overflow-hidden':[['overflow','hidden']],'overflow-auto':[['overflow','auto']],'overflow-scroll':[['overflow','scroll']],'cursor-pointer':[['cursor','pointer']],'pointer-events-none':[['pointer-events','none']],'object-cover':[['object-fit','cover']],'object-contain':[['object-fit','contain']],border:[['border-width','1px']],transition:[['transition-property','color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter'],['transition-timing-function','cubic-bezier(0.4, 0, 0.2, 1)'],['transition-duration','150ms']],'ease-in':[['transition-timing-function','cubic-bezier(0.4, 0, 1, 1)']],'ease-out':[['transition-timing-function','cubic-bezier(0, 0, 0.2, 1)']],'ease-in-out':[['transition-timing-function','cubic-bezier(0.4, 0, 0.2, 1)']]};
const twCol=n=>{if(n==='white')return '#ffffff';if(n==='black')return '#000000';if(n==='transparent')return 'transparent';if(n==='current')return 'currentColor';const m=n.match(/^([a-z]+)-(\d+)$/);if(m&&TWPAL[m[1]]){const i=TWSH.indexOf(+m[2]);if(i>=0)return TWPAL[m[1]][i]}const a=n.match(/^\[(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|rgba?\([^\]]*\)|hsla?\([^\]]*\))\]$/);return a?a[1].replace(/_/g,' '):null};
const twAlpha=(c,op)=>{if(!/^#/.test(c))return c;const h6=c.length===4?'#'+[...c.slice(1)].map(x=>x+x).join(''):c,[r,g,b]=rgb(h6);return `rgb(${r} ${g} ${b} / ${r3(op/100)})`};
const twSp=v=>{if(v==='px')return '1px';if(v==='auto')return 'auto';if(v==='full')return '100%';const a=v.match(/^\[(.+)\]$/);if(a)return a[1].replace(/_/g,' ');const f=v.match(/^(\d+)\/(\d+)$/);if(f)return r3(f[1]/f[2]*100)+'%';if(/^\d*\.?\d+$/.test(v))return +v===0?'0px':r3(v*.25)+'rem';return null};
const twDecl=c=>{let m;if(TWST[c])return TWST[c];
 if(m=c.match(/^\[([\w-]+):(.+)\]$/))return [[m[1],m[2].replace(/_/g,' ')]];
 if(m=c.match(/^(-?)(p|m)([trblxy]?)-(.+)$/)){const v=twSp(m[4]);if(v==null)return null;const val=(m[1]&&v!=='auto'?'-':'')+v,pr=m[2]==='p'?'padding':'margin',S={t:['top'],r:['right'],b:['bottom'],l:['left'],x:['left','right'],y:['top','bottom'],'':['']}[m[3]];return S.map(x=>[x?pr+'-'+x:pr,val])}
 if(m=c.match(/^gap(-x|-y)?-(.+)$/)){const v=twSp(m[2]);return v==null?null:[[m[1]==='-x'?'column-gap':m[1]==='-y'?'row-gap':'gap',v]]}
 if(m=c.match(/^(w|h|min-w|min-h|max-w|max-h)-(.+)$/)){const P={w:'width',h:'height','min-w':'min-width','min-h':'min-height','max-w':'max-width','max-h':'max-height'}[m[1]],v=m[1]==='max-w'&&MWD[m[2]]?MWD[m[2]]:m[2]==='screen'?(/h/.test(m[1])?'100vh':'100vw'):m[2]==='min'?'min-content':m[2]==='max'?'max-content':m[2]==='fit'?'fit-content':twSp(m[2]);return v==null?null:[[P,v]]}
 if(m=c.match(/^(-?)(inset|top|right|bottom|left)-(.+)$/)){const v=twSp(m[3]);return v==null?null:[[m[2],(m[1]&&v!=='auto'?'-':'')+v]]}
 if(m=c.match(/^z-(\d+)$/))return [['z-index',m[1]]];
 if(m=c.match(/^text-(xs|sm|base|lg|xl|[2-9]xl)$/)){const f=FSZ[m[1]];return [['font-size',f[0]],['line-height',f[1]]]}
 if(m=c.match(/^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/))return [['font-weight',FWT[m[1]]]];
 if(m=c.match(/^leading-(.+)$/)){const v=LHT[m[1]]||twSp(m[1]);return v==null?null:[['line-height',v]]}
 if(m=c.match(/^tracking-(.+)$/))return TRK[m[1]]?[['letter-spacing',TRK[m[1]]]]:null;
 if(m=c.match(/^text-\[(\d+(?:\.\d+)?(?:px|rem|em))\]$/))return [['font-size',m[1]]];
 if(m=c.match(/^(text|bg|border)-(.+?)(?:\/(\d+))?$/)){let col=twCol(m[2]);if(col){if(m[3])col=twAlpha(col,+m[3]);return [[m[1]==='text'?'color':m[1]==='bg'?'background-color':'border-color',col]]}}
 if(m=c.match(/^border(-[trbl])?-(0|2|4|8)$/))return [['border'+(m[1]?{'-t':'-top','-r':'-right','-b':'-bottom','-l':'-left'}[m[1]]:'')+'-width',m[2]+'px']];
 if(m=c.match(/^border-(solid|dashed|dotted|double|none)$/))return [['border-style',m[1]]];
 if(m=c.match(/^rounded(?:-(sm|md|lg|xl|2xl|3xl|full|none))?$/))return [['border-radius',m[1]?RDT[m[1]]:'0.25rem']];
 if(m=c.match(/^shadow(?:-(sm|md|lg|xl|2xl|none))?$/))return [['box-shadow',SHD[m[1]||'d']]];
 if(m=c.match(/^opacity-(\d+)$/))return [['opacity',r3(m[1]/100)]];
 if(m=c.match(/^duration-(\d+)$/))return [['transition-duration',m[1]+'ms']];
 if(m=c.match(/^scale-(\d+)$/))return [['transform','scale('+r3(m[1]/100)+')']];
 if(m=c.match(/^(-?)rotate-(\d+)$/))return [['transform','rotate('+(m[1]?'-':'')+m[2]+'deg)']];
 if(m=c.match(/^grid-(cols|rows)-(\d+)$/))return [['grid-template-'+(m[1]==='cols'?'columns':'rows'),`repeat(${m[2]}, minmax(0, 1fr))`]];
 if(m=c.match(/^col-span-(\d+)$/))return [['grid-column',`span ${m[1]} / span ${m[1]}`]];
 if(m=c.match(/^aspect-(video|square)$/))return [['aspect-ratio',m[1]==='video'?'16 / 9':'1 / 1']];
 return null};
const twSplit=c=>{const p=[];let d=0,b='';for(const ch of c){if(ch==='[')d++;if(ch===']')d--;if(ch===':'&&!d){p.push(b);b=''}else b+=ch}p.push(b);return p};
const TWBP={sm:640,md:768,lg:1024,xl:1280,'2xl':1536},TWPS={hover:':hover',focus:':focus',active:':active',disabled:':disabled','focus-visible':':focus-visible',first:':first-child',last:':last-child',odd:':nth-child(odd)',even:':nth-child(even)'};
const twCss=src=>{const groups=new Map(),unknown=[];let ok=0,total=0;
 for(const c of src.split(/\s+/).filter(Boolean)){total++;const parts=twSplit(c);let u=parts.pop();const imp=u[0]==='!';if(imp)u=u.slice(1);
  if(parts.some(v=>!TWBP[v]&&v!=='dark'&&!TWPS[v])){unknown.push(c);continue}
  const d=twDecl(u);if(!d){unknown.push(c);continue}ok++;const k=parts.join(':');if(!groups.has(k))groups.set(k,new Map());d.forEach(([p,v])=>groups.get(k).set(p,v+(imp?' !important':'')))}
 const blocks=[];[...groups.entries()].sort((a,b)=>(a[0]===''?-1:0)-(b[0]===''?-1:0)).forEach(([k,m])=>{const vs=k?k.split(':'):[],ps=vs.filter(v=>TWPS[v]).map(v=>TWPS[v]).join(''),md=vs.filter(v=>TWBP[v]||v==='dark').map(v=>v==='dark'?'(prefers-color-scheme: dark)':`(min-width: ${TWBP[v]}px)`),body=[...m.entries()].map(([p,v])=>p+': '+v+';');
  const I=md.length?'  ':'',rule=`${I}.element${ps} {\n${body.map(x=>I+'  '+x).join('\n')}\n${I}}`;blocks.push(md.length?`@media ${md.join(' and ')} {\n${rule}\n}`:rule)});
 return {css:blocks.join('\n\n'),ok,total,unknown}};
const FPAIRS=[['Playfair Display','Source Sans 3','600;700','400;600','serif','sans-serif'],['Montserrat','Merriweather','600;700','400;700','sans-serif','serif'],['Poppins','Inter','600;700','400;500','sans-serif','sans-serif'],['Lora','Roboto','600;700','400;500','serif','sans-serif'],['Space Grotesk','DM Sans','500;700','400;500','sans-serif','sans-serif'],['Bricolage Grotesque','Instrument Sans','600;800','400;600','sans-serif','sans-serif'],['Raleway','Lato','600;700','400;700','sans-serif','sans-serif'],['Oswald','Open Sans','500;700','400;600','sans-serif','sans-serif'],['DM Serif Display','DM Sans','','400;500','serif','sans-serif'],['Fraunces','Inter','600;700','400;500','serif','sans-serif'],['Rubik','Karla','500;700','400;600','sans-serif','sans-serif'],['Libre Baskerville','Nunito Sans','400;700','400;600','serif','sans-serif'],['Archivo Black','Work Sans','','400;500','sans-serif','sans-serif'],['Cormorant Garamond','Proza Libre','600;700','400;600','serif','sans-serif']];
const fpOf=s=>FPAIRS.find(p=>p[0]+' + '+p[1]===s.pair)||FPAIRS[0];
const fpUrl=p=>{const f=(n,w)=>n.replace(/ /g,'+')+(w?':wght@'+w:'');return `https://fonts.googleapis.com/css2?family=${f(p[0],p[2])}&family=${f(p[1],p[3])}&display=swap`};
const thTokens=(bg,tx,br,dark)=>{const b=dark?mix(br,[255,255,255],.22):br;return {bg,surface:mix(bg,rgb(tx),dark?.07:.05),text:tx,muted:mix(tx,rgb(bg),.45),border:mix(bg,rgb(tx),.16),brand:b,'on-brand':cr({fg:'#ffffff',bg:b})>=cr({fg:'#111111',bg:b})?'#ffffff':'#111111'}};
const thBlock=(t,ind)=>Object.entries(t).map(([k,v])=>`${ind}--color-${k}: ${v};`).join('\n');
const G={
gradient:{label:'background',s:{type:'linear',angle:135,p2:50,n:3,pos:[0,50,100],c1:'#ff9a3c',c2:'#e4457b',c3:'#3a4fd8',c4:'#ffd34d',c5:'#18c4a7',rep:false,rsz:40},
 handles:s=>{const n=gn(s),pos=gpos(s),r=$('#subject').getBoundingClientRect(),W=r.width||240,H=r.height||200,hs=pos.map((p,i)=>[p,100,'stop',s['c'+(i+1)]]);
  if(s.type!=='radial'){const a=s.angle*Math.PI/180,R=Math.min(W,H)/2+26;hs.push([50+Math.sin(a)*R/W*100,50-Math.cos(a)*R/H*100,'dial'])}return hs},
 hset:(s,i,x,y)=>{const n=gn(s);if(i<n){const pos=ensurePos(s),lo=i?pos[i-1]:0,hi=i<n-1?pos[i+1]:100;pos[i]=Math.round(Math.max(lo,Math.min(hi,x)));if(n===3)s.p2=pos[1]}
  else{const r=$('#subject').getBoundingClientRect();let a=Math.round(Math.atan2((x-50)/100*r.width,-(y-50)/100*r.height)*180/Math.PI);if(a<0)a+=360;const q=a%45;if(q<=3||q>=42)a=Math.round(a/45)*45;s.angle=a%360}},
 f:s=>{const n=gn(s);ensurePos(s);return [['sel','type',['linear','radial','conic']],['r','Angle','angle',0,360,1,'deg'],['sel','n',[2,3,4,5],'Stops'],...[...Array(n).keys()].flatMap(i=>[['c','Color '+(i+1),'c'+(i+1)],['r','Position '+(i+1),i,0,100,1,'%',s=>s.pos]]),['btn','Even spacing',s=>{s.pos=evenPos(s)}],['chk','Repeating','rep'],...(s.rep?[['r','Repeat every','rsz',10,300,1,s.type==='conic'?'deg':'px']]:[]),['btn','Randomize colors',s=>{for(let i=1;i<=5;i++)s['c'+i]=rnd()}]]},
 out:s=>{const st=gstops(s),pre=s.rep?'repeating-':'';return [['background',s.type==='linear'?`${pre}linear-gradient(${s.angle}deg, ${st})`:s.type==='radial'?`${pre}radial-gradient(circle at center, ${st})`:`${pre}conic-gradient(from ${s.angle}deg, ${st})`]]}},
radius:{label:'border-radius',s:{a:60,b:40,c:30,d:70,e:60,f:30,g:70,h:40},pv:GRAD,
 handles:s=>{const P=[[s.a,0],[100-s.b,0],[100-s.c,100],[s.d,100],[0,s.e],[100,s.f],[100,100-s.g],[0,100-s.h]];if(Math.abs(P[0][0]-P[1][0])<7)P[1][1]=9;if(Math.abs(P[2][0]-P[3][0])<7)P[3][1]=91;if(Math.abs(P[4][1]-P[7][1])<7)P[7][0]=9;if(Math.abs(P[5][1]-P[6][1])<7)P[6][0]=91;return P.map(p=>[p[0],p[1],'edge'])},
 hset:(s,i,x,y)=>{const X=Math.round(cl2(x)),Y=Math.round(cl2(y));[()=>{s.a=X},()=>{s.b=100-X},()=>{s.c=100-X},()=>{s.d=X},()=>{s.e=Y},()=>{s.f=Y},()=>{s.g=100-Y},()=>{s.h=100-Y}][i]()},
 f:[['r','Top-left X','a',0,100,1,'%'],['r','Top-right X','b',0,100,1,'%'],['r','Bottom-right X','c',0,100,1,'%'],['r','Bottom-left X','d',0,100,1,'%'],['r','Top-left Y','e',0,100,1,'%'],['r','Top-right Y','f',0,100,1,'%'],['r','Bottom-right Y','g',0,100,1,'%'],['r','Bottom-left Y','h',0,100,1,'%'],['btn','Randomize blob',s=>{'abcdefgh'.split('').forEach(k=>s[k]=rn(30,70))}]],
 out:s=>[['border-radius',`${s.a}% ${s.b}% ${s.c}% ${s.d}% / ${s.e}% ${s.f}% ${s.g}% ${s.h}%`]]},
glass:{label:'glassmorphism',base:'radial-gradient(circle at 42% 40%,#ffd34d 0 70px,transparent 71px),radial-gradient(circle at 58% 62%,#ff4d8d 0 90px,transparent 91px),linear-gradient(135deg,#6a5cff,#18c4a7)',s:{blur:14,alpha:.18,sat:140,border:.35,radius:20,tint:'#ffffff'},
 f:[['r','Blur','blur',0,40,1,'px'],['r','Opacity','alpha',0,.8,.01,''],['r','Saturate','sat',100,250,5,'%'],['r','Border','border',0,1,.01,''],['r','Radius','radius',0,60,1,'px'],['c','Tint color','tint']],
 out:s=>{const b=`blur(${s.blur}px) saturate(${s.sat}%)`;return [['background',`rgba(${rgb(s.tint||'#ffffff').join(', ')}, ${s.alpha})`],['backdrop-filter',b],['-webkit-backdrop-filter',b],['border',`1px solid rgba(255, 255, 255, ${s.border})`],['border-radius',s.radius+'px']]}},
transform:{label:'transform',s:{rot:0,sc:100,skx:0,sky:0,tx:0,ty:0,rx:0,ry:0,persp:800,org:'center'},pv:GRAD,
 f:[['r','Rotate','rot',-180,180,1,'deg'],['r','Rotate X','rx',-90,90,1,'deg'],['r','Rotate Y','ry',-90,90,1,'deg'],['r','Perspective','persp',200,2000,50,'px'],['r','Scale','sc',20,200,1,'%'],['r','Skew X','skx',-60,60,1,'deg'],['r','Skew Y','sky',-60,60,1,'deg'],['r','Move X','tx',-150,150,1,'px'],['r','Move Y','ty',-150,150,1,'px'],['sel','org',['center','top left','top','top right','left','right','bottom left','bottom','bottom right'],'Origin']],
 out:s=>{const p=[];if(s.rx||s.ry)p.push(`perspective(${s.persp}px)`);if(s.tx||s.ty)p.push(`translate(${s.tx}px, ${s.ty}px)`);if(s.rx)p.push(`rotateX(${s.rx}deg)`);if(s.ry)p.push(`rotateY(${s.ry}deg)`);if(s.rot)p.push(`rotate(${s.rot}deg)`);if(s.sc!==100)p.push(`scale(${s.sc/100})`);if(s.skx||s.sky)p.push(`skew(${s.skx}deg, ${s.sky}deg)`);return [['transform',p.length?p.join(' '):'none'],...(s.org!=='center'?[['transform-origin',s.org]]:[])]}},
flex:{label:'flexbox',cls:'kids v',kids:4,s:{dir:'row',jc:'flex-start',ai:'stretch',wrap:'nowrap',gap:10,item:1,items:[0,1,2,3].map(()=>({g:0,as:'auto',o:0,b:0}))},pv:[['width','320px'],['height','220px']],
 f:[['sel','dir',['row','column','row-reverse','column-reverse'],'Direction'],['sel','jc',['flex-start','center','flex-end','space-between','space-around','space-evenly'],'Justify'],['sel','ai',['stretch','flex-start','center','flex-end','baseline'],'Align'],['sel','wrap',['nowrap','wrap'],'Wrap'],['r','Gap','gap',0,40,1,'px'],
  ['sel','item',[1,2,3,4],'Item'],['r','Grow','g',0,5,1,'',s=>s.items[s.item-1]],['r','Basis (0 = auto)','b',0,200,5,'px',s=>s.items[s.item-1]],['r','Order','o',-3,3,1,'',s=>s.items[s.item-1]],['sel','as',['auto','flex-start','center','flex-end','stretch'],'Align self',s=>s.items[s.item-1]]],
 kidCss:(s,i)=>{const t=s.items[i];return `flex-grow:${t.g};align-self:${t.as};order:${t.o};`+(t.b?`flex-basis:${t.b}px;`:'')+(i===s.item-1?'box-shadow:0 0 0 2px #fff,0 0 0 4px #1b2240':'')},
 out:flexOut,dec:flexOut,
 code:s=>`.container {\n${flexOut(s).map(([p,v])=>`  ${p}: ${v};`).join('\n')}\n}`+s.items.map((t,i)=>{const r=[];if(t.g)r.push(`flex-grow: ${t.g};`);if(t.b)r.push(`flex-basis: ${t.b}px;`);if(t.as!=='auto')r.push(`align-self: ${t.as};`);if(t.o)r.push(`order: ${t.o};`);return r.length?`\n\n.item:nth-child(${i+1}) {\n  ${r.join('\n  ')}\n}`:''}).join('')},
grid:{label:'css grid',cls:'kids v',kids:s=>s.mode==='Fixed'?Math.min(30,s.cols*s.rows):8,s:{mode:'Fixed',cols:3,rows:2,gap:10,rgap:10,minw:100,pw:320,tr:'1fr'},
 pv:s=>[['width',s.pw+'px'],['height',s.mode==='Fixed'?'220px':'auto'],['overflow','auto']],
 f:s=>[['sel','mode',['Fixed','auto-fit','auto-fill'],'Columns'],...(s.mode==='Fixed'?[['r','Columns','cols',1,6,1,''],['r','Rows','rows',1,5,1,''],['sel','tr',['1fr','auto','minmax(0, 1fr)'],'Track size']]:[['r','Min width','minw',60,300,5,'px'],['r','Preview width','pw',160,560,10,'px']]),['r','Column gap','gap',0,40,1,'px'],['r','Row gap','rgap',0,40,1,'px']],
 out:grOut},
clamp:{label:'fluid clamp',cls:s=>s.mode==='Type scale'?'kids sc':(kidsOf(s)?'kids':''),kids:kidsOf,
 s:{mode:'Single value',prop:'font-size',min:16,max:48,minVw:360,maxVw:1200,vw:800,root:16,unit:'rem',per:'vw',bmin:16,bmax:18,rmin:1.2,rmax:1.333},
 txt:s=>s.mode==='Single value'&&s.prop==='font-size'?'Fluid type':'',
 f:s=>{const m=['sel','mode',['Single value','Type scale'],'Mode'],vp=[['r','Min viewport','minVw',280,800,10,'px'],['r','Max viewport','maxVw',800,2000,10,'px'],['r','Preview at','vw',280,2000,10,'px']],tail=[['r','Root size','root',10,24,1,'px'],['sel','unit',['rem','px'],'Units'],['sel','per',['vw','cqi'],'Scale with']];
  return s.mode==='Type scale'?[m,['r','Base min','bmin',10,24,1,'px'],['r','Base max','bmax',12,32,1,'px'],['r','Ratio min','rmin',1.05,1.6,.01,''],['r','Ratio max','rmax',1.05,1.8,.01,''],...vp,...tail]
  :[m,['btn','Body text',s=>Object.assign(s,{prop:'font-size',min:16,max:20}),s=>s.prop==='font-size'&&s.min==16&&s.max==20],['btn','Heading',s=>Object.assign(s,{prop:'font-size',min:32,max:72}),s=>s.prop==='font-size'&&s.min==32&&s.max==72],['btn','Section padding',s=>Object.assign(s,{prop:'padding',min:24,max:96}),s=>s.prop==='padding'&&s.min==24&&s.max==96],['btn','Grid gap',s=>Object.assign(s,{prop:'gap',min:12,max:32}),s=>s.prop==='gap'&&s.min==12&&s.max==32],
   ['sel','prop',['font-size','padding','margin','gap','width','height'],'Property'],['r','Min size','min',1,200,1,'px'],['r','Max size','max',1,400,1,'px'],...vp,...tail]},
 pv:s=>{if(s.mode==='Type scale')return [['width','100%'],['max-height','320px'],['overflow-y','auto'],['height','auto'],['display','block']];const px=spx(s)+'px',G2='linear-gradient(135deg,#4a5bdc,#8b9bff)';
  return {'font-size':[['background','transparent'],['width','100%'],['height','auto'],['font-weight','800'],['color','#1b2240'],['font-family','"Bricolage Grotesque",system-ui,sans-serif'],['line-height','1.1'],['text-align','center'],['font-size',px]],
   padding:[['width','320px'],['height','auto'],['padding',px]],gap:[['width','320px'],['height','auto'],['display','flex'],['gap',px]],margin:[['width','320px'],['height','auto']],
   width:[['background',G2],['height','56px'],['width',px],['max-width','100%']],height:[['background',G2],['width','140px'],['height',px]]}[s.prop]},
 kidTxt:(i,s)=>s.mode==='Type scale'?`Step ${STEPS[i]}: ${Math.round(sz(...stepv(s,STEPS[i]),s,s.vw))}px`:s.prop==='padding'?'content':s.prop==='margin'?'AB'[i]:i+1,
 kidCss:(s,i)=>s.mode==='Type scale'?`background:none;color:#1b2240;display:block;text-align:left;padding:0;min-height:0;min-width:0;border-radius:0;font-weight:700;line-height:1.15;font-size:${sz(...stepv(s,STEPS[i]),s,s.vw).toFixed(1)}px`:s.prop==='padding'?'height:40px':s.prop==='margin'&&i===0?`margin-bottom:${spx(s)}px`:'',
 out:s=>[],
 code:s=>{if(s.mode==='Type scale')return `:root {\n${STEPS.map(n=>{const [a,b]=stepv(s,n);return `  --step-${n}: ${cv(a,b,s)};`}).join('\n')}\n}\n\n/* usage */\nh1 { font-size: var(--step-5); }\nh2 { font-size: var(--step-4); }\nh3 { font-size: var(--step-3); }\nh4 { font-size: var(--step-2); }\nh5 { font-size: var(--step-1); }\nbody { font-size: var(--step-0); }\nsmall { font-size: var(--step--1); }`+(s.per==='cqi'?'\n/* cqi needs container-type: inline-size on a parent element */':'');
  const w=s.prop==='font-size'&&Math.max(s.min,s.max)/Math.min(s.min,s.max)>2.5;
  return `${s.prop}: ${cv(s.min,s.max,s)};\n/* ${WID.map(x=>`${x}px: ${r3(sz(s.min,s.max,s,x))}px`).join(' | ')} */`+(w?'\n/* Warning: max is more than 2.5x min, so text may not reach 200% zoom (WCAG 1.4.4) */':'')+(s.per==='cqi'?'\n/* cqi needs container-type: inline-size on a parent element */':'')}},
contrast:{label:'colors',s:{fg:'#1b2240',bg:'#ffd34d'},txt:s=>`${cr(s).toFixed(2)}:1  ${cr(s)>=4.5?'AA pass':'AA fail'}`,
 f:[['c','Text color','fg'],['c','Background','bg'],['btn','Fix text for AA',s=>{s.fg=fixC(s,4.5)}],['btn','Fix text for AAA',s=>{s.fg=fixC(s,7)}],['btn','Swap colors',s=>{[s.fg,s.bg]=[s.bg,s.fg]}]],
 pv:s=>[['color',s.fg],['background',s.bg],['display','grid'],['place-items','center'],['font','800 1.6rem "Bricolage Grotesque",system-ui,sans-serif']],
 out:s=>{const r=cr(s),y=v=>v?'pass':'fail';return [['color',s.fg],['background',s.bg],['',`contrast ${r.toFixed(2)}:1`],['',`AA text ${y(r>=4.5)} | AA large text ${y(r>=3)} | AAA text ${y(r>=7)} | AAA large text ${y(r>=4.5)} | UI components ${y(r>=3)}`]]}},
clip:{label:'clip-path',gd:1,s:{mode:'Preset shapes',shape:'hexagon',pts:[[50,0],[100,100],[0,100]],sel:0,snap:true,guides:true,grid:false},pv:[['background','linear-gradient(135deg,#4a5bdc,#e4457b)'],['width','190px'],['height','190px'],['border-radius','0']],
 handles:s=>s.mode==='Draw your own'?s.pts:null,
 f:s=>s.mode==='Preset shapes'?[['sel','mode',['Preset shapes','Draw your own'],'Mode'],['sel','shape',Object.keys(CP),'Shape']]:[['sel','mode',['Preset shapes','Draw your own'],'Mode'],...PK.map(k=>['btn',k,s=>{s.pts=polyPts(k);s.sel=0}]),['btn','Add point',s=>{const a=s.pts[s.sel],b=s.pts[(s.sel+1)%s.pts.length];s.pts.splice(s.sel+1,0,[Math.round((a[0]+b[0])/2),Math.round((a[1]+b[1])/2)]);s.sel++}],['btn','Remove point',s=>{if(s.pts.length>3){s.pts.splice(s.sel,1);s.sel=Math.max(0,s.sel-1)}}],
  ['btn','Center shape',s=>{const x=s.pts.map(p=>p[0]),y=s.pts.map(p=>p[1]),dx=50-(Math.min(...x)+Math.max(...x))/2,dy=50-(Math.min(...y)+Math.max(...y))/2;s.pts=s.pts.map(p=>[Math.round(p[0]+dx),Math.round(p[1]+dy)])}],['btn','Flip horizontal',s=>{s.pts=s.pts.map(p=>[100-p[0],p[1]])}],['btn','Flip vertical',s=>{s.pts=s.pts.map(p=>[p[0],100-p[1]])}],
  ['chk','Snap to guides','snap'],['chk','Show guides','guides'],['chk','Grid lines','grid'],['r','Point X','0',0,100,1,'%',s=>s.pts[s.sel]],['r','Point Y','1',0,100,1,'%',s=>s.pts[s.sel]]],
 out:s=>[['clip-path',s.mode==='Preset shapes'?CP[s.shape]:`polygon(${s.pts.map(p=>p[0]+'% '+p[1]+'%').join(', ')})`]]},
palette:{label:'palette',cls:'kids',kids:10,s:{c:'#4a5bdc'},pv:[['width','340px'],['height','auto'],['display','grid'],['grid-template-columns','repeat(5, 1fr)'],['gap','6px']],
 f:[['c','Base color (500)','c']],kidTxt:i=>LV[i],kidCss:(s,i)=>`background:${shade(s.c,i)};height:60px;color:${i<5?'#1b2240':'#fff'};font-size:.8rem`,out:s=>[],
 code:s=>`:root {\n${LV.map((l,i)=>`  --brand-${l}: ${shade(s.c,i)};`).join('\n')}\n}`},
convert:{label:'color',s:{c:'#4a5bdc',a:100},txt:s=>s.c,f:[['c','Pick a color','c'],['r','Opacity','a',0,100,1,'%']],
 pv:s=>[['background',`rgba(${rgb(s.c).join(',')},${s.a/100})`],['color',lum(s.c)>.4?'#1b2240':'#fff'],['display','grid'],['place-items','center'],['font','800 1.4rem "JetBrains Mono",ui-monospace,monospace']],out:s=>[['color',s.c]],
 dec:s=>[['color',s.c+(s.a<100?Math.round(s.a*2.55).toString(16).padStart(2,'0'):'')]],
 code:s=>{const a=s.a,al=a<100?` / ${a}%`:'';return `:root {\n  --color-hex: ${s.c+(a<100?Math.round(a*2.55).toString(16).padStart(2,'0'):'')};\n  --color-rgb: rgb(${rgb(s.c).join(' ')}${al});\n  --color-hsl: ${hsl(s.c).replace(')',al+')')};\n  --color-oklch: ${oklch(s.c,a)};\n}\n\n/* mix with white: color-mix(in srgb, ${s.c} 80%, white) */`}},
type:{label:'typography',s:{ff:'sans',size:22,weight:600,ls:0,lh:1.4,tt:'none'},txt:'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.',
 pv:[['width','100%'],['height','auto'],['background','transparent'],['color','#1b2240'],['padding','16px'],['text-align','left']],
 f:[['sel','ff',['sans','serif','mono'],'Family'],['r','Size','size',10,72,1,'px'],['r','Weight','weight',100,900,100,''],['r','Spacing','ls',-.1,.3,.01,'em'],['r','Line height','lh',1,2.2,.05,''],['sel','tt',['none','uppercase','capitalize'],'Case']],
 out:s=>[['font-family',FF[s.ff]],['font-size',s.size+'px'],['font-weight',s.weight],['letter-spacing',r3(s.ls)+'em'],['line-height',r3(s.lh)],['text-transform',s.tt]]},
units:{label:'font-size',s:{px:24,root:16,rem:1.5,dir:'px to rem',out:'Single'},txt:s=>s.dir==='px to rem'?`${s.px}px = ${r3(s.px/s.root)}rem`:`${s.rem}rem = ${r3(s.rem*s.root)}px`,
 f:s=>[['sel','dir',['px to rem','rem to px'],'Direction'],s.dir==='px to rem'?['r','Pixels','px',1,200,1,'px']:['r','Rem','rem',.25,12,.125,'rem'],['r','Root size','root',10,24,1,'px'],['sel','out',['Single','Table','Variables'],'Output']],
 pv:[['background','transparent'],['width','100%'],['height','auto'],['font','800 1.8rem "Bricolage Grotesque",system-ui,sans-serif'],['color','#1b2240'],['text-align','center']],
 out:s=>[],dec:s=>s.out==='Single'?[['font-size',s.dir==='px to rem'?`${r3(s.px/s.root)}rem`:`${s.rem}rem`]]:null,
 code:s=>s.out==='Table'?`/* root font size: ${s.root}px */\n${PXS.map(p=>`/* ${p}px = ${r3(p/s.root)}rem */`).join('\n')}`:s.out==='Variables'?`:root {\n${PXS.map(p=>`  --space-${p}: ${r3(p/s.root)}rem;`).join('\n')}\n}`:s.dir==='px to rem'?`font-size: ${r3(s.px/s.root)}rem;\n/* ${s.px}px at a ${s.root}px root size */`:`font-size: ${s.rem}rem;\n/* = ${r3(s.rem*s.root)}px at a ${s.root}px root size */`},
ease:{label:'easing',s:{x1:.25,y1:.1,x2:.25,y2:1},
 handles:s=>[[s.x1*100,yp(s.y1),'bz'],[s.x2*100,yp(s.y2),'bz']],
 hset:(s,i,x,y)=>{const nx=Math.round(cl2(x))/100,ny=Math.round((1.5-cl2(y)/100*2)*100)/100;if(i===0){s.x1=nx;s.y1=ny}else{s.x2=nx;s.y2=ny}},
 f:[['r','X1','x1',0,1,.01,''],['r','Y1','y1',-1,2,.01,''],['r','X2','x2',0,1,.01,''],['r','Y2','y2',-1,2,.01,''],...BZP.map(([n,a,b,c,d])=>['btn',n,s=>Object.assign(s,{x1:a,y1:b,x2:c,y2:d}),s=>eqb(s,a,b,c,d)])],
 inject:()=>'@keyframes ezs{from{transform:translateX(0)}to{transform:translateX(100px)}}',
 html:s=>`<svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="none" style="display:block"><path d="M0,75H100M0,50H100M0,25H100" stroke="rgba(27,34,64,.12)" stroke-width="1" fill="none" vector-effect="non-scaling-stroke"/><path d="M0,75L${s.x1*100},${yp(s.y1)}M100,25L${s.x2*100},${yp(s.y2)}" stroke="rgba(27,34,64,.4)" stroke-width="1" fill="none" stroke-dasharray="3 3" vector-effect="non-scaling-stroke"/><path d="M0,75C${s.x1*100},${yp(s.y1)} ${s.x2*100},${yp(s.y2)} 100,25" stroke="#4a5bdc" stroke-width="3" fill="none" vector-effect="non-scaling-stroke"/><circle cx="0" cy="75" r="3.2" fill="#e4457b" style="animation:ezs 1.6s ${bz(s)} infinite alternate"/></svg>`,
 pv:[['width','260px'],['height','260px'],['background','#fff'],['border-radius','16px'],['max-width','100%']],
 out:s=>[['transition-timing-function',bz(s)]]},
neu:{label:'neumorphism',stage:s=>s.c,s:{c:'#e0e5ec',d:10,b:22,r:24,inset:false},pv:[['width','180px'],['height','180px']],
 f:[['c','Base color','c'],['r','Distance','d',2,30,1,'px'],['r','Blur','b',0,60,1,'px'],['r','Radius','r',0,80,1,'px'],['chk','Pressed in (inset)','inset']],
 out:s=>{const dk=mix(s.c,[0,0,0],.14),lt=mix(s.c,[255,255,255],.75),i=s.inset?'inset ':'';return [['background',s.c],['border-radius',s.r+'px'],['box-shadow',`${i}${s.d}px ${s.d}px ${s.b}px ${dk}, ${i}-${s.d}px -${s.d}px ${s.b}px ${lt}`]]}},
border:{label:'border',s:{w:3,st:'solid',c:'#4a5bdc',r:16,sides:['top','right','bottom','left'],ow:0,oo:4},
 f:[['r','Width','w',0,16,1,'px'],['sel','st',['solid','dashed','dotted','double'],'Style'],['c','Color','c'],['multi','sides',['top','right','bottom','left'],'Sides'],['r','Radius','r',0,100,1,'px'],['r','Outline','ow',0,12,1,'px'],['r','Outline offset','oo',-8,20,1,'px']],
 out:s=>{const b=`${s.w}px ${s.st} ${s.c}`,S=['top','right','bottom','left'],all=S.every(x=>s.sides.includes(x));return [...(all?[['border',b]]:S.filter(x=>s.sides.includes(x)).map(x=>['border-'+x,b])),['border-radius',s.r+'px'],...(s.ow>0?[['outline',`${s.ow}px ${s.st} ${s.c}`],['outline-offset',s.oo+'px']]:[])]}},
blend:{label:'background-blend-mode',s:{m:'multiply'},pv:[['background','linear-gradient(135deg,#ff9a3c,#e4457b),linear-gradient(90deg,#18c4a7,#4a5bdc)'],['width','220px'],['height','170px']],
 f:[['sel','m',['multiply','screen','overlay','darken','lighten','color-dodge','color-burn','hard-light','soft-light','difference','exclusion','hue','saturation','color','luminosity'],'Mode']],
 out:s=>[['background-blend-mode',s.m]],code:s=>`background-blend-mode: ${s.m};\n/* needs two or more backgrounds on the element */\n/* mix-blend-mode: ${s.m}; blends an element with what is behind it */`},
areas:{label:'grid-template-areas',cls:'kids v',kids:s=>AP[s.p].n.length,s:{p:'holy grail',gap:8},pv:[['width','340px'],['height','220px']],
 f:[['sel','p',Object.keys(AP),'Layout'],['r','Gap','gap',0,24,1,'px']],kidTxt:(i,s)=>AP[s.p].n[i],kidCss:(s,i)=>`grid-area:${AP[s.p].n[i]}`,
 out:s=>{const p=AP[s.p];return [['display','grid'],['grid-template-areas',p.a.map(x=>`"${x}"`).join(' ')],['grid-template-columns',p.c],['grid-template-rows',p.r],['gap',s.gap+'px']]},
 code:s=>{const p=AP[s.p];return `.layout {\n  display: grid;\n  grid-template-areas:\n${p.a.map(x=>`    "${x}"`).join('\n')};\n  grid-template-columns: ${p.c};\n  grid-template-rows: ${p.r};\n  gap: ${s.gap}px;\n}\n\n${p.n.map(n=>`.${n} { grid-area: ${n}; }`).join('\n')}`}},
media:{label:'media query',s:{mode:'Breakpoint ladder',k:'min-width: 768px',bps:[1400,1300,1200,1090,1024,1010,800,600,500],dir:'max-width',px:'only screen and',lay:'classic',cm:true},
 f:s=>{const m=['sel','mode',['Breakpoint ladder','Single query'],'Output'];return s.mode==='Single query'?[m,['sel','k',MQ.map(x=>x[0]),'Query']]:[m,
  ['btn','My ladder',s=>Object.assign(s,{dir:'max-width',px:'only screen and',lay:'classic',bps:[1400,1300,1200,1090,1024,1010,800,600,500]}),s=>s.dir==='max-width'&&s.px==='only screen and'&&s.lay==='classic'&&eqL(s.bps,[1400,1300,1200,1090,1024,1010,800,600,500])],
  ['btn','Bootstrap 5',s=>Object.assign(s,{dir:'min-width',bps:[576,768,992,1200,1400]}),s=>s.dir==='min-width'&&eqL(s.bps,[576,768,992,1200,1400])],
  ['btn','Tailwind',s=>Object.assign(s,{dir:'min-width',bps:[640,768,1024,1280,1536]}),s=>s.dir==='min-width'&&eqL(s.bps,[640,768,1024,1280,1536])],
  ['sel','dir',['max-width','min-width'],'Direction'],['sel','px',['only screen and','screen and','none'],'Prefix'],['sel','lay',['classic','compact'],'Layout'],
  ['chk','Device comments','cm'],['multi','bps',BPS,'Sizes','px']]},
 txt:s=>s.mode==='Single query'?MQ.find(x=>x[0]===s.k)[1]:`${s.bps.length} breakpoints`,
 pv:[['background','transparent'],['width','100%'],['height','auto'],['font','700 1.5rem "Bricolage Grotesque",system-ui,sans-serif'],['color','#1b2240'],['text-align','center']],out:s=>[],
 code:s=>s.mode==='Single query'?`@media ${s.k==='print'?'print':'('+s.k+')'} {\n  .element {\n    /* styles */\n  }\n}`:ladder(s)},
scroll:{label:'scrollbar',cls:'kids sb',kids:14,s:{w:10,th:'#4a5bdc',tr:'#e8ebff',r:6},pv:[['width','260px'],['height','180px'],['overflow-y','scroll'],['display','block']],
 f:[['r','Width','w',4,20,1,'px'],['r','Thumb radius','r',0,10,1,'px'],['c','Thumb color','th'],['c','Track color','tr']],kidCss:()=>'margin-bottom:6px;height:34px',
 inject:s=>`.gbox.sb::-webkit-scrollbar{width:${s.w}px}.gbox.sb::-webkit-scrollbar-track{background:${s.tr}}.gbox.sb::-webkit-scrollbar-thumb{background:${s.th};border-radius:${s.r}px}`,out:s=>[],
 code:s=>`.scroll::-webkit-scrollbar {\n  width: ${s.w}px;\n}\n.scroll::-webkit-scrollbar-track {\n  background: ${s.tr};\n}\n.scroll::-webkit-scrollbar-thumb {\n  background: ${s.th};\n  border-radius: ${s.r}px;\n}\n\n@supports not selector(::-webkit-scrollbar) {\n  .scroll {\n    scrollbar-width: thin;\n    scrollbar-color: ${s.th} ${s.tr};\n  }\n}`},
aspect:{label:'aspect-ratio',s:{p:'16 / 9',w:16,h:9},f:s=>[['sel','p',['16 / 9','4 / 3','1 / 1','3 / 2','21 / 9','9 / 16','4 / 5','custom'],'Ratio'],...(s.p==='custom'?[['r','Width','w',1,32,1,''],['r','Height','h',1,32,1,'']]:[])],
 pv:s=>[['width','260px'],['max-width','100%'],['height','auto'],['aspect-ratio',arv(s)],['background','linear-gradient(135deg,#4a5bdc,#e4457b)']],
 out:s=>{const [a,b]=arv(s).split('/').map(Number);return [['aspect-ratio',arv(s)],['',`padding-top fallback: ${r3(b/a*100)}%`]]}},
space:{label:'spacing scale',cls:'kids',kids:s=>s.n,s:{type:'Multiples',base:4,n:8,ratio:1.5,root:16,unit:'rem'},
 f:[['sel','type',['Multiples','Modular'],'Scale'],['r','Base','base',2,16,1,'px'],['r','Steps','n',3,12,1,''],['r','Ratio','ratio',1.1,2,.05,''],['r','Root size','root',10,24,1,'px'],['sel','unit',['rem','px'],'Units']],
 pv:[['width','340px'],['height','auto'],['display','flex'],['flex-direction','column'],['align-items','flex-start'],['gap','6px'],['overflow','auto'],['max-height','320px']],
 kidTxt:(i,s)=>`${spv(s,i)}px`,kidCss:(s,i)=>`width:${Math.min(300,spv(s,i))}px;min-height:0;height:22px;padding:0 6px;place-items:center start;font-size:.7rem;border-radius:6px`,out:s=>[],
 code:s=>`:root {\n${Array.from({length:s.n},(_,i)=>`  --space-${i+1}: ${r3(spv(s,i)/(s.unit==='rem'?s.root:1))}${s.unit==='rem'?'rem':'px'};`).join('\n')}\n}`},
cq:{label:'container query',s:{name:'card',type:'inline-size',dir:'min-width',bps:[400,640]},f:[['txt','name','Name'],['sel','type',['inline-size','size'],'Type'],['sel','dir',['min-width','max-width'],'Query'],['multi','bps',[240,320,400,480,560,640,768,1024],'Sizes','px']],
 txt:s=>`${s.bps.length} container queries`,pv:[['background','transparent'],['width','100%'],['height','auto'],['font','700 1.5rem "Bricolage Grotesque",system-ui,sans-serif'],['color','#1b2240'],['text-align','center']],out:s=>[],
 code:s=>{const n=(s.name||'card').replace(/[^\w-]/g,'-');return `.${n}-wrap {\n  container-type: ${s.type};\n  container-name: ${n};\n}\n\n${[...s.bps].map(Number).sort((a,b)=>s.dir==='min-width'?a-b:b-a).map(w=>`@container ${n} (${s.dir}: ${w}px) {\n  .${n} {\n    /* styles */\n  }\n}`).join('\n\n')}`}},
spec:{label:'specificity',s:{sel:'#nav .item:hover\n.nav a\nul li a\na'},f:[['area','sel','Selectors, one per line']],
 txt:s=>{const r=specRows(s);return r.length?`Winner: ${r[0].x}  (${r[0].v.join(',')})`:'Add a selector'},
 pv:[['background','transparent'],['width','100%'],['height','auto'],['font','700 1.1rem "JetBrains Mono",ui-monospace,monospace'],['color','#1b2240'],['text-align','center'],['padding','12px']],out:s=>[],
 code:s=>`/* (ids, classes/attributes/pseudo-classes, elements/pseudo-elements) */\n/* inline style beats every selector, !important beats inline */\n/* highest specificity first */\n${specRows(s).map(r=>`(${r.v.join(',')})  ${r.x}`).join('\n')}`},
svg:{label:'svg',s:{shape:'Blob',fill:'#4a5bdc',pts:7,rnd:45,seed:7,amp:60,freq:3},html:s=>`<svg viewBox="${svgVB(s)}" width="100%" style="display:block;max-height:240px"><path d="${svgPath(s)}" fill="${s.fill}"/></svg>`,
 f:s=>[['sel','shape',['Blob','Wave'],'Shape'],...(s.shape==='Blob'?[['r','Points','pts',3,12,1,''],['r','Randomness','rnd',0,100,1,'%'],['btn','New shape',s=>{s.seed=(s.seed*7+13)%9973}]]:[['r','Amplitude','amp',10,120,1,''],['r','Waves','freq',1,6,1,'']]),['c','Fill','fill']],
 pv:[['width','320px'],['max-width','100%'],['height','auto'],['background','transparent']],out:s=>[],
 code:s=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${svgVB(s)}">\n  <path fill="${s.fill}" d="${svgPath(s)}"/>\n</svg>`},
fmt:{label:'css',s:{css:'.card{display:flex;gap:12px;box-shadow:0 8px 24px rgba(0,0,0,.2)}\n.card:hover{transform:translateY(-4px)}\n@media (max-width:600px){.card{display:block}}',mode:'Format',ind:'2 spaces'},
 f:s=>[['sel','mode',['Format','Minify'],'Mode'],...(s.mode==='Format'?[['sel','ind',['2 spaces','4 spaces','Tab'],'Indent']]:[]),['area','css','Paste CSS here']],
 txt:s=>{const o=fmtCss(s),a=new TextEncoder().encode(s.css).length,b=new TextEncoder().encode(o).length;return s.mode==='Minify'?`${a} B to ${b} B (${a?Math.round((1-b/a)*100):0}% smaller)`:`${o.split('\n').length} lines`},
 pv:[['background','transparent'],['width','100%'],['height','auto'],['font','700 1.3rem "Bricolage Grotesque",system-ui,sans-serif'],['color','#1b2240'],['text-align','center']],out:s=>[],code:fmtCss},
tw:{label:'tailwind to css',s:{src:'flex items-center gap-4 p-6 rounded-xl bg-white shadow-lg hover:shadow-xl md:p-8 text-gray-900 font-semibold'},f:[['area','src','Paste Tailwind classes']],
 txt:s=>{const r=twCss(s.src);return `${r.ok} of ${r.total} classes converted`},pv:[['background','transparent'],['width','100%'],['height','auto'],['font','700 1.3rem "Bricolage Grotesque",system-ui,sans-serif'],['color','#1b2240'],['text-align','center']],out:s=>[],
 code:s=>{const r=twCss(s.src);return (r.css||'/* nothing converted yet */')+(r.unknown.length?`\n\n/* not converted: ${r.unknown.join(' ')} */`:'')+'\n\n/* values follow the Tailwind v3 default theme */'}},
fonts:{label:'fonts',s:{pair:'Playfair Display + Source Sans 3',via:'link tag',hs:40,bs:17},
 f:[['sel','pair',FPAIRS.map(p=>p[0]+' + '+p[1]),'Pair'],['r','Heading size','hs',20,64,1,'px'],['r','Body size','bs',12,22,1,'px'],['sel','via',['link tag','@import'],'Load with']],
 inject:s=>`@import url('${fpUrl(fpOf(s))}');`,
 html:s=>{const p=fpOf(s),hw=p[2]?p[2].split(';').pop():400;return `<h2 style="margin:0 0 8px;font-family:'${p[0]}',${p[4]};font-weight:${hw};font-size:${s.hs}px;line-height:1.1;color:#1b2240">Make it memorable</h2><p style="margin:0;font-family:'${p[1]}',${p[5]};font-size:${s.bs}px;line-height:1.55;color:#4a5170">The quick brown fox jumps over the lazy dog. Good pairing gives the heading a voice and keeps the paragraphs easy to read.</p>`},
 pv:[['width','100%'],['height','auto'],['background','transparent'],['text-align','left'],['padding','12px']],out:s=>[],
 code:s=>{const p=fpOf(s),u=fpUrl(p),head=s.via==='@import'?`@import url('${u}');`:`<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="${u}" rel="stylesheet">`;return `${head}\n\nh1, h2, h3 {\n  font-family: "${p[0]}", ${p[4]};\n}\n\nbody {\n  font-family: "${p[1]}", ${p[5]};\n}`}},
theme:{label:'theme colors',s:{brand:'#4a5bdc',lbg:'#f6f7ff',ltx:'#14172e',dbg:'#0b0e1f',dtx:'#eef0ff',via:'both'},
 f:[['c','Brand color','brand'],['c','Light background','lbg'],['c','Light text','ltx'],['c','Dark background','dbg'],['c','Dark text','dtx'],['sel','via',['prefers-color-scheme','data-theme','both'],'Dark mode via']],
 html:s=>{const L=thTokens(s.lbg,s.ltx,s.brand,false),D=thTokens(s.dbg,s.dtx,s.brand,true),card=(t,n)=>`<div style="flex:1;min-width:0;background:${t.bg};color:${t.text};border:1px solid ${t.border};border-radius:14px;padding:12px"><b style="font-size:.85rem">${n}</b><div style="background:${t.surface};border:1px solid ${t.border};border-radius:10px;padding:8px;margin:8px 0;font-size:.8rem;color:${t.muted}">Surface with muted text</div><span style="display:inline-block;background:${t.brand};color:${t['on-brand']};padding:5px 12px;border-radius:8px;font-weight:700;font-size:.8rem">Button</span></div>`;return `<div style="display:flex;gap:10px;width:100%">${card(L,'Light')}${card(D,'Dark')}</div>`},
 pv:[['width','100%'],['height','auto'],['background','transparent']],out:s=>[],
 code:s=>{const L=thTokens(s.lbg,s.ltx,s.brand,false),D=thTokens(s.dbg,s.dtx,s.brand,true),c1=cr({fg:s.ltx,bg:s.lbg}).toFixed(2),c2=cr({fg:s.dtx,bg:s.dbg}).toFixed(2);
  return `:root {\n  color-scheme: light dark;\n${thBlock(L,'  ')}\n}\n`+(s.via!=='data-theme'?`\n@media (prefers-color-scheme: dark) {\n  :root {\n${thBlock(D,'    ')}\n  }\n}\n`:'')+(s.via!=='prefers-color-scheme'?`\n[data-theme="dark"] {\n${thBlock(D,'  ')}\n}\n`:'')+`\n/* text on background: ${c1}:1 light, ${c2}:1 dark */\nbody {\n  background: var(--color-bg);\n  color: var(--color-text);\n}`}},
boxm:{label:'box model',s:{w:200,h:100,pv:16,ph:20,bd:4,mv:20,mh:30,bs:'content-box'},
 f:[['sel','bs',['content-box','border-box'],'Box sizing'],['r','Width','w',40,260,1,'px'],['r','Height','h',20,160,1,'px'],['r','Padding up/down','pv',0,40,1,'px'],['r','Padding left/right','ph',0,40,1,'px'],['r','Border','bd',0,12,1,'px'],['r','Margin up/down','mv',0,40,1,'px'],['r','Margin left/right','mh',0,40,1,'px']],
 html:s=>{const bb=s.bs==='border-box',cw=bb?Math.max(0,s.w-2*s.ph-2*s.bd):s.w,ch=bb?Math.max(0,s.h-2*s.pv-2*s.bd):s.h,tw=cw+2*s.ph+2*s.bd+2*s.mh,k=Math.min(1,270/tw),lb=(t,x)=>`<span style="position:absolute;left:${x}px;top:1px;opacity:.75">${t}</span>`;
  return `<div style="zoom:${r3(k)};display:inline-block;font:600 11px system-ui,sans-serif;color:#1b2240"><div style="position:relative;background:#f9cc9d;padding:${s.mv}px ${s.mh}px">${lb('margin',6)}<div style="position:relative;background:#fddd9b;border:${s.bd}px solid #e0b25c">${lb('border',4)}<div style="position:relative;background:#c3d08b;padding:${s.pv}px ${s.ph}px">${lb('padding',4)}<div style="background:#8cb6c0;width:${cw}px;height:${ch}px;display:grid;place-items:center">${cw} x ${ch}</div></div></div></div></div>`},
 pv:[['width','100%'],['height','auto'],['background','transparent'],['display','grid'],['place-items','center'],['padding','8px']],out:s=>[],
 dec:s=>[['box-sizing',s.bs],['width',s.w+'px'],['height',s.h+'px'],['padding',`${s.pv}px ${s.ph}px`],['border',`${s.bd}px solid`],['margin',`${s.mv}px ${s.mh}px`]],
 code:s=>{const bb=s.bs==='border-box',tw=bb?s.w:s.w+2*s.ph+2*s.bd,th=bb?s.h:s.h+2*s.pv+2*s.bd;return `.box {\n  box-sizing: ${s.bs};\n  width: ${s.w}px;\n  height: ${s.h}px;\n  padding: ${s.pv}px ${s.ph}px;\n  border: ${s.bd}px solid;\n  margin: ${s.mv}px ${s.mh}px;\n}\n\n/* drawn size with padding and border: ${tw}px x ${th}px */\n/* space it takes with margin: ${tw+2*s.mh}px x ${th+2*s.mv}px */`+(bb?`\n/* content area: ${Math.max(0,s.w-2*s.ph-2*s.bd)}px x ${Math.max(0,s.h-2*s.pv-2*s.bd)}px */`:'')}},
anim:{label:'animation',s:{kf:'pulse',dur:1.2,del:0,ease:'ease-in-out',iter:'infinite',dir:'normal',fill:'none',si:2,steps:[{p:0,x:0,y:0,r:0,sc:100,o:100},{p:50,x:60,y:-40,r:0,sc:110,o:100},{p:100,x:0,y:0,r:0,sc:100,o:100}]},pv:[['background','linear-gradient(135deg,#4a5bdc,#8b9bff)'],['width','120px'],['height','120px'],['border-radius','24px']],
 f:s=>{const n=s.steps.length;if(s.si>n)s.si=n;return [['sel','kf',[...Object.keys(KF),'custom'],'Effect'],...(s.kf==='custom'?[['sel','si',[...Array(n).keys()].map(i=>i+1),'Step'],['r','Position','p',0,100,1,'%',stp],['r','Move X','x',-120,120,1,'px',stp],['r','Move Y','y',-120,120,1,'px',stp],['r','Rotate','r',-360,360,1,'deg',stp],['r','Scale','sc',20,200,1,'%',stp],['r','Opacity','o',0,100,1,'%',stp],
  ['btn','Add step',s=>{if(s.steps.length>=6)return;s.steps.sort((a,b)=>a.p-b.p);const i=s.si-1,a=s.steps[i],b=s.steps[i+1]||s.steps[i-1]||a;let np=Math.round((a.p+b.p)/2);if(np===a.p)np=Math.min(100,a.p+1);s.steps.push({...a,p:np});s.steps.sort((p,q)=>p.p-q.p);s.si=s.steps.findIndex(t=>t.p===np)+1}],
  ['btn','Remove step',s=>{if(s.steps.length>2){s.steps.splice(s.si-1,1);s.si=Math.max(1,s.si-1)}}]]:[]),['r','Duration','dur',.2,4,.1,'s'],['r','Delay','del',0,3,.1,'s'],['sel','ease',['linear','ease','ease-in-out','cubic-bezier(.34, 1.56, .64, 1)'],'Easing'],['sel','iter',['infinite','1','3'],'Repeat'],['sel','dir',['normal','alternate','reverse'],'Direction'],['sel','fill',['none','forwards','both'],'Fill mode']]},
 inject:s=>`@keyframes ${s.kf}{${kfOf(s).map(([k,v])=>`${k}{${v}}`).join('')}}`,
 out:s=>[['animation',anV(s)]],
 code:s=>`@keyframes ${s.kf} {\n${kfOf(s).map(([k,v])=>`  ${k} {\n${declLines(v)}\n  }`).join('\n')}\n}\n\n.element {\n  animation: ${anV(s)};\n}`}
};
function buildGen(c){const g=G[mode],s=g.s;
 (typeof g.f==='function'?g.f(s):g.f).forEach(f=>c.append(f[0]==='r'?slider(f[1],f[7]?f[7](s):s,f[2],f[3],f[4],f[5],f[6]):f[0]==='c'?colorRow(f[1],s,f[2]):
  f[0]==='txt'?h('label',{class:'inline'},h('span',{style:'color:var(--mute);font-size:.9rem;min-width:70px'},f[2]),h('input',{type:'text',class:'tin',value:s[f[1]],oninput:e=>{s[f[1]]=e.target.value;update()}})):
  f[0]==='area'?h('div',{},h('label',{class:'lbl',for:'ta_'+f[1]},f[2]),(()=>{const t=h('textarea',{class:'tin',id:'ta_'+f[1],rows:7,spellcheck:'false',oninput:e=>{s[f[1]]=e.target.value;update()}});t.value=s[f[1]];return t})()):
  f[0]==='chk'?h('label',{class:'inline'},h('input',{type:'checkbox',checked:s[f[2]]||null,onchange:e=>{s[f[2]]=e.target.checked;update()}}),f[1]):
  f[0]==='multi'?h('div',{class:'inline'},...(f[3]?[h('span',{style:'color:var(--mute);font-size:.9rem;min-width:70px'},f[3])]:[]),...f[2].map(o=>h('button',{class:'chip',type:'button','aria-pressed':s[f[1]].includes(o),onclick:()=>{const a=s[f[1]],i=a.indexOf(o);i<0?a.push(o):a.splice(i,1);build();update()}},o+(f[4]||'')))):
  f[0]==='btn'?(()=>{const b=h('button',{class:'chip',type:'button',onclick:()=>{f[2](s);build();update()}},f[1]);if(f[3])b.setAttribute('aria-pressed',!!f[3](s));return b})():
  h('div',{class:'inline'},...(f[3]?[h('span',{style:'color:var(--mute);font-size:.9rem;min-width:70px'},f[3])]:[]),...f[2].map(o=>h('button',{class:'chip',type:'button','aria-pressed':(f[4]?f[4](s):s)[f[1]]===o,onclick:()=>{(f[4]?f[4](s):s)[f[1]]=o;build();update()}},o)))))}
let OUT={css:'',dec:null},fmt='css',hR=0,SNAP={x:null,y:null,on:false};
const FMT=[['css','CSS'],['tailwind','Tailwind'],['scss','SCSS'],['vars','Variables'],['js','React']];
const camel=p=>p.replace(/^-webkit-/,'Webkit-').replace(/-(\w)/g,(_,c)=>c.toUpperCase());
function conv(d,f){const one=v=>v.replace(/\s+/g,' '),nm=p=>p.replace(/^-+/,'');
 if(f==='tailwind')return `<div class="${d.map(([p,v])=>`[${p}:${one(v).replace(/,\s+/g,',').replace(/"/g,"'").replace(/ /g,'_')}]`).join(' ')}"></div>\n/* Tailwind 3.1+ arbitrary properties */`;
 if(f==='scss')return d.map(([p,v])=>`$${nm(p)}: ${one(v)};`).join('\n')+`\n\n.element {\n${d.map(([p])=>`  ${p}: $${nm(p)};`).join('\n')}\n}`;
 if(f==='vars')return `:root {\n${d.map(([p,v])=>`  --${nm(p)}: ${one(v)};`).join('\n')}\n}\n\n.element {\n${d.map(([p])=>`  ${p}: var(--${nm(p)});`).join('\n')}\n}`;
 return `const style = {\n${d.map(([p,v])=>`  ${camel(p)}: '${one(v).replace(/'/g,"\\'")}',`).join('\n')}\n};`}
function showCode(){const d=OUT.dec&&OUT.dec.length?OUT.dec:null,bar=$('#fmts');if(!d)fmt='css';bar.hidden=!d;[...bar.children].forEach(b=>b.setAttribute('aria-pressed',b.dataset.f===fmt));
 $('#code').textContent=fmt==='css'||!d?OUT.css:conv(d,fmt);const c=$('#copy');if(!c.dataset.busy)c.textContent=fmt==='css'?'Copy CSS':'Copy code'}
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
function updateGen(sub,stage){const g=G[mode],s=g.s,o=g.out(s);
 sub.textContent=typeof g.txt==='function'?g.txt(s):(g.txt||'');const cx=typeof g.cls==='function'?g.cls(s):g.cls;sub.className='gbox'+(cx?' '+cx:'');
 if(g.html)sub.innerHTML=g.html(s);
 const nk=typeof g.kids==='function'?g.kids(s):(g.kids||0);for(let i=0;i<nk;i++){const k=document.createElement('i');k.textContent=g.kidTxt?g.kidTxt(i,s):i+1;if(g.kidCss)k.style.cssText=g.kidCss(s,i);sub.append(k)}
 stage.style.setProperty('--base',g.stage?g.stage(s):(g.base||'#d5dafb'));stage.style.setProperty('--glow',g.base?'rgba(255,255,255,.18)':'rgba(255,255,255,.7)');stage.classList.toggle('dark',!!g.base);
 let kf=document.getElementById('kf');if(!kf){kf=document.createElement('style');kf.id='kf';document.head.append(kf)}kf.textContent=g.inject?g.inject(s):'';
 const pv=(typeof g.pv==='function'?g.pv(s):g.pv)||[];(g.last?o.concat(pv):pv.concat(o)).forEach(([p,v])=>p&&sub.style.setProperty(p,v));
 OUT.css=g.code?g.code(s):o.map(([p,v])=>p?`${p}: ${v};`:`/* ${v} */`).join('\n');OUT.dec=g.dec?g.dec(s):(g.code?null:o.filter(x=>x[0]));
 $('#prop').textContent=g.label;showCode();syncHandles(g,s,sub,stage);placeOrb()}
const orb=$('#orb'),K=.35;let drag=false;
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

const HS={},DEF={},IMP={open:false,msg:''};
const SUP={glass:'backdrop-filter works in Chrome 76+, Safari 9+ (with the -webkit- prefix, included in the output) and Firefox 103+.',clamp:'clamp() works in Chrome 79+, Safari 13.1+ and Firefox 75+. The cqi unit needs Chrome 105+, Safari 16+ or Firefox 110+.',cq:'Container queries work in Chrome 105+, Safari 16+ and Firefox 110+.',aspect:'aspect-ratio works in Chrome 88+, Safari 15+ and Firefox 89+. For older browsers use the padding-top fallback in the comment.',convert:'oklch() works in Chrome 111+, Safari 15.4+ and Firefox 113+. color-mix() needs Chrome 111+, Safari 16.2+ or Firefox 113+.',gradient:'Linear and radial gradients work everywhere. conic-gradient works in Chrome 69+, Safari 12.1+ and Firefox 83+.',flex:'gap on flexbox works in Chrome 84+, Safari 14.1+ and Firefox 63+.',grid:'CSS Grid works in Chrome 57+, Safari 10.1+ and Firefox 52+.',areas:'CSS Grid works in Chrome 57+, Safari 10.1+ and Firefox 52+.',scroll:'scrollbar-color works in Chrome 121+ and Firefox 64+. Other browsers use the ::-webkit-scrollbar rules.',blend:'background-blend-mode works in Chrome 35+, Safari 8+ and Firefox 30+.',clip:'clip-path with polygon() works in all current browsers.'};
function supNote(){const c=$('#controls'),o=c.querySelector('.sup');if(o)o.remove();if(SUP[mode])c.append(h('p',{class:'sup'},'Browser support: '+SUP[mode]+' Versions are approximate, so check caniuse.com before relying on them.'))}
function restore(m,st){if(m==='box'||m==='text')Object.assign(S[m],st);else if(m==='filter')Object.assign(S.filter,st);else Object.assign(G[m].s,st)}
function histBtns(){const H=HS[mode],u=$('#undo'),r=$('#redo'),z=$('#reset');if(u)u.disabled=!(H&&H.u.length);if(r)r.disabled=!(H&&H.r.length);if(z)z.disabled=!(DEF[mode]&&H&&H.cur!==DEF[mode])}
function hist(){const m=mode,s=JSON.stringify(stateOf(m));let H=HS[m];if(!H){HS[m]={cur:s,u:[],r:[],t:0};histBtns();return}
 if(s!==H.cur){const now=Date.now();if(now-H.t>500){H.u.push(H.cur);if(H.u.length>60)H.u.shift()}H.t=now;H.cur=s;H.r=[]}histBtns()}
function undo(){const H=HS[mode];if(!H||!H.u.length)return;H.r.push(H.cur);H.cur=H.u.pop();H.t=0;restore(mode,JSON.parse(H.cur));build();update()}
function redo(){const H=HS[mode];if(!H||!H.r.length)return;H.u.push(H.cur);H.cur=H.r.pop();H.t=0;restore(mode,JSON.parse(H.cur));build();update()}
function resetTool(){if(!DEF[mode])return;if(HS[mode])HS[mode].t=0;restore(mode,JSON.parse(DEF[mode]));build();update()}
function importCss(text){const t=text.trim();if(!t){IMP.msg='Paste some CSS first.';histBar();return}
 if(mode==='fmt'&&G.fmt){G.fmt.s.css=text;IMP.open=false;IMP.msg='';build();update();return}
 const p=declsOf(t);for(const k of [mode,...IMPORT_ORDER.filter(x=>x!==mode)]){if(!MAP[k]||!(G[k]||k==='box'||k==='text'||k==='filter'))continue;const st=MAP[k](p,'');
  if(st){if(!HS[k])HS[k]={cur:JSON.stringify(stateOf(k)),u:[],r:[],t:0};HS[k].t=0;handoff(k,encodeURIComponent(JSON.stringify(st)));IMP.open=false;IMP.msg='';const lab=TOOLS.flatMap(g=>g[1]).find(x=>x[0]===k)[1];if(k!==mode){setMode(k);$('#live').textContent='Opened in '+lab}else{build();update()}return}}
 IMP.msg='Could not read that. Try box-shadow, a gradient, filter, border-radius, clip-path, transform, aspect-ratio or clamp().';histBar()}
function histBar(){const c=$('#controls');['.hbar','.imp'].forEach(q=>{const o=c.querySelector(q);if(o)o.remove()});
 const b=(id,t,fn,title)=>h('button',{class:'chip',type:'button',id,title,onclick:fn},t);
 const bar=h('div',{class:'hbar'},b('undo','Undo',undo,'Undo (Ctrl+Z)'),b('redo','Redo',redo,'Redo (Ctrl+Shift+Z)'),b('reset','Reset',resetTool,'Back to the default settings'),h('button',{class:'chip',type:'button','aria-pressed':IMP.open,onclick:()=>{IMP.open=!IMP.open;histBar()}},'Import CSS'));
 c.prepend(bar);
 if(IMP.open){const ta=h('textarea',{class:'tin',rows:4,spellcheck:'false',placeholder:'Paste CSS here, for example:\nbox-shadow: 0 8px 24px rgba(0,0,0,.2);'});
  bar.after(h('div',{class:'imp'},ta,h('div',{class:'inline'},h('button',{class:'btn small',type:'button',onclick:()=>importCss(ta.value)},'Apply'),h('span',{class:'impmsg'},IMP.msg))))}
 histBtns()}
document.addEventListener('keydown',e=>{if(!(e.ctrlKey||e.metaKey)||e.altKey)return;if(/INPUT|TEXTAREA|SELECT/.test((document.activeElement||{}).tagName||''))return;const k=e.key.toLowerCase();if(k==='z'){e.preventDefault();e.shiftKey?redo():undo()}else if(k==='y'){e.preventDefault();redo()}});
const stateOf=m=>m==='box'||m==='text'?S[m]:m==='filter'?S.filter:G[m].s;
const LK='umbra-looks',lkLoad=()=>{try{return JSON.parse(localStorage.getItem(LK)||'[]')}catch(e){return[]}},lkSave=a=>{try{localStorage.setItem(LK,JSON.stringify(a.slice(0,40)))}catch(e){}};
function savedPanel(){const c=$('#controls'),mine=lkLoad().filter(l=>l.tool===mode),old=c.querySelector('.sl');if(old)old.remove();
 const g=h('div',{class:'group sl'},h('b',{class:'lbl'},`Saved looks (${mine.length})`));
 if(!mine.length)g.append(h('p',{class:'hint2'},'Press Save look under the code to keep this setting in your browser.'));
 mine.forEach(l=>g.append(h('div',{class:'svrow'},h('button',{class:'chip',type:'button',title:l.css.split('\n')[0],onclick:()=>{handoff(l.tool,encodeURIComponent(JSON.stringify(l.state)));setMode(l.tool)}},l.name),h('button',{class:'chip x',type:'button','aria-label':'Delete '+l.name,onclick:()=>{lkSave(lkLoad().filter(z=>z.id!==l.id));savedPanel()}},'\u00d7'))));
 c.append(g)}
$('#save').addEventListener('click',()=>{const all=lkLoad(),n=all.filter(l=>l.tool===mode).length+1,lab=(TOOLS.flatMap(g=>g[1]).find(t=>t[0]===mode)||[0,mode])[1],b=$('#save');
 all.unshift({id:Date.now().toString(36),tool:mode,name:lab+' '+n,state:JSON.parse(JSON.stringify(stateOf(mode))),css:OUT.css,ts:Date.now()});lkSave(all);savedPanel();b.textContent='Saved';setTimeout(()=>{b.textContent='Save look'},1400)});
FMT.forEach(([k,l])=>{const b=h('button',{class:'chip',type:'button',onclick:()=>{fmt=k;showCode()}},l);b.dataset.f=k;$('#fmts').append(b)});
$('#share').addEventListener('click',async()=>{const st=stateOf(mode),u=location.href.split('#')[0]+'#'+mode+':'+encodeURIComponent(JSON.stringify(st)),b=$('#share');
 try{await navigator.clipboard.writeText(u)}catch(e){const ta=document.createElement('textarea');ta.value=u;document.body.append(ta);ta.select();try{document.execCommand('copy')}catch(_){}ta.remove()}
 b.textContent='Link copied';$('#live').textContent='Link copied to clipboard';setTimeout(()=>{b.textContent='Share link'},1400)});
addEventListener('resize',()=>{if(G[mode]&&G[mode].handles)update()});
const ids=TOOLS.flatMap(g=>g[1].map(t=>t[0]));
ids.forEach(i=>{try{DEF[i]=JSON.stringify(stateOf(i))}catch(e){}});
function handoff(id,pl){try{const st=JSON.parse(decodeURIComponent(pl));
 if(id==='box'||id==='text'){const t=S[id];t.layers=st.layers.map(l=>mkLayer(l));t.sel=0;if(st.bg)t.bg=st.bg;if(st.el)t.el=st.el}
 else if(id==='filter')Object.assign(S.filter,FD,st,{ds:Object.assign({on:false,x:6,y:8,b:10,c:'#000000',a:.45},st.ds||{})});
 else if(G[id]){Object.assign(G[id].s,st);if(id==='gradient'){if(st.n===undefined&&st.use3!==undefined)G.gradient.s.n=st.use3?3:2;if(st.pos===undefined)G.gradient.s.pos=null}}}catch(e){}}
const parseHash=()=>{const h=location.hash.slice(1),i=h.indexOf(':'),id=i<0?h:h.slice(0,i);return ids.includes(id)?[id,i<0?null:h.slice(i+1)]:null};
const r0=parseHash();if(r0&&r0[1])handoff(r0[0],r0[1]);setMode(r0?r0[0]:'box');
addEventListener('hashchange',()=>{const r=parseHash();if(!r)return;if(r[1]){handoff(r[0],r[1]);setMode(r[0])}else if(r[0]!==mode)setMode(r[0])});
