/* Umbra studio: Motion: animation and easing. */
const KF={pulse:[['0%, 100%','transform: scale(1)'],['50%','transform: scale(1.12)']],bounce:[['0%, 100%','transform: translateY(0)'],['50%','transform: translateY(-28px)']],spin:[['to','transform: rotate(360deg)']],float:[['0%, 100%','transform: translateY(0) rotate(-2deg)'],['50%','transform: translateY(-14px) rotate(2deg)']],shake:[['0%, 100%','transform: translateX(0)'],['20%, 60%','transform: translateX(-10px)'],['40%, 80%','transform: translateX(10px)']],fade:[['from','opacity: 0'],['to','opacity: 1']]};
const bz=s=>`cubic-bezier(${r3(s.x1)}, ${r3(s.y1)}, ${r3(s.x2)}, ${r3(s.y2)})`;
const eqb=(s,a,b,c,d)=>[s.x1,s.y1,s.x2,s.y2].every((v,i)=>Math.abs(v-[a,b,c,d][i])<.005);
const stepDecl=t=>`transform: translate(${t.x}px, ${t.y}px) rotate(${t.r}deg) scale(${r3(t.sc/100)}); opacity: ${r3(t.o/100)}`;
const kfOf=s=>s.kf==='custom'?[...s.steps].sort((a,b)=>a.p-b.p).map(t=>[t.p+'%',stepDecl(t)]):KF[s.kf];
const stp=s=>s.steps[s.si-1];
const anV=s=>`${s.kf} ${r3(s.dur)}s ${s.ease} ${r3(s.del)}s ${s.iter} ${s.dir} ${s.fill}`;
const declLines=v=>v.split(';').map(x=>x.trim()).filter(Boolean).map(x=>`    ${x};`).join('\n');
const yp=y=>cl2((1.5-y)/2*100);
const BZP=[['Ease',.25,.1,.25,1],['Ease in',.42,0,1,1],['Ease out',0,0,.58,1],['Back out',.34,1.56,.64,1],['Snappy',.2,.9,.1,1]];
Object.assign(G,{
ease:{label:'easing',s:{x1:.25,y1:.1,x2:.25,y2:1},
 handles:s=>[[s.x1*100,yp(s.y1),'bz'],[s.x2*100,yp(s.y2),'bz']],
 hset:(s,i,x,y)=>{const nx=Math.round(cl2(x))/100,ny=Math.round((1.5-cl2(y)/100*2)*100)/100;if(i===0){s.x1=nx;s.y1=ny}else{s.x2=nx;s.y2=ny}},
 f:[['r','X1','x1',0,1,.01,''],['r','Y1','y1',-1,2,.01,''],['r','X2','x2',0,1,.01,''],['r','Y2','y2',-1,2,.01,''],...BZP.map(([n,a,b,c,d])=>['btn',n,s=>Object.assign(s,{x1:a,y1:b,x2:c,y2:d}),s=>eqb(s,a,b,c,d)])],
 inject:()=>'@keyframes ezs{from{transform:translateX(0)}to{transform:translateX(100px)}}',
 html:s=>`<svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="none" style="display:block"><path d="M0,75H100M0,50H100M0,25H100" stroke="rgba(27,34,64,.12)" stroke-width="1" fill="none" vector-effect="non-scaling-stroke"/><path d="M0,75L${s.x1*100},${yp(s.y1)}M100,25L${s.x2*100},${yp(s.y2)}" stroke="rgba(27,34,64,.4)" stroke-width="1" fill="none" stroke-dasharray="3 3" vector-effect="non-scaling-stroke"/><path d="M0,75C${s.x1*100},${yp(s.y1)} ${s.x2*100},${yp(s.y2)} 100,25" stroke="#4a5bdc" stroke-width="3" fill="none" vector-effect="non-scaling-stroke"/><circle cx="0" cy="75" r="3.2" fill="#e4457b" style="animation:ezs 1.6s ${bz(s)} infinite alternate"/></svg>`,
 pv:[['width','260px'],['height','260px'],['background','#fff'],['border-radius','16px'],['max-width','100%']],
 out:s=>[['transition-timing-function',bz(s)]]},
anim:{label:'animation',s:{kf:'pulse',dur:1.2,del:0,ease:'ease-in-out',iter:'infinite',dir:'normal',fill:'none',si:2,steps:[{p:0,x:0,y:0,r:0,sc:100,o:100},{p:50,x:60,y:-40,r:0,sc:110,o:100},{p:100,x:0,y:0,r:0,sc:100,o:100}]},pv:[['background','linear-gradient(135deg,#4a5bdc,#8b9bff)'],['width','120px'],['height','120px'],['border-radius','24px']],
 f:s=>{const n=s.steps.length;if(s.si>n)s.si=n;return [['sel','kf',[...Object.keys(KF),'custom'],'Effect'],...(s.kf==='custom'?[['sel','si',[...Array(n).keys()].map(i=>i+1),'Step'],['r','Position','p',0,100,1,'%',stp],['r','Move X','x',-120,120,1,'px',stp],['r','Move Y','y',-120,120,1,'px',stp],['r','Rotate','r',-360,360,1,'deg',stp],['r','Scale','sc',20,200,1,'%',stp],['r','Opacity','o',0,100,1,'%',stp],
  ['btn','Add step',s=>{if(s.steps.length>=6)return;s.steps.sort((a,b)=>a.p-b.p);const i=s.si-1,a=s.steps[i],b=s.steps[i+1]||s.steps[i-1]||a;let np=Math.round((a.p+b.p)/2);if(np===a.p)np=Math.min(100,a.p+1);s.steps.push({...a,p:np});s.steps.sort((p,q)=>p.p-q.p);s.si=s.steps.findIndex(t=>t.p===np)+1}],
  ['btn','Remove step',s=>{if(s.steps.length>2){s.steps.splice(s.si-1,1);s.si=Math.max(1,s.si-1)}}]]:[]),['r','Duration','dur',.2,4,.1,'s'],['r','Delay','del',0,3,.1,'s'],['sel','ease',['linear','ease','ease-in-out','cubic-bezier(.34, 1.56, .64, 1)'],'Easing'],['sel','iter',['infinite','1','3'],'Repeat'],['sel','dir',['normal','alternate','reverse'],'Direction'],['sel','fill',['none','forwards','both'],'Fill mode']]},
 inject:s=>`@keyframes ${s.kf}{${kfOf(s).map(([k,v])=>`${k}{${v}}`).join('')}}`,
 out:s=>[['animation',anV(s)]],
 code:s=>`@keyframes ${s.kf} {\n${kfOf(s).map(([k,v])=>`  ${k} {\n${declLines(v)}\n  }`).join('\n')}\n}\n\n.element {\n  animation: ${anV(s)};\n}`}
});
