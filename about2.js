// =========================================
// about2.js, Timeline scroll animations
// =========================================

(function () {

  // ── Animate timeline dots + year numbers + cards ──
  const dots  = document.querySelectorAll('.tl-dot');
  const years = document.querySelectorAll('.tl-year');
  const cards = document.querySelectorAll('.tl-card');

  const itemObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('visible');
      itemObserver.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  dots.forEach(d  => itemObserver.observe(d));
  years.forEach(y => itemObserver.observe(y));
  cards.forEach(c => itemObserver.observe(c));

  // ── Animate the vertical fill line ──
  const lineFill = document.getElementById('tlLineFill');
  const timeline = document.getElementById('timeline');

  if (lineFill && timeline) {
    function updateLine() {
      const tlRect   = timeline.getBoundingClientRect();
      const viewH    = window.innerHeight;
      const scrolled = Math.max(0, viewH - tlRect.top);
      const pct      = Math.min(100, (scrolled / tlRect.height) * 100);
      lineFill.style.height = pct + '%';
    }

    window.addEventListener('scroll', updateLine, { passive: true });
    updateLine();
  }

  // ── Bento expand / collapse panels ──
  document.querySelectorAll('.bento-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = document.getElementById(btn.dataset.target);
      if (!panel) return;
      const open = panel.classList.toggle('open');
      btn.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      const label = btn.querySelector('.bento-btn-label');
      if (label) label.textContent = open ? (btn.dataset.close || 'Hide') : (btn.dataset.open || 'Show');
      if (open) {
        // let timeline/line-fill recalculate, then bring the panel into view
        window.dispatchEvent(new Event('scroll'));
        setTimeout(() => {
          panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.dispatchEvent(new Event('scroll'));
        }, 90);
      }
    });
  });

  // ── Siri-style transform: photo ↔ illustration ──
  const siriBtn = document.getElementById('siriButton');
  const siriHost = document.getElementById('siriHost');
  const aboutPhoto = document.getElementById('aboutPhoto');
  if (siriBtn && siriHost && aboutPhoto) {
    const textEl = document.getElementById('siriText');
    const status = document.getElementById('siriStatus');
    // prompt 1 → illustration · prompt 2 → back to the real photo
    const PROMPTS = {
      toArt:   'Turn this photo into chibi art',
      toPhoto: 'Change this back to the real photo'
    };
    const REST = { toArt: 'Change me back', toPhoto: 'Turn this into chibi art' };
    let busy = false, shown = false;

    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function type(str, done) {
      if (!textEl) { done(); return; }
      textEl.textContent = '';
      if (reduce) { textEl.textContent = str; done(); return; }
      let i = 0;
      (function step() {
        if (i <= str.length) {
          textEl.textContent = str.slice(0, i++);
          setTimeout(step, 36 + Math.random() * 30);
        } else { done(); }
      })();
    }

    // Same Siri sequence both ways, only the prompt + target differ.
    function runSequence(toArt) {
      busy = true;
      siriBtn.classList.add('typing', 'thinking');
      siriHost.classList.add('siri-active');
      type(toArt ? PROMPTS.toArt : PROMPTS.toPhoto, () => {
        siriBtn.classList.remove('typing');
        setTimeout(() => {
          aboutPhoto.classList.toggle('memoji-on', toArt);
          shown = toArt;
          if (status) status.textContent = toArt
            ? 'Now showing an illustration of Jyoti.'
            : 'Back to the real photo.';
          setTimeout(() => {
            siriHost.classList.remove('siri-active');
            siriBtn.classList.remove('thinking');
            if (textEl) textEl.textContent = toArt ? REST.toArt : REST.toPhoto;
            siriBtn.setAttribute('aria-pressed', toArt ? 'true' : 'false');
            busy = false;
          }, 650);
        }, 300);
      });
    }

    siriBtn.addEventListener('click', () => {
      if (busy) return;
      runSequence(!shown);
    });
  }

  // ── Email copy-to-clipboard ──
  window.handleEmail = function () {
    const email = 'jyotisajwan30@gmail.com';
    const label = document.getElementById('emailLabel');

    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        if (label) {
          label.textContent = 'Copied!';
          setTimeout(() => { label.textContent = 'Email'; }, 2000);
        }
      });
    } else {
      window.location.href = 'mailto:' + email;
    }
  };

})();
