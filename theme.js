(function(){
var f=document.createElement('link');f.rel='stylesheet';f.href='https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap';document.head.appendChild(f);
var r=document.documentElement,K='umbra-theme',m=window.matchMedia?matchMedia('(prefers-color-scheme: dark)'):{matches:false};
function get(){try{return localStorage.getItem(K)}catch(e){return null}}
function apply(t){r.dataset.theme=t;var b=document.getElementById('theme');if(b){b.setAttribute('aria-checked',t==='dark');b.title=t==='dark'?'Dark mode on. Switch to light':'Light mode on. Switch to dark'}}
apply(get()||(m.matches?'dark':'light'));
document.addEventListener('DOMContentLoaded',function(){apply(r.dataset.theme);var b=document.getElementById('theme');if(b)b.addEventListener('click',function(){var t=r.dataset.theme==='dark'?'light':'dark';apply(t);try{localStorage.setItem(K,t)}catch(e){}})});
if(m.addEventListener)m.addEventListener('change',function(e){if(!get())apply(e.matches?'dark':'light')});
})();
