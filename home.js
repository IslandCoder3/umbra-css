const $=s=>document.querySelector(s);
const D=[
['Shadows','Soft lift','card','background:#fff;box-shadow:0 12px 24px -4px rgba(27,34,64,.28)'],
['Shadows','Layered depth','card','background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.16),0 4px 8px rgba(0,0,0,.14),0 16px 32px rgba(0,0,0,.16)'],
['Shadows','Hard offset','card','background:#ffd34d;border:2px solid #1b2240;box-shadow:8px 8px 0 #1b2240'],
['Shadows','Pressed in','card','background:#e3e7fa;box-shadow:inset 0 4px 10px rgba(27,34,64,.35)'],
['Shadows','Neon edge','card','background:transparent;border:1px solid #ffb347;box-shadow:0 0 12px #ffb347,0 0 36px rgba(255,179,71,.55)','dark'],
['Gradients','Sunset','card','background:linear-gradient(135deg,#ff9a3c,#e4457b 55%,#3a4fd8)'],
['Gradients','Aurora','card','background:linear-gradient(120deg,#12d8fa,#a6ffcb 50%,#6a5cff)'],
['Gradients','Color wheel','card','background:conic-gradient(from 0deg,#ff4d8d,#ffd34d,#18c4a7,#6a5cff,#ff4d8d);border-radius:50%'],
['Gradients','Soft mesh','card','background:radial-gradient(circle at 20% 20%,#ffd34d,transparent 55%),radial-gradient(circle at 80% 30%,#ff4d8d,transparent 55%),radial-gradient(circle at 50% 90%,#6a5cff,transparent 60%),#18c4a7'],
['Buttons','Pill gradient','btn','background:linear-gradient(135deg,#6a5cff,#ff4d8d);color:#fff;border-radius:999px;box-shadow:0 10px 24px -6px rgba(106,92,255,.7)'],
['Buttons','Brutalist','btn','background:#ffd34d;color:#1b2240;border:2px solid #1b2240;border-radius:8px;box-shadow:4px 4px 0 #1b2240'],
['Buttons','Glow outline','btn','background:transparent;color:#ffb347;border:1px solid #ffb347;border-radius:12px;box-shadow:0 0 18px rgba(255,179,71,.5)','dark'],
['Buttons','Soft neumorphic','btn','background:#e0e5ec;color:#4a5170;border-radius:14px;box-shadow:6px 6px 12px #b8bec7,-6px -6px 12px #fff','neu'],
['Glass','Frosted card','card','background:rgba(255,255,255,.18);backdrop-filter:blur(14px) saturate(140%);-webkit-backdrop-filter:blur(14px) saturate(140%);border:1px solid rgba(255,255,255,.35);border-radius:20px','color'],
['Glass','Smoked glass','card','background:rgba(10,12,30,.35);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.18);border-radius:20px','color'],
['Shapes','Blob','card','background:linear-gradient(135deg,#4a5bdc,#8b9bff);border-radius:60% 40% 30% 70% / 60% 30% 70% 40%'],
['Shapes','Leaf','card','background:#18c4a7;border-radius:0 80% 0 80%'],
['Shapes','Squircle','card','background:linear-gradient(135deg,#ff9a3c,#e4457b);border-radius:34%'],
['Text','Gradient text','txt','background:linear-gradient(135deg,#ff9a3c,#e4457b,#6a5cff);-webkit-background-clip:text;background-clip:text;color:transparent'],
['Text','Long shadow','txt','color:#fff;text-shadow:1px 1px #6a5cff,2px 2px #6a5cff,3px 3px #6a5cff,4px 4px #6a5cff,5px 5px #6a5cff,6px 6px #6a5cff'],
['Text','Neon text','txt','color:#fff;text-shadow:0 0 8px #ff4d8d,0 0 24px #ff4d8d,0 0 48px #ff4d8d','dark'],
['Filters','Noir','photo','filter:grayscale(100%) contrast(125%) brightness(90%)'],
['Filters','Faded film','photo','filter:saturate(70%) contrast(90%) brightness(110%) sepia(20%)'],
['Filters','Vivid','photo','filter:saturate(160%) contrast(110%)'],
['Loaders','Spinner','raw','.__{width:48px;height:48px;border:5px solid rgba(74,91,220,.25);border-top-color:#4a5bdc;border-radius:50%;animation:__ .8s linear infinite}@keyframes __{to{transform:rotate(360deg)}}','','<div class="__"></div>'],
['Loaders','Bouncing dots','raw','.__{display:flex;gap:8px}.__ i{width:12px;height:12px;border-radius:50%;background:#4a5bdc;animation:__ .9s ease-in-out infinite}.__ i:nth-child(2){animation-delay:.15s}.__ i:nth-child(3){animation-delay:.3s}@keyframes __{0%,100%{transform:translateY(0);opacity:.5}50%{transform:translateY(-10px);opacity:1}}','','<div class="__"><i></i><i></i><i></i></div>'],
['Loaders','Pulse ring','raw','.__{width:20px;height:20px;border-radius:50%;background:#e4457b;animation:__ 1.4s ease-out infinite}@keyframes __{0%{box-shadow:0 0 0 0 rgba(228,69,123,.6)}100%{box-shadow:0 0 0 28px rgba(228,69,123,0)}}','','<div class="__"></div>'],
['Loaders','Skeleton shimmer','raw','.__{width:200px;height:90px;border-radius:12px;background:linear-gradient(90deg,#cfd5f3 25%,#e9ecfb 50%,#cfd5f3 75%);background-size:200% 100%;animation:__ 1.4s linear infinite}@keyframes __{to{background-position:-200% 0}}','','<div class="__"></div>'],
['Loaders','Progress bar','raw','.__{position:relative;width:200px;height:8px;border-radius:99px;background:rgba(74,91,220,.2);overflow:hidden}.__::after{content:"";position:absolute;inset:0;width:40%;border-radius:99px;background:#4a5bdc;animation:__ 1.2s ease-in-out infinite}@keyframes __{from{transform:translateX(-100%)}to{transform:translateX(250%)}}','','<div class="__"></div>'],
['Hover','Lift card','raw','.__{display:grid;place-items:center;width:160px;height:160px;border-radius:18px;background:#fff;color:#1b2240;font-weight:600;box-shadow:0 4px 12px rgba(27,34,64,.15);transition:transform .25s,box-shadow .25s}.__:hover{transform:translateY(-8px);box-shadow:0 22px 36px -10px rgba(27,34,64,.35)}','','<div class="__">Hover me</div>'],
['Hover','Underline link','raw','.__{position:relative;color:#1b2240;font-weight:600;font-size:1.2rem;cursor:pointer}.__::after{content:"";position:absolute;left:0;bottom:-4px;width:100%;height:2px;background:#4a5bdc;transform:scaleX(0);transform-origin:right;transition:transform .3s}.__:hover::after{transform:scaleX(1);transform-origin:left}','','<span class="__">Hover this link</span>'],
['Hover','Shine button','raw','.__{position:relative;overflow:hidden;padding:14px 30px;border:0;border-radius:12px;background:#4a5bdc;color:#fff;font-weight:600;font-size:1rem;cursor:pointer}.__::before{content:"";position:absolute;top:0;left:-80%;width:50%;height:100%;background:linear-gradient(120deg,transparent,rgba(255,255,255,.55),transparent);transform:skewX(-20deg);transition:left .6s}.__:hover::before{left:130%}','','<button class="__">Shine</button>'],
['Hover','3D press button','raw','.__{padding:14px 30px;border:0;border-radius:12px;background:#e4457b;color:#fff;font-weight:700;font-size:1rem;box-shadow:0 6px 0 #a02a58;cursor:pointer;transition:transform .1s,box-shadow .1s}.__:active{transform:translateY(5px);box-shadow:0 1px 0 #a02a58}','','<button class="__">Press me</button>'],
['Components','Toggle switch','raw','.__{position:relative;display:inline-block;width:56px;height:30px}.__ input{opacity:0;width:0;height:0}.__ span{position:absolute;inset:0;border-radius:99px;background:#aab1d6;cursor:pointer;transition:background .25s}.__ span::before{content:"";position:absolute;width:24px;height:24px;left:3px;top:3px;border-radius:50%;background:#fff;transition:transform .25s}.__ input:checked+span{background:#4a5bdc}.__ input:checked+span::before{transform:translateX(26px)}','','<label class="__"><input type="checkbox" checked><span></span></label>'],
['Components','Focus glow input','raw','.__{width:200px;max-width:100%;padding:12px 16px;border:2px solid #b7bee6;border-radius:12px;background:#fff;color:#1b2240;font-size:1rem;outline:0;transition:border-color .2s,box-shadow .2s}.__:focus{border-color:#4a5bdc;box-shadow:0 0 0 4px rgba(74,91,220,.25)}','','<input class="__" placeholder="Focus me">'],
['Components','Gradient badge','raw','.__{padding:4px 12px;border-radius:999px;background:linear-gradient(135deg,#ff9a3c,#e4457b);color:#fff;font-size:.85rem;font-weight:700}','','<span class="__">New</span>']

];
const BASE={card:'width:160px;height:160px;border-radius:18px',btn:'padding:14px 28px;border:0;font-weight:600;cursor:pointer',txt:'font-size:3rem;font-weight:800',photo:''};
const slug=n=>{const s=n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');return /^\d/.test(s)?'x-'+s:s};
const join=(k,css)=>[BASE[k],css].filter(Boolean).join(';');
const splitTop=v=>{const o=[];let d=0,s='';for(const ch of v){if(ch==='(')d++;if(ch===')')d--;if(ch===','&&!d){o.push(s.trim());s=''}else s+=ch}o.push(s.trim());return o};
const fmt=x=>{const i=x.indexOf(':'),p=x.slice(0,i).trim(),v=x.slice(i+1).trim(),parts=splitTop(v);return parts.length>1&&/^(box-shadow|text-shadow|background)$/.test(p)?`  ${p}:\n${parts.map(q=>'    '+q).join(',\n')};`:`  ${p}: ${v};`};
const codeDecl=d=>`.${slug(d[1])} {\n${join(d[2],d[3]).split(';').map(x=>x.trim()).filter(Boolean).map(fmt).join('\n')}\n}`;
const sg=d=>slug(d[1]),raw=d=>d[3].replace(/__/g,sg(d));
function pretty(s){let o='',d=0,pad=()=>'  '.repeat(d);for(const ch of s){if(ch==='{'){d++;o+=' {\n'+pad()}else if(ch==='}'){d--;o=o.trimEnd()+'\n'+pad()+'}\n'+pad()}else if(ch===';'){o+=';\n'+pad()}else o+=ch}return o.replace(/[ ]+\n/g,'\n').replace(/^(\s+[\w-]+):(?=\S)/gm,'$1: ').replace(/([^;{}\s])\n(\s*)\}/g,'$1;\n$2}').replace(/\}\n(?=[.@])/g,'}\n\n').trim()}
const code=d=>d[2]==='raw'?`/* HTML: ${d[5].replace(/__/g,sg(d))} */\n\n${pretty(raw(d))}`:codeDecl(d);
{const rs=document.createElement('style');rs.textContent=D.filter(d=>d[2]==='raw').map(raw).join('\n');document.head.append(rs)}
async function copy(t,name){
 try{await navigator.clipboard.writeText(t)}catch(e){const a=document.createElement('textarea');a.value=t;document.body.append(a);a.select();try{document.execCommand('copy')}catch(_){}a.remove()}
 $('#live').textContent='Copied '+name;
}
function el(t,c,x){const e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;return e}
function mkPv(d){if(d[2]==='raw'){const t=document.createElement('div');t.innerHTML=d[5].replace(/__/g,sg(d));return t.firstElementChild}const k=d[2],pv=el(k==='btn'?'button':'div','k-'+k,k==='btn'?'Button':k==='txt'?'Design':'');pv.setAttribute('style',join(k,d[3]));if(k==='btn')pv.tabIndex=-1;return pv}
let cur=null,lastBtn=null;
function openDrawer(d,from){cur=d;lastBtn=from;$('#dtitle').textContent=d[1];$('#dcat').textContent=d[0];
 $('#dstage').className='tstage big '+(d[4]||'');$('#dpv').replaceChildren(mkPv(d));
 $('#dcode').value=code(d);const s0=$('#dlive');if(s0)s0.remove();document.body.style.overflow='hidden';$('#scrim').hidden=false;$('#drawer').hidden=false;$('#dcode').focus()}
