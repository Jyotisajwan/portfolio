// =========================================
// main.js, Jyoti Sajwan Portfolio
// =========================================

// ── NAV scroll shadow ──────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ── Mobile hamburger ───────────────────
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

function closeNav() {
  mobileNav.classList.remove('open');
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = '';
  spans[1].style.opacity   = '';
  spans[2].style.transform = '';
}

// ── IntersectionObserver for fade-up ──
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

// ── Photo Stack ────────────────────────
(function () {
  const stack = document.getElementById('photoStack');
  if (!stack) return;

  const cards = Array.from(stack.querySelectorAll('.photo-card'));
  const total = cards.length;
  let current = 0;

  // Stacked default rotations for non-active cards
  const rotations   = [-6, -3, 2, 5];
  const translateYs = [10,  5, 3, 0];
  const opacities   = [0.45, 0.6, 0.75, 0.85];

  function applyStack() {
    cards.forEach((card, i) => {
      const offset = (i - current + total) % total; // 0 = active
      card.classList.toggle('active', offset === 0);

      if (offset !== 0) {
        // stack order: 1 is just behind active, etc.
        const idx = offset - 1;
        card.style.zIndex   = String(total - offset);
        card.style.opacity  = String(opacities[Math.min(idx, opacities.length - 1)]);
        card.style.transform = `rotate(${rotations[Math.min(idx, rotations.length - 1)]}deg) translateY(${translateYs[Math.min(idx, translateYs.length - 1)]}px)`;
      } else {
        card.style.zIndex   = '10';
        card.style.opacity  = '1';
        card.style.transform = '';
      }
    });
  }

  function next() {
    current = (current + 1) % total;
    applyStack();
  }

  // Click / keyboard cycle
  stack.addEventListener('click', next);
  stack.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); next(); }
  });

  // Auto-cycle
  let timer = setInterval(next, 3500);
  stack.addEventListener('mouseenter', () => clearInterval(timer));
  stack.addEventListener('mouseleave', () => { timer = setInterval(next, 3500); });

  // Init
  applyStack();
})();

// ── Inline detail panels ───────────────
let activePanel = null;
let activeBtn   = null;

function openPanel(id) {
  const panel = document.getElementById('panel-' + id);
  if (!panel) return;

  // Find the button that triggered this
  const btn = document.querySelector(`[onclick="openPanel('${id}')"]`);

  // If clicking the already-open panel → close it
  if (activePanel === panel) {
    closePanel(id);
    return;
  }

  // Close any currently open panel
  if (activePanel) {
    activePanel.classList.remove('open');
    activePanel.style.display = 'none';
    if (activeBtn) activeBtn.classList.remove('active');
  }

  // Open new panel
  panel.style.display = 'block';
  // Trigger reflow so animation plays
  void panel.offsetHeight;
  panel.classList.add('open');
  if (btn) btn.classList.add('active');

  activePanel = panel;
  activeBtn   = btn;

  // Smooth scroll so the panel is visible
  setTimeout(() => {
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 60);
}

function closePanel(id) {
  const panel = document.getElementById('panel-' + id);
  if (!panel) return;

  panel.classList.remove('open');
  panel.style.display = 'none';

  if (activeBtn) activeBtn.classList.remove('active');
  activePanel = null;
  activeBtn   = null;
}

// Close panel on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && activePanel) {
    const id = activePanel.id.replace('panel-', '');
    closePanel(id);
  }
});

// ── Photo fallback helper ──────────────
function showFallback(img, emoji, text) {
  img.style.display = 'none';
  const fallback = img.parentElement.querySelector('.photo-fallback');
  if (fallback) {
    fallback.style.display = 'flex';
    const span = fallback.querySelector('span');
    const p    = fallback.querySelector('p');
    if (span) span.textContent = emoji;
    if (p)    p.textContent    = text;
  }
}
