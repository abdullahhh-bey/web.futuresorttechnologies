// FutureSort Technologies — shared behavior

(function(){
  // header scroll state
  var header = document.querySelector('.site-header');
  function onScroll(){
    if(!header) return;
    if(window.scrollY > 10) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  document.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  var scrim = document.querySelector('.nav-scrim');
  function closeNav(){
    links && links.classList.remove('open');
    scrim && scrim.classList.remove('open');
    document.body.classList.remove('nav-open');
    toggle && toggle.setAttribute('aria-expanded','false');
  }
  function openNav(){
    links && links.classList.add('open');
    scrim && scrim.classList.add('open');
    document.body.classList.add('nav-open');
    toggle && toggle.setAttribute('aria-expanded','true');
  }
  if(toggle){
    toggle.addEventListener('click', function(){
      var isOpen = links.classList.contains('open');
      isOpen ? closeNav() : openNav();
    });
  }
  scrim && scrim.addEventListener('click', closeNav);
  links && links.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeNav); });

  // scroll reveal — single, restrained
  var reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && reveals.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, {threshold:0.14, rootMargin:'0px 0px -40px 0px'});
    reveals.forEach(function(el){ io.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add('in'); });
  }
})();

// ---------------------------------------------------------------
// Hero network — a slow, quiet node/circuit field echoing the mark.
// Nodes drift, links form when close, one node occasionally "pulses"
// the way a signal would travel along a trace.
// ---------------------------------------------------------------
(function(){
  var canvas = document.getElementById('hero-net');
  if(!canvas) return;
  var ctx = canvas.getContext('2d');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var W, H, DPR;
  var nodes = [];
  var NODE_COUNT;
  var LINK_DIST;
  var raf;

  function size(){
    var rect = canvas.parentElement.getBoundingClientRect();
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = rect.width; H = rect.height;
    canvas.width = W * DPR; canvas.height = H * DPR;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(DPR,0,0,DPR,0,0);
    NODE_COUNT = Math.max(18, Math.min(46, Math.round((W*H)/26000)));
    LINK_DIST = Math.max(110, Math.min(170, W/8));
  }

  function makeNodes(){
    nodes = [];
    for(var i=0;i<NODE_COUNT;i++){
      nodes.push({
        x: Math.random()*W,
        y: Math.random()*H,
        vx: (Math.random()-0.5)*0.18,
        vy: (Math.random()-0.5)*0.18,
        r: Math.random()*1.4 + 1.1,
        pulse: Math.random()*Math.PI*2
      });
    }
  }

  function step(){
    ctx.clearRect(0,0,W,H);

    // links
    for(var i=0;i<nodes.length;i++){
      for(var j=i+1;j<nodes.length;j++){
        var a=nodes[i], b=nodes[j];
        var dx=a.x-b.x, dy=a.y-b.y;
        var d = Math.sqrt(dx*dx+dy*dy);
        if(d < LINK_DIST){
          var alpha = (1 - d/LINK_DIST) * 0.32;
          ctx.strokeStyle = 'rgba(120,220,230,'+alpha.toFixed(3)+')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x,a.y);
          ctx.lineTo(b.x,b.y);
          ctx.stroke();
        }
      }
    }

    // nodes
    for(i=0;i<nodes.length;i++){
      var n = nodes[i];
      if(!reduceMotion){
        n.x += n.vx; n.y += n.vy;
        if(n.x < -20) n.x = W+20; if(n.x > W+20) n.x = -20;
        if(n.y < -20) n.y = H+20; if(n.y > H+20) n.y = -20;
        n.pulse += 0.02;
      }
      var glow = (Math.sin(n.pulse)+1)/2;
      var rad = n.r + glow*0.8;

      ctx.beginPath();
      ctx.fillStyle = 'rgba(160,235,240,'+(0.55+glow*0.35).toFixed(3)+')';
      ctx.shadowColor = 'rgba(53,231,238,0.9)';
      ctx.shadowBlur = 6 + glow*6;
      ctx.arc(n.x, n.y, rad, 0, Math.PI*2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    if(!reduceMotion) raf = requestAnimationFrame(step);
  }

  size();
  makeNodes();
  step();

  var resizeTimer;
  window.addEventListener('resize', function(){
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function(){
      cancelAnimationFrame(raf);
      size();
      makeNodes();
      step();
    }, 150);
  });
})();

// ---------------------------------------------------------------
// Contact form — client-side only (no backend wired up yet).
// Shows an inline confirmation state instead of a real submission.
// ---------------------------------------------------------------
(function(){
  var form = document.getElementById('contact-form');
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    var note = document.getElementById('form-note');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(function(){
      form.reset();
      btn.textContent = 'Send message';
      btn.disabled = false;
      if(note){
        note.hidden = false;
      }
    }, 700);
  });
})();
