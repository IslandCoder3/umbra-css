/* Umbra studio: Type and units: typography, fluid clamp, px to rem and spacing scale. */
const FF={sans:'system-ui, -apple-system, "Segoe UI", sans-serif',serif:'Georgia, "Times New Roman", serif',mono:'ui-monospace, Menlo, Consolas, monospace'};
const WID=[320,375,768,1024,1280,1440,1920],STEPS=[-2,-1,0,1,2,3,4,5];
const sz=(a,b,s,v)=>{const v2=Math.max(s.maxVw,s.minVw+1),sl=(b-a)/(v2-s.minVw),ic=a-sl*s.minVw;return Math.min(Math.max(a,b),Math.max(Math.min(a,b),ic+sl*v))};
const spx=s=>sz(s.min,s.max,s,s.vw).toFixed(1);
const cv=(a,b,s)=>{const v2=Math.max(s.maxVw,s.minVw+1),sl=(b-a)/(v2-s.minVw),ic=a-sl*s.minVw,u=s.unit==='rem'?s.root:1,U=s.unit==='rem'?'rem':'px';return `clamp(${r3(Math.min(a,b)/u)}${U}, ${r3(ic/u)}${U} ${sl<0?'-':'+'} ${r3(Math.abs(sl*100))}${s.per}, ${r3(Math.max(a,b)/u)}${U})`};
const stepv=(s,n)=>[s.bmin*Math.pow(s.rmin,n),s.bmax*Math.pow(s.rmax,n)];
const kidsOf=s=>s.mode==='Type scale'?8:({gap:3,margin:2,padding:1}[s.prop]||0);
const spv=(s,i)=>s.type==='Multiples'?s.base*(i+1):Math.round(s.base*Math.pow(s.ratio,i)*10)/10;
const PXS=[4,8,12,14,16,18,20,24,28,32,40,48,56,64,80,96];
Object.assign(G,{
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
type:{label:'typography',s:{ff:'sans',size:22,weight:600,ls:0,lh:1.4,tt:'none'},txt:'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.',
 pv:[['width','100%'],['height','auto'],['background','transparent'],['color','#1b2240'],['padding','16px'],['text-align','left']],
 f:[['sel','ff',['sans','serif','mono'],'Family'],['r','Size','size',10,72,1,'px'],['r','Weight','weight',100,900,100,''],['r','Spacing','ls',-.1,.3,.01,'em'],['r','Line height','lh',1,2.2,.05,''],['sel','tt',['none','uppercase','capitalize'],'Case']],
 out:s=>[['font-family',FF[s.ff]],['font-size',s.size+'px'],['font-weight',s.weight],['letter-spacing',r3(s.ls)+'em'],['line-height',r3(s.lh)],['text-transform',s.tt]]},
units:{label:'font-size',s:{px:24,root:16,rem:1.5,dir:'px to rem',out:'Single'},txt:s=>s.dir==='px to rem'?`${s.px}px = ${r3(s.px/s.root)}rem`:`${s.rem}rem = ${r3(s.rem*s.root)}px`,
 f:s=>[['sel','dir',['px to rem','rem to px'],'Direction'],s.dir==='px to rem'?['r','Pixels','px',1,200,1,'px']:['r','Rem','rem',.25,12,.125,'rem'],['r','Root size','root',10,24,1,'px'],['sel','out',['Single','Table','Variables'],'Output']],
 pv:[['background','transparent'],['width','100%'],['height','auto'],['font','800 1.8rem "Bricolage Grotesque",system-ui,sans-serif'],['color','#1b2240'],['text-align','center']],
 out:s=>[],dec:s=>s.out==='Single'?[['font-size',s.dir==='px to rem'?`${r3(s.px/s.root)}rem`:`${s.rem}rem`]]:null,
 code:s=>s.out==='Table'?`/* root font size: ${s.root}px */\n${PXS.map(p=>`/* ${p}px = ${r3(p/s.root)}rem */`).join('\n')}`:s.out==='Variables'?`:root {\n${PXS.map(p=>`  --space-${p}: ${r3(p/s.root)}rem;`).join('\n')}\n}`:s.dir==='px to rem'?`font-size: ${r3(s.px/s.root)}rem;\n/* ${s.px}px at a ${s.root}px root size */`:`font-size: ${s.rem}rem;\n/* = ${r3(s.rem*s.root)}px at a ${s.root}px root size */`},
space:{label:'spacing scale',cls:'kids',kids:s=>s.n,s:{type:'Multiples',base:4,n:8,ratio:1.5,root:16,unit:'rem'},
 f:[['sel','type',['Multiples','Modular'],'Scale'],['r','Base','base',2,16,1,'px'],['r','Steps','n',3,12,1,''],['r','Ratio','ratio',1.1,2,.05,''],['r','Root size','root',10,24,1,'px'],['sel','unit',['rem','px'],'Units']],
 pv:[['width','340px'],['height','auto'],['display','flex'],['flex-direction','column'],['align-items','flex-start'],['gap','6px'],['overflow','auto'],['max-height','320px']],
 kidTxt:(i,s)=>`${spv(s,i)}px`,kidCss:(s,i)=>`width:${Math.min(300,spv(s,i))}px;min-height:0;height:22px;padding:0 6px;place-items:center start;font-size:.7rem;border-radius:6px`,out:s=>[],
 code:s=>`:root {\n${Array.from({length:s.n},(_,i)=>`  --space-${i+1}: ${r3(spv(s,i)/(s.unit==='rem'?s.root:1))}${s.unit==='rem'?'rem':'px'};`).join('\n')}\n}`}
});
