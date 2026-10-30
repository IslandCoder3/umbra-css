/* Umbra studio: Shape: border radius, clip-path, transform, border and SVG shapes. */
const rn=(a,b)=>Math.round(a+Math.random()*(b-a));
const GRAD=[['background','linear-gradient(135deg,#4a5bdc,#8b9bff)']];
const PK=Object.keys(CP).filter(k=>CP[k].startsWith('polygon'));
const polyPts=k=>[...CP[k].matchAll(/(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%/g)].map(m=>[+m[1],+m[2]]);
const rng0=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const r1=v=>Math.round(v*10)/10;
const cat=(P,close)=>{const n=P.length;let d=`M${r1(P[0][0])},${r1(P[0][1])}`;for(let i=0;i<(close?n:n-1);i++){const p0=P[close?(i-1+n)%n:Math.max(0,i-1)],p1=P[i],p2=P[(i+1)%n],p3=P[close?(i+2)%n:Math.min(n-1,i+2)];d+=` C${r1(p1[0]+(p2[0]-p0[0])/6)},${r1(p1[1]+(p2[1]-p0[1])/6)} ${r1(p2[0]-(p3[0]-p1[0])/6)},${r1(p2[1]-(p3[1]-p1[1])/6)} ${r1(p2[0])},${r1(p2[1])}`}return d};
const svgPath=s=>{if(s.shape==='Blob'){const R=rng0(s.seed),P=Array.from({length:s.pts},(_,i)=>{const a=i/s.pts*Math.PI*2,r=80*(1-R()*s.rnd/100*.6);return [100+r*Math.cos(a),100+r*Math.sin(a)]});return cat(P,true)+' Z'}
 const m=s.freq*2+1,P=Array.from({length:m},(_,k)=>[k*1440/(m-1),160+(k%2?-1:1)*s.amp]);return cat(P,false)+' L1440,320 L0,320 Z'};
const svgVB=s=>s.shape==='Blob'?'0 0 200 200':'0 0 1440 320';
Object.assign(G,{
radius:{label:'border-radius',s:{a:60,b:40,c:30,d:70,e:60,f:30,g:70,h:40},pv:GRAD,
 handles:s=>{const P=[[s.a,0],[100-s.b,0],[100-s.c,100],[s.d,100],[0,s.e],[100,s.f],[100,100-s.g],[0,100-s.h]];if(Math.abs(P[0][0]-P[1][0])<7)P[1][1]=9;if(Math.abs(P[2][0]-P[3][0])<7)P[3][1]=91;if(Math.abs(P[4][1]-P[7][1])<7)P[7][0]=9;if(Math.abs(P[5][1]-P[6][1])<7)P[6][0]=91;return P.map(p=>[p[0],p[1],'edge'])},
 hset:(s,i,x,y)=>{const X=Math.round(cl2(x)),Y=Math.round(cl2(y));[()=>{s.a=X},()=>{s.b=100-X},()=>{s.c=100-X},()=>{s.d=X},()=>{s.e=Y},()=>{s.f=Y},()=>{s.g=100-Y},()=>{s.h=100-Y}][i]()},
 f:[['r','Top-left X','a',0,100,1,'%'],['r','Top-right X','b',0,100,1,'%'],['r','Bottom-right X','c',0,100,1,'%'],['r','Bottom-left X','d',0,100,1,'%'],['r','Top-left Y','e',0,100,1,'%'],['r','Top-right Y','f',0,100,1,'%'],['r','Bottom-right Y','g',0,100,1,'%'],['r','Bottom-left Y','h',0,100,1,'%'],['btn','Randomize blob',s=>{'abcdefgh'.split('').forEach(k=>s[k]=rn(30,70))}]],
 out:s=>[['border-radius',`${s.a}% ${s.b}% ${s.c}% ${s.d}% / ${s.e}% ${s.f}% ${s.g}% ${s.h}%`]]},
transform:{label:'transform',s:{rot:0,sc:100,skx:0,sky:0,tx:0,ty:0,rx:0,ry:0,persp:800,org:'center'},pv:GRAD,
 f:[['r','Rotate','rot',-180,180,1,'deg'],['r','Rotate X','rx',-90,90,1,'deg'],['r','Rotate Y','ry',-90,90,1,'deg'],['r','Perspective','persp',200,2000,50,'px'],['r','Scale','sc',20,200,1,'%'],['r','Skew X','skx',-60,60,1,'deg'],['r','Skew Y','sky',-60,60,1,'deg'],['r','Move X','tx',-150,150,1,'px'],['r','Move Y','ty',-150,150,1,'px'],['sel','org',['center','top left','top','top right','left','right','bottom left','bottom','bottom right'],'Origin']],
 out:s=>{const p=[];if(s.rx||s.ry)p.push(`perspective(${s.persp}px)`);if(s.tx||s.ty)p.push(`translate(${s.tx}px, ${s.ty}px)`);if(s.rx)p.push(`rotateX(${s.rx}deg)`);if(s.ry)p.push(`rotateY(${s.ry}deg)`);if(s.rot)p.push(`rotate(${s.rot}deg)`);if(s.sc!==100)p.push(`scale(${s.sc/100})`);if(s.skx||s.sky)p.push(`skew(${s.skx}deg, ${s.sky}deg)`);return [['transform',p.length?p.join(' '):'none'],...(s.org!=='center'?[['transform-origin',s.org]]:[])]}},
clip:{label:'clip-path',gd:1,s:{mode:'Preset shapes',shape:'hexagon',pts:[[50,0],[100,100],[0,100]],sel:0,snap:true,guides:true,grid:false},pv:[['background','linear-gradient(135deg,#4a5bdc,#e4457b)'],['width','190px'],['height','190px'],['border-radius','0']],
 handles:s=>s.mode==='Draw your own'?s.pts:null,
 f:s=>s.mode==='Preset shapes'?[['sel','mode',['Preset shapes','Draw your own'],'Mode'],['sel','shape',Object.keys(CP),'Shape']]:[['sel','mode',['Preset shapes','Draw your own'],'Mode'],...PK.map(k=>['btn',k,s=>{s.pts=polyPts(k);s.sel=0}]),['btn','Add point',s=>{const a=s.pts[s.sel],b=s.pts[(s.sel+1)%s.pts.length];s.pts.splice(s.sel+1,0,[Math.round((a[0]+b[0])/2),Math.round((a[1]+b[1])/2)]);s.sel++}],['btn','Remove point',s=>{if(s.pts.length>3){s.pts.splice(s.sel,1);s.sel=Math.max(0,s.sel-1)}}],
  ['btn','Center shape',s=>{const x=s.pts.map(p=>p[0]),y=s.pts.map(p=>p[1]),dx=50-(Math.min(...x)+Math.max(...x))/2,dy=50-(Math.min(...y)+Math.max(...y))/2;s.pts=s.pts.map(p=>[Math.round(p[0]+dx),Math.round(p[1]+dy)])}],['btn','Flip horizontal',s=>{s.pts=s.pts.map(p=>[100-p[0],p[1]])}],['btn','Flip vertical',s=>{s.pts=s.pts.map(p=>[p[0],100-p[1]])}],
  ['chk','Snap to guides','snap'],['chk','Show guides','guides'],['chk','Grid lines','grid'],['r','Point X','0',0,100,1,'%',s=>s.pts[s.sel]],['r','Point Y','1',0,100,1,'%',s=>s.pts[s.sel]]],
 out:s=>[['clip-path',s.mode==='Preset shapes'?CP[s.shape]:`polygon(${s.pts.map(p=>p[0]+'% '+p[1]+'%').join(', ')})`]]},
border:{label:'border',s:{w:3,st:'solid',c:'#4a5bdc',r:16,sides:['top','right','bottom','left'],ow:0,oo:4},
 f:[['r','Width','w',0,16,1,'px'],['sel','st',['solid','dashed','dotted','double'],'Style'],['c','Color','c'],['multi','sides',['top','right','bottom','left'],'Sides'],['r','Radius','r',0,100,1,'px'],['r','Outline','ow',0,12,1,'px'],['r','Outline offset','oo',-8,20,1,'px']],
 out:s=>{const b=`${s.w}px ${s.st} ${s.c}`,S=['top','right','bottom','left'],all=S.every(x=>s.sides.includes(x));return [...(all?[['border',b]]:S.filter(x=>s.sides.includes(x)).map(x=>['border-'+x,b])),['border-radius',s.r+'px'],...(s.ow>0?[['outline',`${s.ow}px ${s.st} ${s.c}`],['outline-offset',s.oo+'px']]:[])]}},
svg:{label:'svg',s:{shape:'Blob',fill:'#4a5bdc',pts:7,rnd:45,seed:7,amp:60,freq:3},html:s=>`<svg viewBox="${svgVB(s)}" width="100%" style="display:block;max-height:240px"><path d="${svgPath(s)}" fill="${s.fill}"/></svg>`,
 f:s=>[['sel','shape',['Blob','Wave'],'Shape'],...(s.shape==='Blob'?[['r','Points','pts',3,12,1,''],['r','Randomness','rnd',0,100,1,'%'],['btn','New shape',s=>{s.seed=(s.seed*7+13)%9973}]]:[['r','Amplitude','amp',10,120,1,''],['r','Waves','freq',1,6,1,'']]),['c','Fill','fill']],
 pv:[['width','320px'],['max-width','100%'],['height','auto'],['background','transparent']],out:s=>[],
 code:s=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${svgVB(s)}">\n  <path fill="${s.fill}" d="${svgPath(s)}"/>\n</svg>`}
});
