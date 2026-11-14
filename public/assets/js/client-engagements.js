/* Accessible, swipe-friendly GoldBuilders client engagement slider. No auto-rotation. */
(function(){
  function initClientSlider(root){
    const viewport=root.querySelector('.client-slider-viewport');
    const track=root.querySelector('[data-client-track]');
    const cards=Array.from(root.querySelectorAll('.client-engagement-card'));
    const prev=root.querySelector('[data-client-prev]');
    const next=root.querySelector('[data-client-next]');
    const count=root.querySelector('[data-client-count]');
    const dots=Array.from(root.querySelectorAll('[data-client-dot]'));
    if(!viewport||!track||!cards.length)return;
    let active=0;
    function nearestIndex(){
      const left=viewport.getBoundingClientRect().left;
      let best=0,delta=Infinity;
      cards.forEach((card,i)=>{const d=Math.abs(card.getBoundingClientRect().left-left);if(d<delta){delta=d;best=i;}});
      return best;
    }
    function show(index,behavior){
      active=Math.max(0,Math.min(cards.length-1,index));
      viewport.scrollTo({left:cards[active].offsetLeft- track.offsetLeft,behavior:behavior||'smooth'});
      update();
    }
    function update(){
      active=nearestIndex();
      const visible=window.matchMedia('(max-width: 600px)').matches?1:(window.matchMedia('(max-width: 900px)').matches?2:3);
      const end=Math.min(cards.length,active+visible);
      if(count)count.textContent=(active+1)+'–'+end+' of '+cards.length+' engagements';
      if(prev)prev.disabled=active===0;
      if(next)next.disabled=active>=cards.length-visible;
      dots.forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===active)));
    }
    prev&&prev.addEventListener('click',()=>show(active-1));
    next&&next.addEventListener('click',()=>show(active+(window.matchMedia('(max-width: 600px)').matches?1:(window.matchMedia('(max-width: 900px)').matches?2:3))));
    dots.forEach(dot=>dot.addEventListener('click',()=>show(Number(dot.dataset.clientDot))));
    let frame;viewport.addEventListener('scroll',()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(update);},{passive:true});
    window.addEventListener('resize',update,{passive:true});
    root.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();show(active+1)}if(e.key==='ArrowLeft'){e.preventDefault();show(active-1)}});
    update();
  }
  document.querySelectorAll('[data-client-slider]').forEach(initClientSlider);
})();
