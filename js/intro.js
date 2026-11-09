/* ===========================================================
   WebsiteIntroAnimation — FutureSort Technologies
   A self-contained, config-driven "boot sequence" intro.

   Usage: include this file on every page, right after
   `<div id="fst-intro"></div>` has been placed as the very
   first element inside <body>. Nothing else is required —
   the controller builds its own contents, runs the timeline,
   and reveals the page when it's done (or immediately, if
   anything goes wrong).

   Everything you'd want to customise lives in CONFIG below.
=========================================================== */

var WebsiteIntroAnimation = (function(){

  var CONFIG = {
    enabled: true,

    // Swap the mark shown at the centre of the animation.
    logoSrc: 'assets/logo-mark.png',
    logoAlt: 'FutureSort Technologies',

    // Named timeline in ms — tweak these to change pacing.
    // (Total on-screen time for a first visit ≈ core + retract + outro.)
    timing: {
      coreIn:        0,      // logo circle starts scaling/fading in
      codeIn:        420,    // code columns + links start fading in
      statusInit:    250,    // "INITIALIZING"
      statusCompile: 1350,   // "COMPILING ASSETS"
      statusBuild:   2550,   // "BUILD COMPLETE" + core brightens
      retract:       3150,   // code retracts, core stays lit
      outro:         3550,   // whole overlay fades/scales out
      done:          4050    // overlay removed, page fully revealed
    },

    // Quick variant played on repeat visits within the same session.
    shortDuration: 380,

    statusMessages: ['INITIALIZING', 'COMPILING ASSETS', 'BUILD COMPLETE'],

    // Session storage key — change if you want the full intro to
    // replay under different conditions (e.g. per-day instead of per-session).
    sessionKey: 'fstIntroPlayed',

    // Rough, deliberately-not-too-readable snippets for the side columns.
    // Mixed to feel like a real dev environment rather than one language.
    codeSnippets: [
      '<span class="k">const</span> build = <span class="k">await</span> compile(source);',
      '<span class="dim">// initializing render pipeline</span>',
      '<span class="k">function</span> mount(root) { render(app, root); }',
      'POST /api/v1/deploy <span class="dim">200 OK</span>',
      '{ <span class="k">"status"</span>: <span class="k">"ready"</span>, <span class="dim">"latency": 42</span> }',
      '<span class="k">SELECT</span> * <span class="k">FROM</span> projects <span class="k">WHERE</span> live = true;',
      '<span class="k">import</span> { useEffect } <span class="k">from</span> <span class="dim">"react"</span>;',
      '.core { animation: pulse 2s infinite; }',
      '<span class="dim">$</span> npm run build <span class="dim">&nbsp;&nbsp;✓</span>',
      '<span class="k">class</span> Engine <span class="k">extends</span> Core {}',
      '<span class="k">export default</span> function App() {}',
      '<span class="dim">// linking modules…</span>',
      '<span class="k">GET</span> /assets/bundle.js <span class="dim">200</span>',
      '<span class="k">if</span> (ready) { initialize(); }',
      'git commit -m <span class="dim">"ship it"</span>',
      '<span class="k">const</span> nodes = graph.connect(a, b);'
    ]
  };

  function reveal(){
    try{
      document.body.classList.add('fst-revealing');
      document.body.classList.add('fst-ready');
      var el = document.getElementById('fst-intro');
      if(el){ el.setAttribute('hidden',''); }
    }catch(e){ /* nothing more we can do — CSS failsafe covers this */ }
  }

  function buildCodeColumn(side){
    var col = document.createElement('div');
    col.className = 'fst-code-col fst-code-' + side;
    var track = document.createElement('div');
    track.className = 'fst-code-track';

    // duplicate the list once so the upward scroll loops seamlessly
    var linesHtml = '';
    for(var pass=0; pass<2; pass++){
      for(var i=0;i<CONFIG.codeSnippets.length;i++){
        var delay = (Math.random()*2.4).toFixed(2);
        linesHtml += '<div class="fst-line" style="animation-delay:'+delay+'s">'+CONFIG.codeSnippets[i]+'</div>';
      }
    }
    track.innerHTML = linesHtml;
    col.appendChild(track);
    return col;
  }

  function buildLink(side){
    var link = document.createElement('div');
    link.className = 'fst-link fst-link-' + side;
    var p1 = document.createElement('div');
    p1.className = 'fst-particle';
    p1.style.animationDelay = '0s';
    var p2 = document.createElement('div');
    p2.className = 'fst-particle';
    p2.style.animationDelay = '0.9s';
    link.appendChild(p1);
    link.appendChild(p2);
    return link;
  }

  function run(){
    var overlay = document.getElementById('fst-intro');
    if(!overlay || !CONFIG.enabled){ reveal(); return; }

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var playedBefore = false;
    try{ playedBefore = sessionStorage.getItem(CONFIG.sessionKey) === '1'; }catch(e){ /* private mode etc. */ }

    // hard failsafe: whatever happens, never trap the visitor
    var failsafe = setTimeout(reveal, CONFIG.timing.done + 2500);

    try{
      overlay.innerHTML =
        '<div class="fst-intro-vignette"></div>' +
        '<div class="fst-core">' +
          '<div class="fst-ring"></div>' +
          '<div class="fst-pulse"></div>' +
          '<img class="fst-logo" src="'+CONFIG.logoSrc+'" alt="'+CONFIG.logoAlt+'">' +
        '</div>' +
        '<div class="fst-status" id="fst-status"></div>';

      var core = overlay.querySelector('.fst-core');
      var status = overlay.querySelector('#fst-status');

      if(reduceMotion){
        clearTimeout(failsafe);
        setTimeout(function(){
          overlay.classList.add('fst-outro');
          setTimeout(reveal, 220);
        }, 260);
        return;
      }

      if(playedBefore){
        overlay.classList.add('fst-short');
        setTimeout(function(){
          overlay.classList.add('fst-outro');
          setTimeout(reveal, 260);
        }, CONFIG.shortDuration);
        return;
      }

      // ---- full first-visit sequence ----
      var leftCol = buildCodeColumn('left');
      var rightCol = buildCodeColumn('right');
      var leftLink = buildLink('left');
      var rightLink = buildLink('right');
      overlay.appendChild(leftCol);
      overlay.appendChild(rightCol);
      overlay.appendChild(leftLink);
      overlay.appendChild(rightLink);
      overlay.appendChild(core);   // re-append so code sits behind core in DOM order
      overlay.appendChild(status);

      function setStatus(msg){
        status.classList.remove('fst-visible');
        setTimeout(function(){
          status.textContent = msg;
          status.classList.add('fst-visible');
        }, 140);
      }

      setTimeout(function(){ setStatus(CONFIG.statusMessages[0]); }, CONFIG.timing.statusInit);
      setTimeout(function(){ setStatus(CONFIG.statusMessages[1]); }, CONFIG.timing.statusCompile);
      setTimeout(function(){
        setStatus(CONFIG.statusMessages[2]);
        core.classList.add('fst-peak');
      }, CONFIG.timing.statusBuild);

      setTimeout(function(){
        leftCol.classList.add('fst-retract');
        rightCol.classList.add('fst-retract');
        leftLink.classList.add('fst-retract');
        rightLink.classList.add('fst-retract');
      }, CONFIG.timing.retract);

      setTimeout(function(){
        overlay.classList.add('fst-outro');
      }, CONFIG.timing.outro);

      setTimeout(function(){
        clearTimeout(failsafe);
        try{ sessionStorage.setItem(CONFIG.sessionKey, '1'); }catch(e){}
        reveal();
      }, CONFIG.timing.done);

    }catch(err){
      clearTimeout(failsafe);
      reveal();
    }
  }

  return { run: run, config: CONFIG };
})();

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', WebsiteIntroAnimation.run);
} else {
  WebsiteIntroAnimation.run();
}
