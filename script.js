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
function build(){build0();savedPanel()}
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
function update(){
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
const kfOf=s=>s.kf==='custom'?[['from','transform: none; opacity: 1'],['to',`transform: translate(${s.cx}px, ${s.cy}px) rotate(${s.cr}deg) scale(${r3(s.cs/100)}); opacity: ${r3(s.co/100)}`]]:KF[s.kf];
const anV=s=>`${s.kf} ${r3(s.dur)}s ${s.ease} ${r3(s.del)}s ${s.iter} ${s.dir} ${s.fill}`;
const declLines=v=>v.split(';').map(x=>x.trim()).filter(Boolean).map(x=>`    ${x};`).join('\n');
const PXS=[4,8,12,14,16,18,20,24,28,32,40,48,56,64,80,96];
const gstops=s=>{const n=s.n||(s.use3?3:2),u=s.type==='conic'?'deg':'px';return [1,2,3,4,5].slice(0,n).map((_,i)=>{const c=s['c'+(i+1)],p=s.rep?`${r3(i*s.rsz/(n-1))}${u}`:`${n===3&&i===1?s.p2:Math.round(i*100/(n-1))}%`;return `${c} ${p}`}).join(', ')};
const G={
gradient:{label:'background',s:{type:'linear',angle:135,p2:50,n:3,c1:'#ff9a3c',c2:'#e4457b',c3:'#3a4fd8',c4:'#ffd34d',c5:'#18c4a7',rep:false,rsz:40},
 f:s=>{const n=s.n||3;return [['sel','type',['linear','radial','conic']],['r','Angle','angle',0,360,1,'deg'],['r','Stops','n',2,5,1,''],...(n===3?[['r','Mid stop','p2',5,95,1,'%']]:[]),...[1,2,3,4,5].slice(0,n).map(i=>['c','Color '+i,'c'+i]),['chk','Repeating','rep'],...(s.rep?[['r','Repeat every','rsz',10,300,1,s.type==='conic'?'deg':'px']]:[]),['btn','Randomize colors',s=>{for(let i=1;i<=5;i++)s['c'+i]=rnd()}]]},
 out:s=>{const st=gstops(s),pre=s.rep?'repeating-':'';return [['background',s.type==='linear'?`${pre}linear-gradient(${s.angle}deg, ${st})`:s.type==='radial'?`${pre}radial-gradient(circle at center, ${st})`:`${pre}conic-gradient(from ${s.angle}deg, ${st})`]]}},
radius:{label:'border-radius',s:{a:60,b:40,c:30,d:70,e:60,f:30,g:70,h:40},pv:GRAD,
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
clip:{label:'clip-path',s:{mode:'Preset shapes',shape:'hexagon',pts:[[50,0],[100,100],[0,100]],sel:0,snap:true,guides:true,grid:false},pv:[['background','linear-gradient(135deg,#4a5bdc,#e4457b)'],['width','190px'],['height','190px'],['border-radius','0']],
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
 f:[['r','X1','x1',0,1,.01,''],['r','Y1','y1',-1,2,.01,''],['r','X2','x2',0,1,.01,''],['r','Y2','y2',-1,2,.01,''],['btn','Ease',s=>Object.assign(s,{x1:.25,y1:.1,x2:.25,y2:1}),s=>eqb(s,0.25,0.1,0.25,1)],['btn','Ease in',s=>Object.assign(s,{x1:.42,y1:0,x2:1,y2:1}),s=>eqb(s,0.42,0,1,1)],['btn','Ease out',s=>Object.assign(s,{x1:0,y1:0,x2:.58,y2:1}),s=>eqb(s,0,0,0.58,1)],['btn','Back out',s=>Object.assign(s,{x1:.34,y1:1.56,x2:.64,y2:1}),s=>eqb(s,0.34,1.56,0.64,1)],['btn','Snappy',s=>Object.assign(s,{x1:.2,y1:.9,x2:.1,y2:1}),s=>eqb(s,0.2,0.9,0.1,1)]],
 inject:()=>'@keyframes ez{from{transform:translateX(-110px)}to{transform:translateX(110px)}}',
 pv:s=>[['width','34px'],['height','34px'],['border-radius','50%'],['background','linear-gradient(135deg,#4a5bdc,#8b9bff)'],['animation',`ez 1.6s ${bz(s)} infinite alternate`]],
 out:s=>[['transition-timing-function',bz(s)]]},
neu:{label:'neumorphism',stage:s=>s.c,s:{c:'#e0e5ec',d:10,b:22,r:24,inset:false},pv:[['width','180px'],['height','180px']],
 f:[['c','Base color','c'],['r','Distance','d',2,30,1,'px'],['r','Blur','b',0,60,1,'px'],['r','Radius','r',0,80,1,'px'],['chk','Pressed in (inset)','inset']],
 out:s=>{const dk=mix(s.c,[0,0,0],.14),lt=mix(s.c,[255,255,255],.75),i=s.inset?'inset ':'';return [['background',s.c],['border-radius',s.r+'px'],['box-shadow',`${i}${s.d}px ${s.d}px ${s.b}px ${dk}, ${i}-${s.d}px -${s.d}px ${s.b}px ${lt}`]]}},
border:{label:'border',s:{w:3,st:'solid',c:'#4a5bdc',r:16},f:[['r','Width','w',0,16,1,'px'],['sel','st',['solid','dashed','dotted','double'],'Style'],['c','Color','c'],['r','Radius','r',0,100,1,'px']],
 out:s=>[['border',`${s.w}px ${s.st} ${s.c}`],['border-radius',s.r+'px']]},
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
anim:{label:'animation',s:{kf:'pulse',dur:1.2,del:0,ease:'ease-in-out',iter:'infinite',dir:'normal',fill:'none',cx:60,cy:0,cr:0,cs:100,co:100},pv:[['background','linear-gradient(135deg,#4a5bdc,#8b9bff)'],['width','120px'],['height','120px'],['border-radius','24px']],
 f:s=>[['sel','kf',[...Object.keys(KF),'custom'],'Effect'],...(s.kf==='custom'?[['r','Move X','cx',-120,120,1,'px'],['r','Move Y','cy',-120,120,1,'px'],['r','Rotate','cr',-360,360,1,'deg'],['r','Scale','cs',20,200,1,'%'],['r','Opacity','co',0,100,1,'%']]:[]),['r','Duration','dur',.2,4,.1,'s'],['r','Delay','del',0,3,.1,'s'],['sel','ease',['linear','ease','ease-in-out','cubic-bezier(.34, 1.56, .64, 1)'],'Easing'],['sel','iter',['infinite','1','3'],'Repeat'],['sel','dir',['normal','alternate','reverse'],'Direction'],['sel','fill',['none','forwards','both'],'Fill mode']],
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
 while(hs.length<pts.length){const b=h('button',{class:'hnd',type:'button'});b.dataset.i=hs.length;b.setAttribute('aria-label','Drag point '+(hs.length+1));
  const mv=(i,x,y,ns)=>{const t=G[mode].s;x=cl2(x);y=cl2(y);SNAP={x:null,y:null,on:!ns};
   if(!ns&&t.snap!==false){const sn=(v,ax)=>{let best=null,bd=2.5;[0,50,100,...(t.grid?[25,75]:[]),...t.pts.filter((_,k)=>k!==i).map(p=>p[ax])].forEach(q=>{const d=Math.abs(v-q);if(d<bd){bd=d;best=q}});return best},bx=sn(x,0),by=sn(y,1);if(bx!=null){x=bx;SNAP.x=bx}if(by!=null){y=by;SNAP.y=by}}
   t.pts[i]=[Math.round(x),Math.round(y)];if(!hR)hR=requestAnimationFrame(()=>{hR=0;build();update()})};
  b.addEventListener('pointerdown',e=>{b.setPointerCapture(e.pointerId);b.dataset.d=1;G[mode].s.sel=+b.dataset.i;build();update()});
  b.addEventListener('pointermove',e=>{if(!b.dataset.d)return;const r=$('#subject').getBoundingClientRect();mv(+b.dataset.i,(e.clientX-r.left)/r.width*100,(e.clientY-r.top)/r.height*100)});
  b.addEventListener('pointerup',()=>{delete b.dataset.d;SNAP={x:null,y:null,on:false};update()});
  b.addEventListener('keydown',e=>{const d={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key];if(!d)return;e.preventDefault();const i=+b.dataset.i,p=G[mode].s.pts[i],n=e.shiftKey?5:1;mv(i,p[0]+d[0]*n,p[1]+d[1]*n,1)});
  stage.append(b);hs.push(b)}
 const sr=sub.getBoundingClientRect(),st=stage.getBoundingClientRect();hs.forEach((b,i)=>{b.style.left=(sr.left-st.left+pts[i][0]/100*sr.width)+'px';b.style.top=(sr.top-st.top+pts[i][1]/100*sr.height)+'px';b.classList.toggle('on',i===s.sel)});overlay(pts,s,sub,stage)}
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
function handoff(id,pl){try{const st=JSON.parse(decodeURIComponent(pl));
 if(id==='box'||id==='text'){const t=S[id];t.layers=st.layers.map(l=>mkLayer(l));t.sel=0;if(st.bg)t.bg=st.bg;if(st.el)t.el=st.el}
 else if(id==='filter')Object.assign(S.filter,FD,st,{ds:Object.assign({on:false,x:6,y:8,b:10,c:'#000000',a:.45},st.ds||{})});
 else if(G[id]){Object.assign(G[id].s,st);if(id==='gradient'&&st.n===undefined&&st.use3!==undefined)G.gradient.s.n=st.use3?3:2}}catch(e){}}
const parseHash=()=>{const h=location.hash.slice(1),i=h.indexOf(':'),id=i<0?h:h.slice(0,i);return ids.includes(id)?[id,i<0?null:h.slice(i+1)]:null};
const r0=parseHash();if(r0&&r0[1])handoff(r0[0],r0[1]);setMode(r0?r0[0]:'box');
addEventListener('hashchange',()=>{const r=parseHash();if(!r)return;if(r[1]){handoff(r[0],r[1]);setMode(r[0])}else if(r[0]!==mode)setMode(r[0])});
