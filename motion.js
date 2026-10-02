/* Small, interruptible springs. No dependency or animation on the input path. */
(() => {
  'use strict';
  const states = new WeakMap();
  const enabled = () => !document.body.classList.contains('reduce-motion') && !matchMedia('(prefers-reduced-motion: reduce)').matches;
  const get = el => {
    if (!states.has(el)) states.set(el, {x:0,y:0,scale:1,opacity:1,v:{x:0,y:0,scale:0,opacity:0},frame:0});
    return states.get(el);
  };
  const paint = (el,s) => {el.style.transform=`translate3d(${s.x}px,${s.y}px,0) scale(${s.scale})`;el.style.opacity=s.opacity;};
  function set(el, values) {const s=get(el);cancelAnimationFrame(s.frame);s.frame=0;s.done=null;Object.assign(s,values);for(const key of Object.keys(s.v))s.v[key]=0;paint(el,s);}
  function to(el, values, options={}) {
    const s=get(el);cancelAnimationFrame(s.frame);s.done=options.done;
    const keys=Object.keys(values),k=options.stiffness||420,c=options.damping||41;
    if(options.velocity)Object.assign(s.v,options.velocity);
    if(!enabled()){Object.assign(s,values);for(const key of keys)s.v[key]=0;paint(el,s);s.frame=0;s.done?.();return;}
    let last=performance.now();el.style.willChange='transform, opacity';
    const tick=now=>{
      if(!enabled()){Object.assign(s,values);for(const key of keys)s.v[key]=0;paint(el,s);s.frame=0;el.style.willChange='';const done=s.done;s.done=null;done?.();return;}
      const dt=Math.min((now-last)/1000,.032);last=now;let settled=true;
      // Two integration steps keep the response stable on 30 Hz and after a dropped frame.
      for(let step=0;step<2;step++)for(const key of keys){s.v[key]+=((values[key]-s[key])*k-s.v[key]*c)*dt/2;s[key]+=s.v[key]*dt/2;}
      for(const key of keys){const small=key==='opacity'||key==='scale';if(Math.abs(values[key]-s[key])>(small?.001:.12)||Math.abs(s.v[key])>(small?.01:1))settled=false;}
      paint(el,s);
      if(settled){Object.assign(s,values);paint(el,s);s.frame=0;el.style.willChange='';const done=s.done;s.done=null;done?.();}
      else s.frame=requestAnimationFrame(tick);
    };
    s.frame=requestAnimationFrame(tick);
  }
  function stop(el){const s=get(el);cancelAnimationFrame(s.frame);s.frame=0;s.done=null;el.style.willChange='';return {...s};}
  const pressed=new Map();
  document.addEventListener('pointerdown',e=>{
    const el=e.target.closest('.number-key,.key-erase,.primary,.secondary,.mode-card,.chapter-card,.level-tile,.icon-button,.tool');
    if(!el||el.disabled)return;pressed.set(e.pointerId,el);el.dataset.springPress='true';to(el,{scale:el.classList.contains('number-key')?.94:.97},{stiffness:850,damping:52});
  },{passive:true});
  const release=e=>{const el=pressed.get(e.pointerId);if(el){pressed.delete(e.pointerId);to(el,{scale:1},{stiffness:500,damping:34});}};
  document.addEventListener('pointerup',release,{passive:true});document.addEventListener('pointercancel',release,{passive:true});
  window.addEventListener('blur',()=>{for(const el of pressed.values())set(el,{scale:1});pressed.clear();});
  window.AtelierMotion={to,set,stop,enabled,get};
})();
