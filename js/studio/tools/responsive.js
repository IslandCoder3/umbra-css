/* Umbra studio: Responsive and UI: media queries, container queries, scrollbar and specificity. */
const MQ=[['min-width: 480px','Phones in landscape and up'],['min-width: 768px','Tablets and up'],['min-width: 1024px','Laptops and up'],['min-width: 1280px','Large desktops'],['max-width: 767px','Phones and small tablets only'],['max-width: 1023px','Anything below laptop size'],['prefers-color-scheme: dark','User prefers dark mode'],['prefers-reduced-motion: reduce','User wants less animation'],['hover: hover','Device can hover (mouse)'],['pointer: coarse','Touch screens'],['orientation: landscape','Wider than tall'],['print','Printing the page']];
const BPS=[1536,1400,1300,1280,1200,1090,1024,1010,992,900,800,768,720,640,600,576,500,480,425,400,375,360,320];
const DEV=w=>w>1200?'Large Screens':w>800?'Large Tablet Devices':w>600?'Tablet Devices':'Smartphones';
const ladder=s=>{let prev='';return [...s.bps].map(Number).sort((a,b)=>s.dir==='max-width'?b-a:a-b).map(w=>{
 const lab=s.cm?DEV(w):'',head=lab&&lab!==prev?(prev=lab,`/* ${lab} */\n`):'',pre=s.px==='only screen and'?'only screen':s.px==='screen and'?'screen':'';
 if(s.lay==='classic'){const c=`${s.dir} : ${w}px`;return head+(pre?`@media ${pre}\nand (${c}) {\n\n}`:`@media (${c}) {\n\n}`)}
 return head+`@media ${pre?pre+' and ':''}(${s.dir}: ${w}px) {\n  \n}`}).join('\n\n')};
const eqL=(a,b)=>{const n=x=>[...x].map(Number).sort((p,q)=>p-q).join();return n(a)===n(b)};
const cmpS=(p,q)=>p[0]-q[0]||p[1]-q[1]||p[2]-q[2];
const spec1=x=>{let a=0,b=0,c=0;x=x.trim();
 x=x.replace(/:(not|is|has|matches)\(([^)]*)\)/g,(_,n,args)=>{const r=args.split(',').map(spec1).sort(cmpS).pop()||[0,0,0];a+=r[0];b+=r[1];c+=r[2];return ''});
 x=x.replace(/:where\([^)]*\)/g,'').replace(/\[[^\]]*\]/g,()=>{b++;return ''}).replace(/::[\w-]+(\([^)]*\))?/g,()=>{c++;return ''}).replace(/:[\w-]+(\([^)]*\))?/g,()=>{b++;return ''}).replace(/#[\w-]+/g,()=>{a++;return ''}).replace(/\.[\w-]+/g,()=>{b++;return ''}).replace(/(^|[\s>+~])([a-zA-Z][\w-]*)/g,(m,p)=>{c++;return p});
 return [a,b,c]};
const specRows=s=>s.sel.split('\n').flatMap(l=>l.split(',')).map(x=>x.trim()).filter(Boolean).map(x=>({x,v:spec1(x)})).sort((p,q)=>cmpS(q.v,p.v));
Object.assign(G,{
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
cq:{label:'container query',s:{name:'card',type:'inline-size',dir:'min-width',bps:[400,640]},f:[['txt','name','Name'],['sel','type',['inline-size','size'],'Type'],['sel','dir',['min-width','max-width'],'Query'],['multi','bps',[240,320,400,480,560,640,768,1024],'Sizes','px']],
 txt:s=>`${s.bps.length} container queries`,pv:[['background','transparent'],['width','100%'],['height','auto'],['font','700 1.5rem "Bricolage Grotesque",system-ui,sans-serif'],['color','#1b2240'],['text-align','center']],out:s=>[],
 code:s=>{const n=(s.name||'card').replace(/[^\w-]/g,'-');return `.${n}-wrap {\n  container-type: ${s.type};\n  container-name: ${n};\n}\n\n${[...s.bps].map(Number).sort((a,b)=>s.dir==='min-width'?a-b:b-a).map(w=>`@container ${n} (${s.dir}: ${w}px) {\n  .${n} {\n    /* styles */\n  }\n}`).join('\n\n')}`}},
spec:{label:'specificity',s:{sel:'#nav .item:hover\n.nav a\nul li a\na'},f:[['area','sel','Selectors, one per line']],
 txt:s=>{const r=specRows(s);return r.length?`Winner: ${r[0].x}  (${r[0].v.join(',')})`:'Add a selector'},
 pv:[['background','transparent'],['width','100%'],['height','auto'],['font','700 1.1rem "JetBrains Mono",ui-monospace,monospace'],['color','#1b2240'],['text-align','center'],['padding','12px']],out:s=>[],
 code:s=>`/* (ids, classes/attributes/pseudo-classes, elements/pseudo-elements) */\n/* inline style beats every selector, !important beats inline */\n/* highest specificity first */\n${specRows(s).map(r=>`(${r.v.join(',')})  ${r.x}`).join('\n')}`}
});
