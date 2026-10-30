/* Umbra studio: Code output: CSS, Tailwind, SCSS, variables and React formats, plus the share link. */
const FMT=[['css','CSS'],['tailwind','Tailwind'],['scss','SCSS'],['vars','Variables'],['js','React']];
const camel=p=>p.replace(/^-webkit-/,'Webkit-').replace(/-(\w)/g,(_,c)=>c.toUpperCase());
function conv(d,f){const one=v=>String(v).replace(/\s+/g,' '),nm=p=>p.replace(/^-+/,'');
 if(f==='tailwind')return `<div class="${d.map(([p,v])=>`[${p}:${one(v).replace(/,\s+/g,',').replace(/"/g,"'").replace(/ /g,'_')}]`).join(' ')}"></div>\n/* Tailwind 3.1+ arbitrary properties */`;
 if(f==='scss')return d.map(([p,v])=>`$${nm(p)}: ${one(v)};`).join('\n')+`\n\n.element {\n${d.map(([p])=>`  ${p}: $${nm(p)};`).join('\n')}\n}`;
 if(f==='vars')return `:root {\n${d.map(([p,v])=>`  --${nm(p)}: ${one(v)};`).join('\n')}\n}\n\n.element {\n${d.map(([p])=>`  ${p}: var(--${nm(p)});`).join('\n')}\n}`;
 return `const style = {\n${d.map(([p,v])=>`  ${camel(p)}: '${one(v).replace(/'/g,"\\'")}',`).join('\n')}\n};`}
function showCode(){const d=OUT.dec&&OUT.dec.length?OUT.dec:null,bar=$('#fmts');if(!d)fmt='css';bar.hidden=!d;[...bar.children].forEach(b=>b.setAttribute('aria-pressed',b.dataset.f===fmt));
 $('#code').textContent=fmt==='css'||!d?OUT.css:conv(d,fmt);const c=$('#copy');if(!c.dataset.busy)c.textContent=fmt==='css'?'Copy CSS':'Copy code'}
const stateOf=m=>m==='box'||m==='text'?S[m]:m==='filter'?S.filter:G[m].s;
FMT.forEach(([k,l])=>{const b=h('button',{class:'chip',type:'button',onclick:()=>{fmt=k;showCode()}},l);b.dataset.f=k;$('#fmts').append(b)});
$('#share').addEventListener('click',async()=>{const st=stateOf(mode),u=location.href.split('#')[0]+'#'+mode+':'+encodeURIComponent(JSON.stringify(st)),b=$('#share');
 try{await navigator.clipboard.writeText(u)}catch(e){const ta=document.createElement('textarea');ta.value=u;document.body.append(ta);ta.select();try{document.execCommand('copy')}catch(_){}ta.remove()}
 b.textContent='Link copied';$('#live').textContent='Link copied to clipboard';setTimeout(()=>{b.textContent='Share link'},1400)});
