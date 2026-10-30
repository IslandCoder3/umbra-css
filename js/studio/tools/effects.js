/* Umbra studio: Effects: glass and neumorphism (box shadow, text shadow and filter live in core.js). */
Object.assign(G,{
glass:{label:'glassmorphism',base:'radial-gradient(circle at 42% 40%,#ffd34d 0 70px,transparent 71px),radial-gradient(circle at 58% 62%,#ff4d8d 0 90px,transparent 91px),linear-gradient(135deg,#6a5cff,#18c4a7)',s:{blur:14,alpha:.18,sat:140,border:.35,radius:20,tint:'#ffffff'},
 f:[['r','Blur','blur',0,40,1,'px'],['r','Opacity','alpha',0,.8,.01,''],['r','Saturate','sat',100,250,5,'%'],['r','Border','border',0,1,.01,''],['r','Radius','radius',0,60,1,'px'],['c','Tint color','tint']],
 out:s=>{const b=`blur(${s.blur}px) saturate(${s.sat}%)`;return [['background',`rgba(${rgb(s.tint||'#ffffff').join(', ')}, ${s.alpha})`],['backdrop-filter',b],['-webkit-backdrop-filter',b],['border',`1px solid rgba(255, 255, 255, ${s.border})`],['border-radius',s.radius+'px']]}},
neu:{label:'neumorphism',stage:s=>s.c,s:{c:'#e0e5ec',d:10,b:22,r:24,inset:false},pv:[['width','180px'],['height','180px']],
 f:[['c','Base color','c'],['r','Distance','d',2,30,1,'px'],['r','Blur','b',0,60,1,'px'],['r','Radius','r',0,80,1,'px'],['chk','Pressed in (inset)','inset']],
 out:s=>{const dk=mix(s.c,[0,0,0],.14),lt=mix(s.c,[255,255,255],.75),i=s.inset?'inset ':'';return [['background',s.c],['border-radius',s.r+'px'],['box-shadow',`${i}${s.d}px ${s.d}px ${s.b}px ${dk}, ${i}-${s.d}px -${s.d}px ${s.b}px ${lt}`]]}}
});
