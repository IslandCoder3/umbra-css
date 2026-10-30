/* Umbra studio: Generic tool engine: builds the controls (buildGen) and the preview (updateGen). */
function buildGen(c){const g=G[mode],s=g.s;
 (typeof g.f==='function'?g.f(s):g.f).forEach(f=>c.append(f[0]==='r'?slider(f[1],f[7]?f[7](s):s,f[2],f[3],f[4],f[5],f[6]):f[0]==='c'?colorRow(f[1],s,f[2]):
  f[0]==='txt'?h('label',{class:'inline'},h('span',{style:'color:var(--mute);font-size:.9rem;min-width:70px'},f[2]),h('input',{type:'text',class:'tin',value:s[f[1]],oninput:e=>{s[f[1]]=e.target.value;update()}})):
  f[0]==='area'?h('div',{},h('label',{class:'lbl',for:'ta_'+f[1]},f[2]),(()=>{const t=h('textarea',{class:'tin',id:'ta_'+f[1],rows:7,spellcheck:'false',oninput:e=>{s[f[1]]=e.target.value;update()}});t.value=s[f[1]];return t})()):
  f[0]==='chk'?h('label',{class:'inline'},h('input',{type:'checkbox',checked:s[f[2]]||null,onchange:e=>{s[f[2]]=e.target.checked;update()}}),f[1]):
  f[0]==='multi'?h('div',{class:'inline'},...(f[3]?[h('span',{style:'color:var(--mute);font-size:.9rem;min-width:70px'},f[3])]:[]),...f[2].map(o=>h('button',{class:'chip',type:'button','aria-pressed':s[f[1]].includes(o),onclick:()=>{const a=s[f[1]],i=a.indexOf(o);i<0?a.push(o):a.splice(i,1);build();update()}},o+(f[4]||'')))):
  f[0]==='btn'?(()=>{const b=h('button',{class:'chip',type:'button',onclick:()=>{f[2](s);build();update()}},f[1]);if(f[3])b.setAttribute('aria-pressed',!!f[3](s));return b})():
  h('div',{class:'inline'},...(f[3]?[h('span',{style:'color:var(--mute);font-size:.9rem;min-width:70px'},f[3])]:[]),...f[2].map(o=>h('button',{class:'chip',type:'button','aria-pressed':(f[4]?f[4](s):s)[f[1]]===o,onclick:()=>{(f[4]?f[4](s):s)[f[1]]=o;build();update()}},o)))))}
let OUT={css:'',dec:null},fmt='css',hR=0,SNAP={x:null,y:null,on:false};
function updateGen(sub,stage){const g=G[mode],s=g.s,o=g.out(s);
 sub.textContent=typeof g.txt==='function'?g.txt(s):(g.txt||'');const cx=typeof g.cls==='function'?g.cls(s):g.cls;sub.className='gbox'+(cx?' '+cx:'');
 if(g.html)sub.innerHTML=g.html(s);
 const nk=typeof g.kids==='function'?g.kids(s):(g.kids||0);for(let i=0;i<nk;i++){const k=document.createElement('i');k.textContent=g.kidTxt?g.kidTxt(i,s):i+1;if(g.kidCss)k.style.cssText=g.kidCss(s,i);sub.append(k)}
 stage.style.setProperty('--base',g.stage?g.stage(s):(g.base||'#d5dafb'));stage.style.setProperty('--glow',g.base?'rgba(255,255,255,.18)':'rgba(255,255,255,.7)');stage.classList.toggle('dark',!!g.base);
 let kf=document.getElementById('kf');if(!kf){kf=document.createElement('style');kf.id='kf';document.head.append(kf)}kf.textContent=g.inject?g.inject(s):'';
 const pv=(typeof g.pv==='function'?g.pv(s):g.pv)||[];(g.last?o.concat(pv):pv.concat(o)).forEach(([p,v])=>p&&sub.style.setProperty(p,v));
 OUT.css=g.code?g.code(s):o.map(([p,v])=>p?`${p}: ${v};`:`/* ${v} */`).join('\n');OUT.dec=g.dec?g.dec(s):(g.code?null:o.filter(x=>x[0]));
 $('#prop').textContent=g.label;showCode();syncHandles(g,s,sub,stage);placeOrb()}
