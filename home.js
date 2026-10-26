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
,
['Shadows','Colored glow','card','background:#fff;box-shadow:0 16px 40px -10px rgba(106,92,255,.6)'],
['Shadows','Double ring','card','background:#fff;box-shadow:0 0 0 4px #fff,0 0 0 8px #6a5cff'],
['Shadows','Inner glow','card','background:#1b2240;box-shadow:inset 0 0 30px rgba(139,155,255,.65)'],
['Shadows','Stacked paper','card','background:#fff;box-shadow:0 1px 1px rgba(0,0,0,.15),0 10px 0 -5px #fff,0 10px 1px -4px rgba(0,0,0,.15),0 20px 0 -10px #fff,0 20px 1px -9px rgba(0,0,0,.15)'],
['Gradients','Ocean','card','background:linear-gradient(160deg,#0f2027,#2c5364 50%,#38b6c4)'],
['Gradients','Peach','card','background:linear-gradient(135deg,#ffecd2,#fcb69f)'],
['Gradients','Midnight','card','background:linear-gradient(135deg,#232526,#414345)'],
['Gradients','Spotlight','card','background:radial-gradient(circle at 30% 30%,#fff,#8b9bff 50%,#4a5bdc)'],
['Gradients','Conic sweep','card','background:conic-gradient(from 90deg,#4a5bdc,#e4457b,#ffd34d,#4a5bdc)'],
['Backgrounds','Dot grid','card','background:radial-gradient(#4a5bdc 1.5px,transparent 1.5px) 0 0/16px 16px,#eef0ff'],
['Backgrounds','Grid lines','card','background:linear-gradient(rgba(74,91,220,.25) 1px,transparent 1px) 0 0/20px 20px,linear-gradient(90deg,rgba(74,91,220,.25) 1px,transparent 1px) 0 0/20px 20px,#fff'],
['Backgrounds','Checkerboard','card','background:conic-gradient(#4a5bdc 25%,#e8ebff 0 50%,#4a5bdc 0 75%,#e8ebff 0) 0 0/32px 32px'],
['Backgrounds','Stripes','card','background:repeating-linear-gradient(45deg,#4a5bdc 0 12px,#6f7fe8 12px 24px)'],
['Backgrounds','Zigzag','card','background:linear-gradient(135deg,#e8ebff 25%,transparent 25%) -16px 0/32px 32px,linear-gradient(225deg,#e8ebff 25%,transparent 25%) -16px 0/32px 32px,linear-gradient(315deg,#e8ebff 25%,transparent 25%) 0 0/32px 32px,linear-gradient(45deg,#e8ebff 25%,transparent 25%) 0 0/32px 32px,#4a5bdc'],
['Backgrounds','Sunburst','card','background:repeating-conic-gradient(#ffd34d 0 15deg,#ff9a3c 0 30deg)'],
['Buttons','Soft pill','btn','background:#e8ebff;color:#4a5bdc;border-radius:999px'],
['Buttons','Gradient outline','btn','background:linear-gradient(#fff,#fff) padding-box,linear-gradient(135deg,#ff9a3c,#e4457b,#6a5cff) border-box;border:2px solid transparent;color:#1b2240;border-radius:12px'],
['Buttons','Dark button','btn','background:#1b2240;color:#fff;border-radius:10px;box-shadow:inset 0 1px 0 rgba(255,255,255,.25),0 8px 18px -8px rgba(0,0,0,.6)'],
['Buttons','Danger','btn','background:#e5484d;color:#fff;border-radius:8px;box-shadow:0 8px 18px -8px rgba(229,72,77,.7)'],
['Buttons','Glass button','btn','background:rgba(255,255,255,.2);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);color:#fff;border:1px solid rgba(255,255,255,.5);border-radius:12px','color'],
['Text','Outline text','txt','color:transparent;-webkit-text-stroke:2px #1b2240'],
['Text','Emboss','txt','color:#cfd5f3;text-shadow:1px 1px 1px #fff,-1px -1px 1px rgba(27,34,64,.35)'],
['Text','Marker highlight','txt','color:#1b2240;background:linear-gradient(transparent 60%,#ffd34d 60%)'],
['Shapes','Ring','card','background:transparent;border:14px solid #4a5bdc;border-radius:50%'],
['Shapes','Hexagon','card','background:linear-gradient(135deg,#4a5bdc,#e4457b);clip-path:polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%)'],
['Shapes','Star','card','background:linear-gradient(135deg,#ffd34d,#ff9a3c);clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)'],
['Shapes','Triangle','card','background:linear-gradient(135deg,#18c4a7,#4a5bdc);clip-path:polygon(50% 0%,0% 100%,100% 100%)'],
['Shapes','Arrow','card','background:linear-gradient(135deg,#ff9a3c,#e4457b);clip-path:polygon(0% 20%,60% 20%,60% 0%,100% 50%,60% 100%,60% 80%,0% 80%)'],
['Filters','Sepia','photo','filter:sepia(90%) contrast(105%)'],
['Filters','Cool tone','photo','filter:hue-rotate(180deg) saturate(120%)'],
['Filters','Soft blur','photo','filter:blur(3px) brightness(105%)'],
['Loaders','Equalizer','raw','.__{display:flex;align-items:flex-end;gap:5px;height:40px}.__ i{width:7px;height:100%;border-radius:4px;background:#4a5bdc;transform-origin:bottom;animation:__ 1s ease-in-out infinite}.__ i:nth-child(2){animation-delay:.15s}.__ i:nth-child(3){animation-delay:.3s}.__ i:nth-child(4){animation-delay:.45s}@keyframes __{0%,100%{transform:scaleY(.25)}50%{transform:scaleY(1)}}','','<div class="__"><i></i><i></i><i></i><i></i></div>'],
['Loaders','Orbit','raw','.__{position:relative;width:56px;height:56px;border:2px dashed rgba(74,91,220,.35);border-radius:50%;animation:__ 2s linear infinite}.__::after{content:"";position:absolute;top:-7px;left:50%;margin-left:-6px;width:12px;height:12px;border-radius:50%;background:#e4457b}@keyframes __{to{transform:rotate(360deg)}}','','<div class="__"></div>'],
['Loaders','Dual ring','raw','.__{width:48px;height:48px;border-radius:50%;border:5px solid transparent;border-top-color:#4a5bdc;border-bottom-color:#e4457b;animation:__ 1s linear infinite}@keyframes __{to{transform:rotate(360deg)}}','','<div class="__"></div>'],
['Hover','Tilt card','raw','.__{display:grid;place-items:center;width:160px;height:160px;border-radius:18px;background:linear-gradient(135deg,#4a5bdc,#8b9bff);color:#fff;font-weight:700;transition:transform .3s}.__:hover{transform:perspective(600px) rotateX(10deg) rotateY(-14deg) scale(1.04)}','','<div class="__">Tilt me</div>'],
['Hover','Fill slide button','raw','.__{padding:14px 30px;border:2px solid #4a5bdc;border-radius:12px;background:linear-gradient(#4a5bdc,#4a5bdc) no-repeat left center/0% 100%;color:#4a5bdc;font-weight:700;font-size:1rem;cursor:pointer;transition:background-size .3s,color .3s}.__:hover{background-size:100% 100%;color:#fff}','','<button class="__">Fill</button>'],
['Hover','Gradient shift button','raw','.__{padding:14px 30px;border:0;border-radius:12px;color:#fff;font-weight:700;font-size:1rem;cursor:pointer;background:linear-gradient(90deg,#6a5cff,#ff4d8d,#6a5cff) 0 0/200% 100%;transition:background-position .5s}.__:hover{background-position:100% 0}','','<button class="__">Shift</button>'],
['Hover','Wiggle button','raw','.__{padding:14px 30px;border:0;border-radius:12px;background:#18c4a7;color:#fff;font-weight:700;font-size:1rem;cursor:pointer}.__:hover{animation:__ .5s}@keyframes __{25%{transform:rotate(-6deg)}50%{transform:rotate(6deg)}75%{transform:rotate(-3deg)}}','','<button class="__">Wiggle</button>'],
['Components','Tooltip','raw','.__{position:relative;padding:10px 18px;border-radius:10px;background:#fff;color:#1b2240;font-weight:600;cursor:pointer}.__::after{content:attr(data-tip);position:absolute;bottom:calc(100% + 8px);left:50%;transform:translate(-50%,4px);padding:5px 10px;border-radius:8px;background:#1b2240;color:#fff;font-size:.8rem;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .2s,transform .2s}.__:hover::after{opacity:1;transform:translate(-50%,0)}','','<span class="__" data-tip="Copied!">Hover me</span>'],
['Components','Alert banner','raw','.__{display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:12px;border:1px solid #9be3b5;background:#e8fbef;color:#14683a;font-weight:600}.__::before{content:"";width:10px;height:10px;border-radius:50%;background:#2ecc71}','','<div class="__">Saved successfully</div>'],
['Components','Avatar stack','raw','.__{display:flex}.__ i{display:grid;place-items:center;width:42px;height:42px;margin-left:-12px;border-radius:50%;border:3px solid #fff;background:#4a5bdc;color:#fff;font-size:.8rem;font-weight:700;font-style:normal}.__ i:first-child{margin-left:0}.__ i:nth-child(2){background:#e4457b}.__ i:nth-child(3){background:#18c4a7}.__ i:nth-child(4){background:#1b2240}','','<div class="__"><i>A</i><i>B</i><i>C</i><i>+4</i></div>'],
['Components','Tag chip','raw','.__{display:inline-block;padding:5px 12px;border-radius:8px;background:#e8ebff;color:#4a5bdc;font-weight:600;font-size:.85rem;cursor:pointer}.__:hover{background:#4a5bdc;color:#fff}','','<span class="__">design</span>'],
['Components','Custom checkbox','raw','.__{display:flex;align-items:center;gap:10px;color:#1b2240;font-weight:600;cursor:pointer}.__ input{position:absolute;opacity:0}.__ span{display:grid;place-items:center;width:22px;height:22px;border-radius:6px;border:2px solid #aab1d6;background:#fff;transition:background .2s,border-color .2s}.__ span::after{content:"";width:6px;height:11px;border:solid #fff;border-width:0 2px 2px 0;transform:rotate(45deg) scale(0);transition:transform .2s}.__ input:checked+span{background:#4a5bdc;border-color:#4a5bdc}.__ input:checked+span::after{transform:rotate(45deg) scale(1)}','','<label class="__"><input type="checkbox" checked><span></span>Accept terms</label>'],
['Cards','Profile card','raw','.__{display:grid;justify-items:center;gap:4px;width:170px;padding:20px;border-radius:20px;background:#fff;color:#1b2240;box-shadow:0 14px 30px -12px rgba(27,34,64,.35)}.__ i{width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#ff9a3c,#e4457b);margin-bottom:6px}.__ span{color:#5b6890;font-size:.85rem}','','<div class="__"><i></i><b>Ava Reyes</b><span>Front-end dev</span></div>'],
['Cards','Stat card','raw','.__{display:grid;gap:2px;width:170px;padding:18px;border-radius:18px;background:#1b2240;color:#fff}.__ span{color:#9aa2cc;font-size:.8rem}.__ b{font-size:1.9rem;letter-spacing:-.03em}.__ em{font-style:normal;color:#5ee0a0;font-size:.85rem;font-weight:600}','','<div class="__"><span>Revenue</span><b>$12.4k</b><em>+8.2%</em></div>'],
['Cards','Pricing card','raw','.__{display:grid;gap:8px;width:170px;padding:20px;border-radius:20px;background:#fff;color:#1b2240;border:2px solid #4a5bdc;text-align:center}.__ span{font-weight:700;color:#4a5bdc}.__ b{font-size:2rem}.__ small{font-size:.8rem;color:#5b6890;font-weight:500}.__ button{padding:9px;border:0;border-radius:10px;background:#4a5bdc;color:#fff;font-weight:600;cursor:pointer}','','<div class="__"><span>Pro</span><b>$12<small>/mo</small></b><button>Choose</button></div>'],
['Shadows','Long shadow card','card','background:#ffd34d;box-shadow:1px 1px #e0a800,2px 2px #e0a800,3px 3px #e0a800,4px 4px #e0a800,5px 5px #e0a800,6px 6px #e0a800,7px 7px #e0a800,8px 8px #e0a800,9px 9px #e0a800,10px 10px #e0a800'],
['Shadows','Soft ambient','card','background:#fff;box-shadow:0 2px 4px rgba(27,34,64,.06),0 8px 16px rgba(27,34,64,.08),0 24px 48px rgba(27,34,64,.1)'],
['Shadows','Dual tone','card','background:#fff;box-shadow:-10px 10px 30px rgba(255,77,141,.35),10px -10px 30px rgba(106,92,255,.35)'],
['Shadows','Raised border','card','background:#fff;border:2px solid #1b2240;box-shadow:0 6px 0 #1b2240'],
['Gradients','Sunrise','card','background:linear-gradient(180deg,#fceabb,#f8b500)'],
['Gradients','Forest','card','background:linear-gradient(135deg,#134e5e,#71b280)'],
['Gradients','Candy','card','background:linear-gradient(135deg,#ff9ff3,#feca57)'],
['Gradients','Steel','card','background:linear-gradient(135deg,#bdc3c7,#2c3e50)'],
['Backgrounds','Polka dots','card','background:radial-gradient(#ff4d8d 20%,transparent 21%) 0 0/24px 24px,radial-gradient(#ff4d8d 20%,transparent 21%) 12px 12px/24px 24px,#fff0f6'],
['Backgrounds','Blueprint','card','background:linear-gradient(rgba(255,255,255,.18) 1px,transparent 1px) 0 0/16px 16px,linear-gradient(90deg,rgba(255,255,255,.18) 1px,transparent 1px) 0 0/16px 16px,#1d4ed8'],
['Backgrounds','Diagonal hatch','card','background:repeating-linear-gradient(45deg,#cfd5f3 0 2px,#fff 2px 10px)'],
['Backgrounds','Rainbow stripes','card','background:repeating-linear-gradient(90deg,#ff4d8d 0 20px,#ffd34d 20px 40px,#18c4a7 40px 60px,#6a5cff 60px 80px)'],
['Buttons','Neon pink','btn','background:transparent;color:#ff4d8d;border:2px solid #ff4d8d;border-radius:10px;box-shadow:0 0 14px #ff4d8d,inset 0 0 14px rgba(255,77,141,.4)','dark'],
['Buttons','Ghost','btn','background:transparent;color:#4a5bdc;border:2px solid #4a5bdc;border-radius:12px'],
['Buttons','Soft shadow button','btn','background:#fff;color:#1b2240;border-radius:14px;box-shadow:0 8px 20px -6px rgba(27,34,64,.35)'],
['Buttons','Graphite pill','btn','background:linear-gradient(135deg,#232526,#414345);color:#fff;border-radius:999px'],
['Glass','Blue tinted glass','card','background:rgba(74,91,220,.25);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.4);border-radius:22px','color'],
['Glass','Glass pill','btn','background:rgba(255,255,255,.25);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);color:#fff;border:1px solid rgba(255,255,255,.5);border-radius:999px','color'],
['Shapes','Octagon','card','background:linear-gradient(135deg,#6a5cff,#18c4a7);clip-path:polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)'],
['Shapes','Chevron','card','background:linear-gradient(135deg,#ff9a3c,#e4457b);clip-path:polygon(0% 0%,75% 0%,100% 50%,75% 100%,0% 100%,25% 50%)'],
['Shapes','Cross','card','background:linear-gradient(135deg,#4a5bdc,#8b9bff);clip-path:polygon(35% 0%,65% 0%,65% 35%,100% 35%,100% 65%,65% 65%,65% 100%,35% 100%,35% 65%,0% 65%,0% 35%,35% 35%)'],
['Text','Retro 3D text','txt','color:#ffd34d;text-shadow:1px 1px #e4457b,2px 2px #e4457b,3px 3px #e4457b,4px 4px #6a5cff,5px 5px #6a5cff,6px 6px #6a5cff'],
['Text','Soft shadow text','txt','color:#1b2240;text-shadow:0 4px 12px rgba(27,34,64,.35)'],
['Text','Underline highlight','txt','color:#1b2240;background:linear-gradient(#ff4d8d,#ff4d8d) 0 100%/100% 6px no-repeat'],
['Filters','High contrast','photo','filter:grayscale(100%) contrast(180%)'],
['Filters','Warm','photo','filter:sepia(35%) saturate(130%) hue-rotate(-10deg)'],
['Filters','Dreamy','photo','filter:blur(1px) brightness(115%) saturate(125%)'],
['Loaders','Typing indicator','raw','.__{display:flex;gap:5px;padding:12px 16px;border-radius:18px;background:#fff}.__ i{width:8px;height:8px;border-radius:50%;background:#9aa2cc;animation:__ 1.2s infinite}.__ i:nth-child(2){animation-delay:.2s}.__ i:nth-child(3){animation-delay:.4s}@keyframes __{0%,60%,100%{opacity:.35;transform:translateY(0)}30%{opacity:1;transform:translateY(-4px)}}','','<div class="__"><i></i><i></i><i></i></div>'],
['Loaders','Ripple','raw','.__{position:relative;width:48px;height:48px}.__::before,.__::after{content:"";position:absolute;inset:0;border:3px solid #4a5bdc;border-radius:50%;animation:__ 1.6s ease-out infinite}.__::after{animation-delay:.8s}@keyframes __{from{transform:scale(.2);opacity:1}to{transform:scale(1);opacity:0}}','','<div class="__"></div>'],
['Loaders','Bar spinner','raw','.__{position:relative;width:44px;height:44px}.__ i{position:absolute;left:50%;top:0;width:4px;height:12px;margin-left:-2px;border-radius:2px;background:#4a5bdc;transform-origin:50% 22px;transform:rotate(var(--r));animation:__ 1s linear infinite;animation-delay:var(--d)}@keyframes __{from{opacity:1}to{opacity:.15}}','','<div class="__"><i style="--r:0deg;--d:-1.0s"></i><i style="--r:45deg;--d:-0.875s"></i><i style="--r:90deg;--d:-0.75s"></i><i style="--r:135deg;--d:-0.625s"></i><i style="--r:180deg;--d:-0.5s"></i><i style="--r:225deg;--d:-0.375s"></i><i style="--r:270deg;--d:-0.25s"></i><i style="--r:315deg;--d:-0.125s"></i></div>'],
['Loaders','Flip square','raw','.__{width:36px;height:36px;border-radius:6px;background:#e4457b;animation:__ 1.2s ease-in-out infinite}@keyframes __{0%{transform:perspective(120px) rotateX(0) rotateY(0)}50%{transform:perspective(120px) rotateX(-180deg) rotateY(0)}100%{transform:perspective(120px) rotateX(-180deg) rotateY(-180deg)}}','','<div class="__"></div>'],
['Hover','Card flip','raw','.__{position:relative;width:150px;height:100px;perspective:600px}.__ i,.__ b{position:absolute;inset:0;display:grid;place-items:center;border-radius:14px;font-weight:700;font-style:normal;backface-visibility:hidden;-webkit-backface-visibility:hidden;transition:transform .5s}.__ i{background:#4a5bdc;color:#fff}.__ b{background:#ffd34d;color:#1b2240;transform:rotateY(180deg)}.__:hover i{transform:rotateY(180deg)}.__:hover b{transform:rotateY(360deg)}','','<div class="__"><i>Front</i><b>Back</b></div>'],
['Hover','Image zoom card','raw','.__{position:relative;overflow:hidden;width:170px;height:115px;border-radius:14px;cursor:pointer}.__ i,.__ img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .6s ease}.__ i{position:relative;background:radial-gradient(circle at 72% 28%,#ffe9a8 0 13%,transparent 14%),linear-gradient(180deg,#ff9a3c,#e4457b 60%,#3a4fd8)}.__ i::after{content:"";position:absolute;left:0;right:0;bottom:0;height:42%;background:#1d6b5a;clip-path:polygon(0 60%,28% 20%,52% 55%,76% 10%,100% 50%,100% 100%,0 100%)}.__ span{position:absolute;left:0;right:0;bottom:0;padding:8px 12px;color:#fff;font-weight:600;font-size:.85rem;background:linear-gradient(transparent,rgba(0,0,0,.6));transform:translateY(100%);transition:transform .35s}.__:hover i,.__:hover img{transform:scale(1.25)}.__:hover span{transform:translateY(0)}','','<div class="__"><i></i><span>Zoom effect</span></div>'],
['Hover','Slide arrow link','raw','.__{display:inline-flex;align-items:center;gap:6px;color:#4a5bdc;font-weight:700;cursor:pointer}.__ i{font-style:normal;transition:transform .25s}.__:hover i{transform:translateX(6px)}','','<span class="__">Read more <i>&rarr;</i></span>'],
['Hover','Border draw button','raw','.__{position:relative;padding:14px 30px;border:0;background:none;color:#1b2240;font-weight:700;font-size:1rem;cursor:pointer;box-shadow:inset 0 0 0 2px rgba(27,34,64,.2)}.__::before{content:"";position:absolute;inset:0;border:2px solid #4a5bdc;clip-path:inset(0 100% 100% 0);transition:clip-path .4s}.__:hover::before{clip-path:inset(0)}','','<button class="__">Draw</button>'],
['Components','Breadcrumb','raw','.__{display:flex;font-size:.9rem;color:#5b6890}.__ span+span::before{content:"/";margin:0 8px;opacity:.5}.__ span:last-child{color:#1b2240;font-weight:700}','','<nav class="__"><span>Home</span><span>Docs</span><span>Tools</span></nav>'],
['Components','Pill tabs','raw','.__{display:inline-flex;padding:4px;border-radius:999px;background:#e8ebff;gap:2px}.__ b,.__ span{padding:8px 16px;border-radius:999px;font-weight:600;font-size:.9rem;color:#5b6890;cursor:pointer}.__ b{background:#fff;color:#1b2240;box-shadow:0 2px 6px rgba(27,34,64,.15)}','','<div class="__"><b>Design</b><span>Code</span><span>Docs</span></div>'],
['Components','Notification dot','raw','.__{position:relative;width:46px;height:46px;border-radius:50%;background:#e8ebff}.__::before{content:"";position:absolute;inset:12px;border-radius:50%;background:#4a5bdc}.__ i{position:absolute;top:2px;right:2px;width:14px;height:14px;border-radius:50%;background:#e5484d;border:2px solid #fff}','','<div class="__"><i></i></div>'],
['Components','Progress steps','raw','.__{display:flex;gap:6px}.__ i{width:42px;height:6px;border-radius:3px;background:#cfd5f3}.__ i:nth-child(-n+2){background:#4a5bdc}','','<div class="__"><i></i><i></i><i></i><i></i></div>'],
['Cards','Testimonial card','raw','.__{width:200px;padding:18px;border-radius:18px;background:#fff;color:#1b2240;box-shadow:0 14px 30px -12px rgba(27,34,64,.35)}.__ p{margin:0 0 10px;font-size:.95rem;line-height:1.4}.__ b{font-size:.8rem;color:#5b6890}','','<div class="__"><p>Saved me hours of tweaking.</p><b>Mia, designer</b></div>'],
['Cards','Feature card','raw','.__{display:grid;gap:4px;width:170px;padding:18px;border-radius:18px;background:#1b2240;color:#fff}.__ i{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#ff9a3c,#e4457b);margin-bottom:6px}.__ span{color:#9aa2cc;font-size:.85rem}','','<div class="__"><i></i><b>Fast</b><span>No build step</span></div>'],
['Cards','Gradient border card','raw','.__{display:grid;place-items:center;width:150px;height:100px;border-radius:16px;color:#1b2240;font-weight:700;border:3px solid transparent;background:linear-gradient(#fff,#fff) padding-box,linear-gradient(135deg,#ff9a3c,#e4457b,#6a5cff) border-box}','','<div class="__">Glow</div>']
];
const ORDER=['Shadows','Gradients','Backgrounds','Buttons','Cards','Glass','Shapes','Text','Filters','Loaders','Hover','Components'];D.sort((a,b)=>ORDER.indexOf(a[0])-ORDER.indexOf(b[0]));
const BASE={card:'width:160px;height:160px;border-radius:18px',btn:'padding:14px 28px;border:0;font-weight:600;cursor:pointer',txt:'font-size:3rem;font-weight:800',photo:''};
const slug=n=>{const s=n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');return /^\d/.test(s)?'x-'+s:s};
const join=(k,css)=>[BASE[k],css].filter(Boolean).join(';');
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
function studioLink(){const a=$('#dstudio');let r=null;
 if(cur&&cur[2]!=='raw'){const p=declsOf($('#dcode').value);for(const t of BYCAT[cur[0]]||BYCAT.x){const st=MAP[t](p,cur[4]);if(st){r=[t,st];break}}}
 a.hidden=!r;if(r){a.href='studio.html#'+r[0]+':'+encodeURIComponent(JSON.stringify(r[1]));a.textContent='Open in '+TOOLS.flatMap(x=>x[1]).find(t=>t[0]===r[0])[1]}}
function mkPv(d){if(d[2]==='raw'){const t=document.createElement('div');t.innerHTML=d[5].replace(/__/g,sg(d));return t.firstElementChild}const k=d[2],pv=el(k==='btn'?'button':'div','k-'+k,k==='btn'?'Button':k==='txt'?'Design':'');pv.setAttribute('style',join(k,d[3]));if(k==='btn')pv.tabIndex=-1;return pv}
let cur=null,lastBtn=null;
function openDrawer(d,from){cur=d;lastBtn=from;$('#dtitle').textContent=d[1];$('#dcat').textContent=d[0];
 $('#dstage').className='tstage big '+(d[4]||'');$('#dpv').replaceChildren(mkPv(d));
 $('#dcode').value=code(d);const s0=$('#dlive');if(s0)s0.remove();document.body.style.overflow='hidden';$('#scrim').hidden=false;$('#drawer').hidden=false;studioLink();favSync();try{history.replaceState(null,'','#'+slug(d[1]))}catch(e){}$('#dcode').focus()}
function closeDrawer(){try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}const s=$('#dlive');if(s)s.remove();document.body.style.overflow='';$('#scrim').hidden=true;$('#drawer').hidden=true;if(lastBtn)lastBtn.focus()}
function applyEdit(){const t=$('#dcode').value;
 if(cur[2]==='raw'){let s=$('#dlive');if(!s){s=document.createElement('style');s.id='dlive';document.head.append(s)}s.textContent=t.replace(/\/\*[\s\S]*?\*\//g,'').replace(new RegExp('\\.'+sg(cur)+'(?![\\w-])','g'),'#dstage .'+sg(cur));return}
 const m=t.match(/\{([\s\S]*)\}/);$('#dpv').firstChild.setAttribute('style',(m?m[1]:t).replace(/\n/g,' '))}
function flash(b){b.textContent='Copied';b.classList.add('done');setTimeout(()=>{b.textContent='Copy CSS';b.classList.remove('done')},1400)}
function tile(d){
 const [cat,n,k,css,st]=d,t=el('article','tile'),stage=el('div','tstage '+(st||'')+(d[2]==='raw'?' live':'')),meta=el('div','meta'),nm=el('div'),acts=el('div','acts');
 stage.append(mkPv(d));const fv=el('button','fav');fv.type='button';fv.dataset.s=slug(n);fv.setAttribute('aria-label','Save '+n+' to favorites');fv.innerHTML=HEART;fv.onclick=e=>{e.stopPropagation();toggleFav(d)};stage.append(fv);nm.append(el('b',0,n),el('small',0,cat));
 const ed=el('button','chip','Edit'),cp=el('button','btn','Copy CSS');ed.type=cp.type='button';
 ed.onclick=()=>openDrawer(d,ed);if(d[2]!=='raw')stage.onclick=()=>openDrawer(d,ed);
 cp.onclick=()=>{copy(code(d),n);flash(cp)};
 acts.append(ed,cp);meta.append(nm,acts);t.append(stage,meta);return t;
}
$('#dcode').addEventListener('input',()=>{applyEdit();studioLink()});
$('#dclose').onclick=closeDrawer;$('#scrim').onclick=closeDrawer;
$('#dreset').onclick=()=>{$('#dcode').value=code(cur);applyEdit();studioLink()};
$('#dcopy').onclick=()=>{copy($('#dcode').value,cur[1]);flash($('#dcopy'))};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#drawer').hidden)closeDrawer()});
const FKEY='umbra-fav';let FAV=new Set();try{FAV=new Set(JSON.parse(localStorage.getItem(FKEY)||'[]'))}catch(e){}
const HEART='<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
function favSync(){document.querySelectorAll('.fav').forEach(b=>{const on=FAV.has(b.dataset.s);b.setAttribute('aria-pressed',on);b.classList.toggle('on',on)});
 const ch=document.querySelector('#filters [data-c="Favorites"] .n');if(ch)ch.textContent=FAV.size;
 const f=$('#dfav');if(f&&cur){const on=FAV.has(slug(cur[1]));f.setAttribute('aria-pressed',on);f.textContent=on?'\u2665 Saved':'\u2661 Save'}}
function toggleFav(d){const s=slug(d[1]);FAV.has(s)?FAV.delete(s):FAV.add(s);try{localStorage.setItem(FKEY,JSON.stringify([...FAV]))}catch(e){}favSync();if(cat==='Favorites')render()}
let cat='All',built=false;const TL=[];
const idle=window.requestIdleCallback?f=>requestIdleCallback(f,{timeout:300}):f=>setTimeout(f,16);
const match=d=>{const q=$('#q').value.trim().toLowerCase();return(cat==='All'||(cat==='Favorites'?FAV.has(slug(d[1])):d[0]===cat))&&(!q||(d[1]+' '+d[0]).toLowerCase().includes(q))};
function pressed(){document.querySelectorAll('#filters .chip').forEach(c=>c.setAttribute('aria-pressed',c.dataset.c===cat))}
function gTop(){const g=$('#gallery'),hd=document.querySelector('.site'),bar=document.querySelector('.bar'),y=g.getBoundingClientRect().top+scrollY-(hd?hd.offsetHeight:0)-(bar?bar.offsetHeight:0)-12;
 if(scrollY>y){const r=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;scrollTo({top:Math.max(0,y),behavior:r?'auto':'smooth'})}}
function render(){let n=0;for(const[d,t]of TL){const m=match(d);t.hidden=!m;if(m)n++}$('#empty').textContent=cat==='Favorites'?'No favorites yet. Tap the heart on any design to save it here.':'No designs match. Try another word or category.';$('#empty').hidden=!(built&&!n);pressed()}
function build(i){const f=document.createDocumentFragment(),end=Math.min(D.length,i+16);for(;i<end;i++){const t=tile(D[i]);t.hidden=!match(D[i]);TL.push([D[i],t]);f.append(t)}$('#gallery').append(f);if(i<D.length)idle(()=>build(i));else{built=true;render()}}
['All','Favorites',...new Set(D.map(d=>d[0]))].forEach(c=>{const b=el('button','chip',c);b.dataset.c=c;b.append(el('span','n',String(c==='All'?D.length:c==='Favorites'?FAV.size:D.filter(d=>d[0]===c).length)));b.type='button';b.onclick=()=>{cat=c;render();gTop()};$('#filters').append(b)});
$('#lead').textContent=`${D.length} ready-made designs and ${TOOLS.reduce((a,t)=>a+t[1].length,0)} generators for shadows, gradients, layout, type and motion. Everything is plain CSS you can paste straight into your project.`;
TOOLS.forEach(t=>{const c=el('div','tgroup'),l=el('div','tlinks');c.append(el('b',0,t[0]));t[1].forEach(x=>{const a=el('a','chip',x[1]);a.href='studio.html#'+x[0];l.append(a)});c.append(l);$('#tgrid').append(c)});
let pmE=null,pmR=0;document.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;pmE=e;if(pmR)return;pmR=requestAnimationFrame(()=>{pmR=0;const s=pmE.target.closest&&pmE.target.closest('.tstage');if(!s)return;const r=s.getBoundingClientRect();s.style.setProperty('--lx',pmE.clientX-r.left+'px');s.style.setProperty('--ly',pmE.clientY-r.top+'px')})});
let qt;$('#q').addEventListener('input',()=>{clearTimeout(qt);qt=setTimeout(render,120)});
const fl=$('#filters'),more=()=>fl.classList.toggle('more',fl.scrollLeft+fl.clientWidth<fl.scrollWidth-4);fl.addEventListener('scroll',more,{passive:true});addEventListener('resize',more);
$('#dfav').onclick=()=>{if(cur)toggleFav(cur)};
$('#dlink').onclick=()=>{if(!cur)return;copy(location.href.split('#')[0]+'#'+slug(cur[1]),'link');const b=$('#dlink');b.textContent='Link copied';setTimeout(()=>{b.textContent='Copy link'},1400)};
pressed();build(0);more();favSync();
const dl=()=>D.find(d=>slug(d[1])===decodeURIComponent(location.hash.slice(1)));{const d0=dl();if(d0)openDrawer(d0,null)}
addEventListener('hashchange',()=>{const x=dl();if(x&&($('#drawer').hidden||cur!==x))openDrawer(x,null)});
document.addEventListener('keydown',e=>{if(e.key==='/'&&!/INPUT|TEXTAREA/.test(document.activeElement.tagName)){e.preventDefault();$('#q').focus()}});
{const L=[...document.querySelectorAll('.links a')],dl=L.find(a=>a.getAttribute('href')==='#gallery'),tl=L.find(a=>a.getAttribute('href')==='#tools');let sr=0;
 const spy=()=>{sr=0;const on=$('#tools').getBoundingClientRect().top<innerHeight*.5;[dl,tl].forEach(a=>a&&a.removeAttribute('aria-current'));(on?tl:dl)&&(on?tl:dl).setAttribute('aria-current','page')};
 addEventListener('scroll',()=>{if(!sr)sr=requestAnimationFrame(spy)},{passive:true});addEventListener('resize',spy);spy()}
