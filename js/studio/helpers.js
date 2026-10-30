/* Umbra studio: Shared helpers used by more than one tool (colors, number formatting, random). */
const lum=c=>{const n=parseInt(c.slice(1),16);return [n>>16&255,n>>8&255,n&255].reduce((a,v,i)=>{v/=255;v=v<=.03928?v/12.92:((v+.055)/1.055)**2.4;return a+v*[.2126,.7152,.0722][i]},0)};
const cr=s=>{const a=lum(s.fg),b=lum(s.bg);return (Math.max(a,b)+.05)/(Math.min(a,b)+.05)};
const fl=s=>{const sl=(s.max-s.min)/(s.maxVw-s.minVw),ic=s.min-sl*s.minVw;return {sl,ic,px:Math.min(s.max,Math.max(s.min,ic+sl*s.vw))}};
const r3=n=>+n.toFixed(3);
const rgb=c=>{const n=parseInt(c.slice(1),16);return [n>>16&255,n>>8&255,n&255]};
const hex=a=>'#'+a.map(v=>Math.round(v).toString(16).padStart(2,'0')).join('');
const mix=(c,t,p)=>hex(rgb(c).map((v,i)=>v+(t[i]-v)*p));
