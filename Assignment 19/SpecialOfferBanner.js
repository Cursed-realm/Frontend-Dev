// SpecialOfferBanner.js
// Implements promotional banner behaviors:
// - per-banner Hide/Show
// - Slide Up / Slide Down toggles
// - Fade In / Fade Out
// - Auto-rotate through banners every 5 seconds using fade effects

(function(){
  'use strict';

  // utility to add CSS only once
  function addStyles(){
    if(document.getElementById('special-offer-styles')) return;
    const s = document.createElement('style');
    s.id = 'special-offer-styles';
    s.textContent = `
      .banner-container{max-width:980px;margin:20px auto;padding:12px}
      .banners{display:flex;gap:12px;align-items:center}
      .banner{flex:1;min-height:110px;border-radius:10px;color:#fff;padding:16px;position:relative;overflow:hidden;transition:all 450ms ease}
      .banner.hidden{display:none}

      /* fade helper */
      .fade-out{opacity:0;transition:opacity 600ms ease}
      .fade-in{opacity:1;transition:opacity 600ms ease}

      /* slide helper uses max-height to animate */
      .slide-up{max-height:0;padding-top:0;padding-bottom:0;margin:0;overflow:hidden;transition:max-height 450ms ease, padding 350ms ease;}
      .slide-down{max-height:300px;transition:max-height 450ms ease, padding 350ms ease;}

      .banner .controls{position:absolute;top:10px;right:10px;display:flex;gap:6px}
      .banner .controls button{background:rgba(255,255,255,0.15);border:0;color:#fff;padding:6px 8px;border-radius:6px;cursor:pointer;font-weight:700}
      .banner .controls button:hover{background:rgba(255,255,255,0.24)}

      .banner .label{font-size:1.05rem;font-weight:800}
      .banner .sub{font-size:0.95rem;opacity:0.95}

      /* sample colors */
      .banner--1{background:linear-gradient(90deg,#ff7a18,#af002d)}
      .banner--2{background:linear-gradient(90deg,#11998e,#38ef7d)}
      .banner--3{background:linear-gradient(90deg,#00c6ff,#0072ff)}

      .global-controls{display:flex;gap:8px;margin-top:12px;justify-content:center}
      .global-controls button{padding:8px 12px;border-radius:8px;border:0;cursor:pointer;background:#111827;color:white}
      .global-controls button.tiny{padding:6px 8px;font-size:0.9rem}

      .muted{opacity:0.9}
    `;
    document.head.appendChild(s);
  }

  // fade helper functions
  function fadeOut(el, ms=600){
    return new Promise(resolve=>{
      el.classList.remove('fade-in');
      el.classList.add('fade-out');
      setTimeout(()=>{
        // keep element visible but opaque; resolving to allow hiding later
        resolve();
      }, ms);
    });
  }
  function fadeIn(el, ms=600){
    return new Promise(resolve=>{
      el.classList.remove('fade-out');
      el.classList.add('fade-in');
      setTimeout(()=> resolve(), ms);
    });
  }

  // slide helper (toggle slide up/down)
  function slideUp(el){
    el.classList.add('slide-up');
    el.classList.remove('slide-down');
  }
  function slideDown(el){
    el.classList.remove('slide-up');
    el.classList.add('slide-down');
  }

  // create a banner element with controls
  function createBanner(id, title, subtitle, cls){
    const banner = document.createElement('div');
    banner.className = `banner ${cls}`;
    banner.dataset.bannerId = id;
    banner.innerHTML = `
      <div class="controls">
        <button data-action="hide">Hide</button>
        <button data-action="show" style="display:none">Show</button>
        <button data-action="slide">Slide</button>
        <button data-action="fade">Fade</button>
      </div>
      <div class="content">
        <div class="label">${title}</div>
        <div class="sub">${subtitle}</div>
      </div>
    `;

    // default visible state
    banner.classList.add('fade-in');
    banner.classList.add('slide-down');

    // Per-control listeners
    const hideBtn = banner.querySelector('[data-action="hide"]');
    const showBtn = banner.querySelector('[data-action="show"]');
    const slideBtn = banner.querySelector('[data-action="slide"]');
    const fadeBtn = banner.querySelector('[data-action="fade"]');

    hideBtn.addEventListener('click', (e)=>{
      e.stopPropagation();
      banner.classList.add('hidden');
      // show the counterpart show button state through container-level management
      updateGlobalState();
    });

    showBtn.addEventListener('click', (e)=>{
      e.stopPropagation();
      banner.classList.remove('hidden');
      updateGlobalState();
    });

    slideBtn.addEventListener('click', (e)=>{
      e.stopPropagation();
      if(banner.classList.contains('slide-up')){
        slideDown(banner);
      } else {
        slideUp(banner);
      }
    });

    fadeBtn.addEventListener('click', (e)=>{
      e.stopPropagation();
      if(banner.classList.contains('fade-in') && !banner.classList.contains('fade-out')){
        // fade out then hide
        fadeOut(banner).then(()=> banner.classList.remove('fade-in'));
      } else {
        fadeIn(banner).then(()=> banner.classList.remove('fade-out'));
      }
    });

    return banner;
  }

  // build demo UI
  function buildUI(rootSelector='#special-offer-root'){
    addStyles();
    const root = document.querySelector(rootSelector);
    if(!root) return;
    root.classList.add('banner-container');

    const bannersWrapper = document.createElement('div');
    bannersWrapper.className = 'banners';

    // sample banners
    const b1 = createBanner(1, 'Limited Time — 50% OFF', 'Use code SAVE50 at checkout', 'banner--1');
    const b2 = createBanner(2, 'Free Shipping', 'On orders over $50', 'banner--2');
    const b3 = createBanner(3, 'New Arrivals', 'Fresh styles for the season', 'banner--3');

    bannersWrapper.appendChild(b1);
    bannersWrapper.appendChild(b2);
    bannersWrapper.appendChild(b3);

    root.appendChild(bannersWrapper);

    // global controls
    const gc = document.createElement('div');
    gc.className = 'global-controls';
    gc.innerHTML = `
      <button id="showAll">Show All</button>
      <button id="hideAll">Hide All</button>
      <button id="slideAll" class="tiny">Slide Up/Down</button>
      <button id="fadeAll" class="tiny">Fade In/Out</button>
      <button id="startRotate">Start Rotate</button>
      <button id="stopRotate">Stop Rotate</button>
    `;
    root.appendChild(gc);

    // wire up global controls
    document.getElementById('showAll').addEventListener('click', ()=>{
      document.querySelectorAll('.banner').forEach(b => b.classList.remove('hidden'));
      updateGlobalState();
    });
    document.getElementById('hideAll').addEventListener('click', ()=>{
      document.querySelectorAll('.banner').forEach(b => b.classList.add('hidden'));
      updateGlobalState();
    });
    document.getElementById('slideAll').addEventListener('click', ()=>{
      // toggle all
      const first = document.querySelector('.banner');
      if(!first) return;
      const anyUp = Array.from(document.querySelectorAll('.banner')).some(b=>b.classList.contains('slide-up'));
      document.querySelectorAll('.banner').forEach(b => anyUp ? slideDown(b) : slideUp(b));
    });
    document.getElementById('fadeAll').addEventListener('click', ()=>{
      // toggle fade for all
      const anyVisible = Array.from(document.querySelectorAll('.banner')).some(b=>!b.classList.contains('fade-out'));
      if(anyVisible){
        document.querySelectorAll('.banner').forEach(b=>fadeOut(b));
      } else {
        document.querySelectorAll('.banner').forEach(b=>fadeIn(b));
      }
    });

    // rotate logic
    let rotateInterval = null;
    let currentIndex = 0;
    const banners = Array.from(document.querySelectorAll('.banner'));

    function rotateOnce(){
      const visibleBanners = banners.filter(b => !b.classList.contains('hidden'));
      if(visibleBanners.length === 0) return;
      // fade out current
      const idx = currentIndex % visibleBanners.length;
      const current = visibleBanners[idx];
      const next = visibleBanners[(idx+1) % visibleBanners.length];
      fadeOut(current).then(()=>{
        // after fade out, fade in next
        fadeIn(next);
      });
      currentIndex = (currentIndex + 1) % visibleBanners.length;
    }

    document.getElementById('startRotate').addEventListener('click', ()=>{
      if(rotateInterval) return; // already running
      rotateInterval = setInterval(rotateOnce, 5000);
      // run immediately once
      rotateOnce();
    });

    document.getElementById('stopRotate').addEventListener('click', ()=>{
      if(rotateInterval){ clearInterval(rotateInterval); rotateInterval = null; }
    });

    // show/hide button counterpart update
    function updateGlobalState(){
      document.querySelectorAll('.banner').forEach(b => {
        const hideBtn = b.querySelector('[data-action="hide"]');
        const showBtn = b.querySelector('[data-action="show"]');
        if(b.classList.contains('hidden')){
          hideBtn.style.display = 'none';
          showBtn.style.display = 'inline-block';
        } else {
          hideBtn.style.display = 'inline-block';
          showBtn.style.display = 'none';
        }
      });
    }

    updateGlobalState();
  }

  // Auto-init
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){ buildUI('#special-offer-root'); });
  } else {
    buildUI('#special-offer-root');
  }

  // expose helpers for console
  window.SpecialOfferBanner = { buildUI };

})();
