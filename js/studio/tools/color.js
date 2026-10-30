/* Umbra studio: Color: gradient, palette, converter, contrast and blend modes. */
const rnd=()=>'#'+Math.floor(Math.random()*16777215).toString(16).padStart(6,'0');
const hsl=c=>{const [r,g,b]=rgb(c).map(v=>v/255),mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2,d=mx-mn;let hh=0,s=0;if(d){s=d/(1-Math.abs(2*l-1));hh=(mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4)*60;if(hh<0)hh+=360}return `hsl(${Math.round(hh)} ${Math.round(s*100)}% ${Math.round(l*100)}%)`};
const LV=[50,100,200,300,400,500,600,700,800,900],PL=[[1,.9],[1,.78],[1,.58],[1,.38],[1,.18],[0,0],[0,.16],[0,.32],[0,.5],[0,.68]];
const shade=(c,i)=>PL[i][1]?mix(c,PL[i][0]?[255,255,255]:[0,0,0],PL[i][1]):c;
const toHsl=c=>{const [r,g,b]=rgb(c).map(v=>v/255),mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2,d=mx-mn;let hh=0,s=0;if(d){s=d/(1-Math.abs(2*l-1));hh=(mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4)*60;if(hh<0)hh+=360}return [hh,s,l]};
const fromHsl=([h2,s,l])=>{const a=s*Math.min(l,1-l),f=n=>{const k=(n+h2/30)%12;return l-a*Math.max(-1,Math.min(k-3,9-k,1))};return hex([f(0)*255,f(8)*255,f(4)*255])};
const fixC=(s,t)=>{let [h2,sa,l]=toHsl(s.fg);const up=lum(s.bg)<.4?1:-1;for(let i=0;i<100&&cr({fg:fromHsl([h2,sa,l]),bg:s.bg})<t;i++)l=Math.max(0,Math.min(1,l+up*.01));return fromHsl([h2,sa,l])};
const oklch=(c,a)=>{const [r,g,b]=rgb(c).map(v=>{v/=255;return v<=.04045?v/12.92:Math.pow((v+.055)/1.055,2.4)}),l=Math.cbrt(.4122214708*r+.5363325363*g+.0514459929*b),m=Math.cbrt(.2119034982*r+.6806995451*g+.1073969566*b),q=Math.cbrt(.0883024619*r+.2817188376*g+.6299787005*b),L=.2104542553*l+.793617785*m-.0040720468*q,A=1.9779984951*l-2.428592205*m+.4505937099*q,B=.0259040371*l+.7827717662*m-.808675766*q,C=Math.hypot(A,B);let H=Math.atan2(B,A)*180/Math.PI;if(H<0)H+=360;return `oklch(${r3(L*100)}% ${r3(C)} ${C<.0004?0:r3(H)}${a<100?` / ${a}%`:''})`};
const gn=s=>s.n||(s.use3?3:2);
const evenPos=s=>{const n=gn(s);return Array.from({length:n},(_,i)=>n===3&&i===1?(s.p2==null?50:s.p2):Math.round(i*100/(n-1)))};
const ensurePos=s=>{if(!s.pos||s.pos.length!==gn(s))s.pos=evenPos(s);return s.pos};
const gpos=s=>(s.pos&&s.pos.length===gn(s))?s.pos:evenPos(s);
const gstops=s=>{const n=gn(s),u=s.type==='conic'?'deg':'px',pos=gpos(s);return pos.map((p,i)=>`${s['c'+(i+1)]} ${s.rep?r3(p*s.rsz/100)+u:p+'%'}`).join(', ')};
Object.assign(G,{
gradient:{label:'background',s:{type:'linear',angle:135,p2:50,n:3,pos:[0,50,100],c1:'#ff9a3c',c2:'#e4457b',c3:'#3a4fd8',c4:'#ffd34d',c5:'#18c4a7',rep:false,rsz:40},
 handles:s=>{const n=gn(s),pos=gpos(s),r=$('#subject').getBoundingClientRect(),W=r.width||240,H=r.height||200,hs=pos.map((p,i)=>[p,100,'stop',s['c'+(i+1)]]);
  if(s.type!=='radial'){const a=s.angle*Math.PI/180,R=Math.min(W,H)/2+26;hs.push([50+Math.sin(a)*R/W*100,50-Math.cos(a)*R/H*100,'dial'])}return hs},
 hset:(s,i,x,y)=>{const n=gn(s);if(i<n){const pos=ensurePos(s),lo=i?pos[i-1]:0,hi=i<n-1?pos[i+1]:100;pos[i]=Math.round(Math.max(lo,Math.min(hi,x)));if(n===3)s.p2=pos[1]}
  else{const r=$('#subject').getBoundingClientRect();let a=Math.round(Math.atan2((x-50)/100*r.width,-(y-50)/100*r.height)*180/Math.PI);if(a<0)a+=360;const q=a%45;if(q<=3||q>=42)a=Math.round(a/45)*45;s.angle=a%360}},
 f:s=>{const n=gn(s);ensurePos(s);return [['sel','type',['linear','radial','conic']],['r','Angle','angle',0,360,1,'deg'],['sel','n',[2,3,4,5],'Stops'],...[...Array(n).keys()].flatMap(i=>[['c','Color '+(i+1),'c'+(i+1)],['r','Position '+(i+1),i,0,100,1,'%',s=>s.pos]]),['btn','Even spacing',s=>{s.pos=evenPos(s)}],['chk','Repeating','rep'],...(s.rep?[['r','Repeat every','rsz',10,300,1,s.type==='conic'?'deg':'px']]:[]),['btn','Randomize colors',s=>{for(let i=1;i<=5;i++)s['c'+i]=rnd()}]]},
 out:s=>{const st=gstops(s),pre=s.rep?'repeating-':'';return [['background',s.type==='linear'?`${pre}linear-gradient(${s.angle}deg, ${st})`:s.type==='radial'?`${pre}radial-gradient(circle at center, ${st})`:`${pre}conic-gradient(from ${s.angle}deg, ${st})`]]}},
contrast:{label:'colors',s:{fg:'#1b2240',bg:'#ffd34d'},txt:s=>`${cr(s).toFixed(2)}:1  ${cr(s)>=4.5?'AA pass':'AA fail'}`,
 f:[['c','Text color','fg'],['c','Background','bg'],['btn','Fix text for AA',s=>{s.fg=fixC(s,4.5)}],['btn','Fix text for AAA',s=>{s.fg=fixC(s,7)}],['btn','Swap colors',s=>{[s.fg,s.bg]=[s.bg,s.fg]}]],
 pv:s=>[['color',s.fg],['background',s.bg],['display','grid'],['place-items','center'],['font','800 1.6rem "Bricolage Grotesque",system-ui,sans-serif']],
 out:s=>{const r=cr(s),y=v=>v?'pass':'fail';return [['color',s.fg],['background',s.bg],['',`contrast ${r.toFixed(2)}:1`],['',`AA text ${y(r>=4.5)} | AA large text ${y(r>=3)} | AAA text ${y(r>=7)} | AAA large text ${y(r>=4.5)} | UI components ${y(r>=3)}`]]}},
palette:{label:'palette',cls:'kids',kids:10,s:{c:'#4a5bdc'},pv:[['width','340px'],['height','auto'],['display','grid'],['grid-template-columns','repeat(5, 1fr)'],['gap','6px']],
 f:[['c','Base color (500)','c']],kidTxt:i=>LV[i],kidCss:(s,i)=>`background:${shade(s.c,i)};height:60px;color:${i<5?'#1b2240':'#fff'};font-size:.8rem`,out:s=>[],
 code:s=>`:root {\n${LV.map((l,i)=>`  --brand-${l}: ${shade(s.c,i)};`).join('\n')}\n}`},
convert:{label:'color',s:{c:'#4a5bdc',a:100},txt:s=>s.c,f:[['c','Pick a color','c'],['r','Opacity','a',0,100,1,'%']],
 pv:s=>[['background',`rgba(${rgb(s.c).join(',')},${s.a/100})`],['color',lum(s.c)>.4?'#1b2240':'#fff'],['display','grid'],['place-items','center'],['font','800 1.4rem "JetBrains Mono",ui-monospace,monospace']],out:s=>[['color',s.c]],
 dec:s=>[['color',s.c+(s.a<100?Math.round(s.a*2.55).toString(16).padStart(2,'0'):'')]],
 code:s=>{const a=s.a,al=a<100?` / ${a}%`:'';return `:root {\n  --color-hex: ${s.c+(a<100?Math.round(a*2.55).toString(16).padStart(2,'0'):'')};\n  --color-rgb: rgb(${rgb(s.c).join(' ')}${al});\n  --color-hsl: ${hsl(s.c).replace(')',al+')')};\n  --color-oklch: ${oklch(s.c,a)};\n}\n\n/* mix with white: color-mix(in srgb, ${s.c} 80%, white) */`}},
blend:{label:'background-blend-mode',s:{m:'multiply'},pv:[['background','linear-gradient(135deg,#ff9a3c,#e4457b),linear-gradient(90deg,#18c4a7,#4a5bdc)'],['width','220px'],['height','170px']],
 f:[['sel','m',['multiply','screen','overlay','darken','lighten','color-dodge','color-burn','hard-light','soft-light','difference','exclusion','hue','saturation','color','luminosity'],'Mode']],
 out:s=>[['background-blend-mode',s.m]],code:s=>`background-blend-mode: ${s.m};\n/* needs two or more backgrounds on the element */\n/* mix-blend-mode: ${s.m}; blends an element with what is behind it */`}
});
