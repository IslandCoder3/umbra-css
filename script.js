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
function h(t,p,...k){const e=document.createElement(t);for(const a in p||{}){a==='class'?e.className=p[a]:a.startsWith('on')?e.addEventListener(a.slice(2),p[a]):e.setAttribute(a,p[a])}k.flat().forEach(c=>e.append(c));return e}
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
function build(){
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
 $('#code').textContent=`${prop}: ${val};`;placeOrb();
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
 b.textContent='Copied';$('#live').textContent='Copied to clipboard';
 setTimeout(()=>{b.textContent='Copy CSS'},1400);
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
const CP={triangle:'polygon(50% 0%, 0% 100%, 100% 100%)',diamond:'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',hexagon:'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',pentagon:'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',star:'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',arrow:'polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)',circle:'circle(50% at 50% 50%)',ellipse:'ellipse(50% 38% at 50% 50%)'};
const rgb=c=>{const n=parseInt(c.slice(1),16);return [n>>16&255,n>>8&255,n&255]};
const hex=a=>'#'+a.map(v=>Math.round(v).toString(16).padStart(2,'0')).join('');
const mix=(c,t,p)=>hex(rgb(c).map((v,i)=>v+(t[i]-v)*p));
const hsl=c=>{const [r,g,b]=rgb(c).map(v=>v/255),mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2,d=mx-mn;let hh=0,s=0;if(d){s=d/(1-Math.abs(2*l-1));hh=(mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4)*60;if(hh<0)hh+=360}return `hsl(${Math.round(hh)} ${Math.round(s*100)}% ${Math.round(l*100)}%)`};
const LV=[50,100,200,300,400,500,600,700,800,900],PL=[[1,.9],[1,.78],[1,.58],[1,.38],[1,.18],[0,0],[0,.16],[0,.32],[0,.5],[0,.68]];
const shade=(c,i)=>PL[i][1]?mix(c,PL[i][0]?[255,255,255]:[0,0,0],PL[i][1]):c;
const bz=s=>`cubic-bezier(${r3(s.x1)}, ${r3(s.y1)}, ${r3(s.x2)}, ${r3(s.y2)})`;
const G={
gradient:{label:'background',s:{type:'linear',angle:135,p2:50,c1:'#ff9a3c',c2:'#e4457b',c3:'#3a4fd8',use3:true},
 f:[['sel','type',['linear','radial','conic']],['r','Angle','angle',0,360,1,'deg'],['r','Mid stop','p2',5,95,1,'%'],['c','Color 1','c1'],['c','Color 2','c2'],['c','Color 3','c3'],['chk','Use third color','use3'],['btn','Randomize colors',s=>{s.c1=rnd();s.c2=rnd();s.c3=rnd()}]],
 out:s=>{const st=s.use3?`${s.c1} 0%, ${s.c2} ${s.p2}%, ${s.c3} 100%`:`${s.c1}, ${s.c2}`;
  return [['background',s.type==='linear'?`linear-gradient(${s.angle}deg, ${st})`:s.type==='radial'?`radial-gradient(circle at center, ${st})`:`conic-gradient(from ${s.angle}deg, ${st})`]]}},
radius:{label:'border-radius',s:{a:60,b:40,c:30,d:70,e:60,f:30,g:70,h:40},pv:GRAD,
 f:[['r','Top-left X','a',0,100,1,'%'],['r','Top-right X','b',0,100,1,'%'],['r','Bottom-right X','c',0,100,1,'%'],['r','Bottom-left X','d',0,100,1,'%'],['r','Top-left Y','e',0,100,1,'%'],['r','Top-right Y','f',0,100,1,'%'],['r','Bottom-right Y','g',0,100,1,'%'],['r','Bottom-left Y','h',0,100,1,'%'],['btn','Randomize blob',s=>{'abcdefgh'.split('').forEach(k=>s[k]=rn(30,70))}]],
 out:s=>[['border-radius',`${s.a}% ${s.b}% ${s.c}% ${s.d}% / ${s.e}% ${s.f}% ${s.g}% ${s.h}%`]]},
glass:{label:'glassmorphism',base:'radial-gradient(circle at 42% 40%,#ffd34d 0 70px,transparent 71px),radial-gradient(circle at 58% 62%,#ff4d8d 0 90px,transparent 91px),linear-gradient(135deg,#6a5cff,#18c4a7)',s:{blur:14,alpha:.18,sat:140,border:.35,radius:20},
 f:[['r','Blur','blur',0,40,1,'px'],['r','Opacity','alpha',0,.8,.01,''],['r','Saturate','sat',100,250,5,'%'],['r','Border','border',0,1,.01,''],['r','Radius','radius',0,60,1,'px']],
 out:s=>{const b=`blur(${s.blur}px) saturate(${s.sat}%)`;return [['background',`rgba(255, 255, 255, ${s.alpha})`],['backdrop-filter',b],['-webkit-backdrop-filter',b],['border',`1px solid rgba(255, 255, 255, ${s.border})`],['border-radius',s.radius+'px']]}},
transform:{label:'transform',s:{rot:0,sc:100,skx:0,sky:0,tx:0,ty:0},pv:GRAD,
 f:[['r','Rotate','rot',-180,180,1,'deg'],['r','Scale','sc',20,200,1,'%'],['r','Skew X','skx',-60,60,1,'deg'],['r','Skew Y','sky',-60,60,1,'deg'],['r','Move X','tx',-150,150,1,'px'],['r','Move Y','ty',-150,150,1,'px']],
 out:s=>{const p=[];if(s.tx||s.ty)p.push(`translate(${s.tx}px, ${s.ty}px)`);if(s.rot)p.push(`rotate(${s.rot}deg)`);if(s.sc!==100)p.push(`scale(${s.sc/100})`);if(s.skx||s.sky)p.push(`skew(${s.skx}deg, ${s.sky}deg)`);return [['transform',p.length?p.join(' '):'none']]}}
,
flex:{label:'flexbox',cls:'kids v',kids:4,s:{dir:'row',jc:'flex-start',ai:'stretch',wrap:'nowrap',gap:10},pv:[['width','320px'],['height','220px']],
 f:[['sel','dir',['row','column','row-reverse','column-reverse'],'Direction'],['sel','jc',['flex-start','center','flex-end','space-between','space-around','space-evenly'],'Justify'],['sel','ai',['stretch','flex-start','center','flex-end','baseline'],'Align'],['sel','wrap',['nowrap','wrap'],'Wrap'],['r','Gap','gap',0,40,1,'px']],
 out:s=>[['display','flex'],['flex-direction',s.dir],['justify-content',s.jc],['align-items',s.ai],['flex-wrap',s.wrap],['gap',s.gap+'px']]},
grid:{label:'css grid',cls:'kids v',kids:s=>Math.min(30,s.cols*s.rows),s:{cols:3,rows:2,gap:10,tr:'1fr'},pv:[['width','320px'],['height','220px']],
 f:[['r','Columns','cols',1,6,1,''],['r','Rows','rows',1,5,1,''],['r','Gap','gap',0,40,1,'px'],['sel','tr',['1fr','auto','minmax(0, 1fr)'],'Track size']],
 out:s=>[['display','grid'],['grid-template-columns',`repeat(${s.cols}, ${s.tr})`],['grid-template-rows',`repeat(${s.rows}, ${s.tr})`],['gap',s.gap+'px']]},
clamp:{label:'font-size',last:1,txt:'Fluid type',s:{min:16,max:48,minVw:360,maxVw:1200,vw:800},
 f:[['r','Min size','min',8,64,1,'px'],['r','Max size','max',16,160,1,'px'],['r','Min viewport','minVw',280,800,10,'px'],['r','Max viewport','maxVw',800,2000,10,'px'],['r','Preview at','vw',280,2000,10,'px']],
 pv:s=>[['background','transparent'],['width','100%'],['height','auto'],['font-weight','800'],['color','#1b2240'],['font-family','"Bricolage Grotesque",system-ui,sans-serif'],['line-height','1.1'],['text-align','center'],['font-size',fl(s).px.toFixed(1)+'px']],
 out:s=>{const f=fl(s);return [['font-size',`clamp(${r3(s.min/16)}rem, ${r3(f.ic/16)}rem + ${r3(f.sl*100)}vw, ${r3(s.max/16)}rem)`],['',`${f.px.toFixed(1)}px at a ${s.vw}px viewport`]]}},
contrast:{label:'colors',s:{fg:'#1b2240',bg:'#ffd34d'},txt:s=>`${cr(s).toFixed(2)}:1  ${cr(s)>=4.5?'AA pass':'AA fail'}`,
 f:[['c','Text color','fg'],['c','Background','bg'],['btn','Swap colors',s=>{[s.fg,s.bg]=[s.bg,s.fg]}]],
 pv:s=>[['color',s.fg],['background',s.bg],['display','grid'],['place-items','center'],['font','800 1.6rem "Bricolage Grotesque",system-ui,sans-serif']],
 out:s=>{const r=cr(s),y=v=>v?'pass':'fail';return [['color',s.fg],['background',s.bg],['',`contrast ${r.toFixed(2)}:1 | AA text ${y(r>=4.5)} | AA large ${y(r>=3)} | AAA text ${y(r>=7)}`]]}},
clip:{label:'clip-path',s:{shape:'hexagon'},pv:[['background','linear-gradient(135deg,#4a5bdc,#e4457b)'],['width','190px'],['height','190px'],['border-radius','0']],
 f:[['sel','shape',Object.keys(CP),'Shape']],out:s=>[['clip-path',CP[s.shape]]]},
palette:{label:'palette',cls:'kids',kids:10,s:{c:'#4a5bdc'},pv:[['width','340px'],['height','auto'],['display','grid'],['grid-template-columns','repeat(5, 1fr)'],['gap','6px']],
 f:[['c','Base color (500)','c']],kidTxt:i=>LV[i],kidCss:(s,i)=>`background:${shade(s.c,i)};height:60px;color:${i<5?'#1b2240':'#fff'};font-size:.8rem`,out:s=>[],
 code:s=>`:root {\n${LV.map((l,i)=>`  --brand-${l}: ${shade(s.c,i)};`).join('\n')}\n}`},
convert:{label:'color',s:{c:'#4a5bdc'},txt:s=>s.c,f:[['c','Pick a color','c']],
 pv:s=>[['background',s.c],['color',lum(s.c)>.4?'#1b2240':'#fff'],['display','grid'],['place-items','center'],['font','800 1.4rem "JetBrains Mono",ui-monospace,monospace']],out:s=>[['color',s.c]],
 code:s=>`:root {\n  --color-hex: ${s.c};\n  --color-rgb: rgb(${rgb(s.c).join(' ')});\n  --color-hsl: ${hsl(s.c)};\n}`},
type:{label:'typography',s:{ff:'sans',size:22,weight:600,ls:0,lh:1.4,tt:'none'},txt:'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.',
 pv:[['width','100%'],['height','auto'],['background','transparent'],['color','#1b2240'],['padding','16px'],['text-align','left']],
 f:[['sel','ff',['sans','serif','mono'],'Family'],['r','Size','size',10,72,1,'px'],['r','Weight','weight',100,900,100,''],['r','Spacing','ls',-.1,.3,.01,'em'],['r','Line height','lh',1,2.2,.05,''],['sel','tt',['none','uppercase','capitalize'],'Case']],
 out:s=>[['font-family',FF[s.ff]],['font-size',s.size+'px'],['font-weight',s.weight],['letter-spacing',r3(s.ls)+'em'],['line-height',r3(s.lh)],['text-transform',s.tt]]},
units:{label:'font-size',s:{px:24,root:16},txt:s=>`${s.px}px = ${r3(s.px/s.root)}rem`,f:[['r','Pixels','px',1,200,1,'px'],['r','Root size','root',10,24,1,'px']],
 pv:[['background','transparent'],['width','100%'],['height','auto'],['font','800 1.8rem "Bricolage Grotesque",system-ui,sans-serif'],['color','#1b2240'],['text-align','center']],
 out:s=>[['font-size',`${r3(s.px/s.root)}rem`],['',`${s.px}px at a ${s.root}px root size`]]},
ease:{label:'easing',s:{x1:.25,y1:.1,x2:.25,y2:1},
 f:[['r','X1','x1',0,1,.01,''],['r','Y1','y1',-1,2,.01,''],['r','X2','x2',0,1,.01,''],['r','Y2','y2',-1,2,.01,''],['btn','Ease',s=>Object.assign(s,{x1:.25,y1:.1,x2:.25,y2:1})],['btn','Ease in',s=>Object.assign(s,{x1:.42,y1:0,x2:1,y2:1})],['btn','Ease out',s=>Object.assign(s,{x1:0,y1:0,x2:.58,y2:1})],['btn','Back out',s=>Object.assign(s,{x1:.34,y1:1.56,x2:.64,y2:1})],['btn','Snappy',s=>Object.assign(s,{x1:.2,y1:.9,x2:.1,y2:1})]],
 inject:()=>'@keyframes ez{from{transform:translateX(-110px)}to{transform:translateX(110px)}}',
 pv:s=>[['width','34px'],['height','34px'],['border-radius','50%'],['background','linear-gradient(135deg,#4a5bdc,#8b9bff)'],['animation',`ez 1.6s ${bz(s)} infinite alternate`]],
 out:s=>[['transition-timing-function',bz(s)]]},
anim:{label:'animation',s:{kf:'pulse',dur:1.2,ease:'ease-in-out',iter:'infinite'},pv:[['background','linear-gradient(135deg,#4a5bdc,#8b9bff)'],['width','120px'],['height','120px'],['border-radius','24px']],
 f:[['sel','kf',Object.keys(KF),'Effect'],['r','Duration','dur',.2,4,.1,'s'],['sel','ease',['linear','ease','ease-in-out','cubic-bezier(.34, 1.56, .64, 1)'],'Easing'],['sel','iter',['infinite','1','3'],'Repeat']],
 inject:s=>`@keyframes ${s.kf}{${KF[s.kf].map(([k,v])=>`${k}{${v}}`).join('')}}`,
 out:s=>[['animation',`${s.kf} ${r3(s.dur)}s ${s.ease} ${s.iter}`]],
 code:s=>`@keyframes ${s.kf} {\n${KF[s.kf].map(([k,v])=>`  ${k} {\n    ${v};\n  }`).join('\n')}\n}\n\n.element {\n  animation: ${s.kf} ${r3(s.dur)}s ${s.ease} ${s.iter};\n}`}
};
function buildGen(c){const g=G[mode],s=g.s;
 g.f.forEach(f=>c.append(f[0]==='r'?slider(f[1],s,f[2],f[3],f[4],f[5],f[6]):f[0]==='c'?colorRow(f[1],s,f[2]):
  f[0]==='chk'?h('label',{class:'inline'},h('input',{type:'checkbox',checked:s[f[2]]||null,onchange:e=>{s[f[2]]=e.target.checked;update()}}),f[1]):
  f[0]==='btn'?h('button',{class:'chip',type:'button',onclick:()=>{f[2](s);build();update()}},f[1]):
  h('div',{class:'inline'},...(f[3]?[h('span',{style:'color:var(--mute);font-size:.9rem;min-width:70px'},f[3])]:[]),...f[2].map(o=>h('button',{class:'chip',type:'button','aria-pressed':s[f[1]]===o,onclick:()=>{s[f[1]]=o;build();update()}},o)))))}
function updateGen(sub,stage){const g=G[mode],s=g.s,o=g.out(s);
 sub.textContent=typeof g.txt==='function'?g.txt(s):(g.txt||'');sub.className='gbox'+(g.cls?' '+g.cls:'');
 const nk=typeof g.kids==='function'?g.kids(s):(g.kids||0);for(let i=0;i<nk;i++){const k=document.createElement('i');k.textContent=g.kidTxt?g.kidTxt(i):i+1;if(g.kidCss)k.style.cssText=g.kidCss(s,i);sub.append(k)}
 stage.style.setProperty('--base',g.base||'#d5dafb');stage.style.setProperty('--glow',g.base?'rgba(255,255,255,.18)':'rgba(255,255,255,.7)');stage.classList.toggle('dark',!!g.base);
 let kf=document.getElementById('kf');if(!kf){kf=document.createElement('style');kf.id='kf';document.head.append(kf)}kf.textContent=g.inject?g.inject(s):'';
 const pv=(typeof g.pv==='function'?g.pv(s):g.pv)||[];(g.last?o.concat(pv):pv.concat(o)).forEach(([p,v])=>p&&sub.style.setProperty(p,v));
 $('#prop').textContent=g.label;$('#code').textContent=g.code?g.code(s):o.map(([p,v])=>p?`${p}: ${v};`:`/* ${v} */`).join('\n');placeOrb()}
const orb=$('#orb'),K=.35;let drag=false;
const tgt=()=>mode==='filter'?(S.filter.ds.on?S.filter.ds:null):(mode==='box'||mode==='text')?S[mode].layers[S[mode].sel]:null;
function placeOrb(){const st=$('#stage'),t=tgt();orb.hidden=!t;$('#hint').hidden=!t;
 if(!t){st.style.setProperty('--lx','50%');st.style.setProperty('--ly','22%');return}
 const w=st.clientWidth,hh=st.clientHeight,px=Math.min(w-24,Math.max(24,w/2-t.x/K)),py=Math.min(hh-24,Math.max(24,hh/2-t.y/K));
 orb.style.left=px+'px';orb.style.top=py+'px';st.style.setProperty('--lx',px+'px');st.style.setProperty('--ly',py+'px')}
function aim(px,py){const t=tgt();if(!t)return;const st=$('#stage'),lim=mode==='filter'?40:60,c=v=>Math.round(Math.max(-lim,Math.min(lim,v)));
 t.x=c((st.clientWidth/2-px)*K);t.y=c((st.clientHeight/2-py)*K);build();update()}
orb.addEventListener('pointerdown',e=>{drag=true;orb.setPointerCapture(e.pointerId)});
orb.addEventListener('pointermove',e=>{if(!drag)return;const r=$('#stage').getBoundingClientRect();aim(e.clientX-r.left,e.clientY-r.top)});
orb.addEventListener('pointerup',()=>{drag=false});
orb.addEventListener('keydown',e=>{const t=tgt(),d={ArrowLeft:[1,0],ArrowRight:[-1,0],ArrowUp:[0,1],ArrowDown:[0,-1]}[e.key];
 if(!t||!d)return;e.preventDefault();const n=e.shiftKey?5:1;t.x+=d[0]*n;t.y+=d[1]*n;build();update()});
addEventListener('resize',placeOrb);
const ids=TOOLS.flatMap(g=>g[1].map(t=>t[0])),hs=location.hash.slice(1);setMode(ids.includes(hs)?hs:'box');addEventListener('hashchange',()=>{const x=location.hash.slice(1);if(ids.includes(x)&&x!==mode)setMode(x)});
