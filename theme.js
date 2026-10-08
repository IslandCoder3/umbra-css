(function(){
var f=document.createElement('link');f.rel='stylesheet';f.href='https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap';document.head.appendChild(f);
var r=document.documentElement,K='umbra-theme',m=window.matchMedia?matchMedia('(prefers-color-scheme: dark)'):{matches:false};
function get(){try{return localStorage.getItem(K)}catch(e){return null}}
function apply(t){r.dataset.theme=t;var b=document.getElementById('theme');if(b){b.setAttribute('aria-checked',t==='dark');b.title=t==='dark'?'Dark mode on. Switch to light':'Light mode on. Switch to dark'}}
apply(get()||(m.matches?'dark':'light'));
document.addEventListener('DOMContentLoaded',function(){apply(r.dataset.theme);var b=document.getElementById('theme');if(b)b.addEventListener('click',function(){var t=r.dataset.theme==='dark'?'light':'dark';apply(t);try{localStorage.setItem(K,t)}catch(e){}})});
if(m.addEventListener)m.addEventListener('change',function(e){if(!get())apply(e.matches?'dark':'light')});

function toTop(){var r=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;window.scrollTo({top:0,behavior:r?'auto':'smooth'})}
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('[data-top]');if(a){e.preventDefault();toTop()}});
document.addEventListener('DOMContentLoaded',function(){
 var b=document.createElement('button');b.className='fab';b.type='button';b.setAttribute('aria-label','Back to top');b.setAttribute('data-top','');
 b.innerHTML='<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
 document.body.appendChild(b);var q=0;
 function chk(){q=0;var s=window.scrollY,end=document.documentElement.scrollHeight-window.innerHeight-220;b.classList.toggle('show',s>600&&s<end)}
 addEventListener('scroll',function(){if(!q)q=requestAnimationFrame(chk)},{passive:true});chk();
});
})();
