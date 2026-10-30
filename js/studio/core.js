/* Umbra studio: Studio state, DOM helpers, build() and update() for the Box shadow, Text shadow and Filter tools, and the empty G registry that tool files fill in. */
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
const G={};