function closeDrawer(){const s=$('#dlive');if(s)s.remove();document.body.style.overflow='';$('#scrim').hidden=true;$('#drawer').hidden=true;if(lastBtn)lastBtn.focus()}
function applyEdit(){const t=$('#dcode').value;
 if(cur[2]==='raw'){let s=$('#dlive');if(!s){s=document.createElement('style');s.id='dlive';document.head.append(s)}s.textContent=t.replace(/\/\*[\s\S]*?\*\//g,'').replace(new RegExp('\\.'+sg(cur)+'(?![\\w-])','g'),'#dstage .'+sg(cur));return}
 const m=t.match(/\{([\s\S]*)\}/);$('#dpv').firstChild.setAttribute('style',(m?m[1]:t).replace(/\n/g,' '))}
function flash(b){b.textContent='Copied';b.classList.add('done');setTimeout(()=>{b.textContent='Copy CSS';b.classList.remove('done')},1400)}
function tile(d){
 const [cat,n,k,css,st]=d,t=el('article','tile'),stage=el('div','tstage '+(st||'')+(d[2]==='raw'?' live':'')),meta=el('div','meta'),nm=el('div'),acts=el('div','acts');
 stage.append(mkPv(d));nm.append(el('b',0,n),el('small',0,cat));
 const ed=el('button','chip','Edit'),cp=el('button','btn','Copy CSS');ed.type=cp.type='button';
 ed.onclick=()=>openDrawer(d,ed);if(d[2]!=='raw')stage.onclick=()=>openDrawer(d,ed);
 cp.onclick=()=>{copy(code(d),n);flash(cp)};
 acts.append(ed,cp);meta.append(nm,acts);t.append(stage,meta);return t;
}
$('#dcode').addEventListener('input',applyEdit);
$('#dclose').onclick=closeDrawer;$('#scrim').onclick=closeDrawer;
$('#dreset').onclick=()=>{$('#dcode').value=code(cur);applyEdit()};
$('#dcopy').onclick=()=>{copy($('#dcode').value,cur[1]);flash($('#dcopy'))};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#drawer').hidden)closeDrawer()});
let cat='All';
function render(){
 const g=$('#gallery'),q=$('#q').value.trim().toLowerCase(),l=D.filter(d=>(cat==='All'||d[0]===cat)&&(!q||(d[1]+' '+d[0]).toLowerCase().includes(q)));g.replaceChildren(...l.map(tile));$('#empty').hidden=!!l.length;
 document.querySelectorAll('#filters .chip').forEach(c=>c.setAttribute('aria-pressed',c.dataset.c===cat));
}
['All',...new Set(D.map(d=>d[0]))].forEach(c=>{const b=el('button','chip',c);b.dataset.c=c;b.append(el('span','n',String(c==='All'?D.length:D.filter(d=>d[0]===c).length)));b.type='button';b.onclick=()=>{cat=c;render()};$('#filters').append(b)});
$('#lead').textContent=`${D.length} ready-made designs and ${TOOLS.reduce((a,t)=>a+t[1].length,0)} generators for shadows, gradients, layout, type and motion. Everything is plain CSS you can paste straight into your project.`;
TOOLS.forEach(t=>{const c=el('div','tgroup'),l=el('div','tlinks');c.append(el('b',0,t[0]));t[1].forEach(x=>{const a=el('a','chip',x[1]);a.href='studio.html#'+x[0];l.append(a)});c.append(l);$('#tgrid').append(c)});
document.addEventListener('pointermove',e=>{const s=e.target.closest('.tstage');if(!s)return;const r=s.getBoundingClientRect();s.style.setProperty('--lx',e.clientX-r.left+'px');s.style.setProperty('--ly',e.clientY-r.top+'px')});
$('#q').addEventListener('input',render);
render();
document.addEventListener('keydown',e=>{if(e.key==='/'&&!/INPUT|TEXTAREA/.test(document.activeElement.tagName)){e.preventDefault();$('#q').focus()}});
