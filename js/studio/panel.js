/* Umbra studio: Controls panel extras: undo and redo, reset, Import CSS, browser support notes and saved looks. */
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
const LK='umbra-looks',lkLoad=()=>{try{return JSON.parse(localStorage.getItem(LK)||'[]')}catch(e){return[]}},lkSave=a=>{try{localStorage.setItem(LK,JSON.stringify(a.slice(0,40)))}catch(e){}};
function savedPanel(){const c=$('#controls'),mine=lkLoad().filter(l=>l.tool===mode),old=c.querySelector('.sl');if(old)old.remove();
 const g=h('div',{class:'group sl'},h('b',{class:'lbl'},`Saved looks (${mine.length})`));
 if(!mine.length)g.append(h('p',{class:'hint2'},'Press Save look under the code to keep this setting in your browser.'));
 mine.forEach(l=>g.append(h('div',{class:'svrow'},h('button',{class:'chip',type:'button',title:l.css.split('\n')[0],onclick:()=>{handoff(l.tool,encodeURIComponent(JSON.stringify(l.state)));setMode(l.tool)}},l.name),h('button',{class:'chip x',type:'button','aria-label':'Delete '+l.name,onclick:()=>{lkSave(lkLoad().filter(z=>z.id!==l.id));savedPanel()}},'\u00d7'))));
 c.append(g)}
$('#save').addEventListener('click',()=>{const all=lkLoad(),n=all.filter(l=>l.tool===mode).length+1,lab=(TOOLS.flatMap(g=>g[1]).find(t=>t[0]===mode)||[0,mode])[1],b=$('#save');
 all.unshift({id:Date.now().toString(36),tool:mode,name:lab+' '+n,state:JSON.parse(JSON.stringify(stateOf(mode))),css:OUT.css,ts:Date.now()});lkSave(all);savedPanel();b.textContent='Saved';setTimeout(()=>{b.textContent='Save look'},1400)});
