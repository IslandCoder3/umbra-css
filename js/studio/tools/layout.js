/* Umbra studio: Layout: flexbox, grid, grid areas and aspect ratio. */
const AP={'holy grail':{a:['header header header','nav main aside','footer footer footer'],c:'80px 1fr 80px',r:'auto 1fr auto',n:['header','nav','main','aside','footer']},'sidebar':{a:['sidebar main'],c:'90px 1fr',r:'1fr',n:['sidebar','main']},'dashboard':{a:['title title','stats chart','list chart'],c:'1fr 1.4fr',r:'auto 1fr 1fr',n:['title','stats','list','chart']}};
const flexOut=s=>[['display','flex'],['flex-direction',s.dir],['justify-content',s.jc],['align-items',s.ai],['flex-wrap',s.wrap],['gap',s.gap+'px']];
const grOut=s=>{const g=s.gap===s.rgap?s.gap+'px':`${s.rgap}px ${s.gap}px`;return s.mode==='Fixed'?[['display','grid'],['grid-template-columns',`repeat(${s.cols}, ${s.tr})`],['grid-template-rows',`repeat(${s.rows}, ${s.tr})`],['gap',g]]:[['display','grid'],['grid-template-columns',`repeat(${s.mode}, minmax(${s.minw}px, 1fr))`],['gap',g]]};
const arv=s=>s.p==='custom'?`${s.w} / ${s.h}`:s.p;
Object.assign(G,{
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
areas:{label:'grid-template-areas',cls:'kids v',kids:s=>AP[s.p].n.length,s:{p:'holy grail',gap:8},pv:[['width','340px'],['height','220px']],
 f:[['sel','p',Object.keys(AP),'Layout'],['r','Gap','gap',0,24,1,'px']],kidTxt:(i,s)=>AP[s.p].n[i],kidCss:(s,i)=>`grid-area:${AP[s.p].n[i]}`,
 out:s=>{const p=AP[s.p];return [['display','grid'],['grid-template-areas',p.a.map(x=>`"${x}"`).join(' ')],['grid-template-columns',p.c],['grid-template-rows',p.r],['gap',s.gap+'px']]},
 code:s=>{const p=AP[s.p];return `.layout {\n  display: grid;\n  grid-template-areas:\n${p.a.map(x=>`    "${x}"`).join('\n')};\n  grid-template-columns: ${p.c};\n  grid-template-rows: ${p.r};\n  gap: ${s.gap}px;\n}\n\n${p.n.map(n=>`.${n} { grid-area: ${n}; }`).join('\n')}`}},
aspect:{label:'aspect-ratio',s:{p:'16 / 9',w:16,h:9},f:s=>[['sel','p',['16 / 9','4 / 3','1 / 1','3 / 2','21 / 9','9 / 16','4 / 5','custom'],'Ratio'],...(s.p==='custom'?[['r','Width','w',1,32,1,''],['r','Height','h',1,32,1,'']]:[])],
 pv:s=>[['width','260px'],['max-width','100%'],['height','auto'],['aspect-ratio',arv(s)],['background','linear-gradient(135deg,#4a5bdc,#e4457b)']],
 out:s=>{const [a,b]=arv(s).split('/').map(Number);return [['aspect-ratio',arv(s)],['',`padding-top fallback: ${r3(b/a*100)}%`]]}}
});
