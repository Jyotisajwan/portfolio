// =========================================
// About Page, about.js
// Photo Stack Cycling Logic
// =========================================

(function () {
  const stack = document.getElementById('photoStack');
  if (!stack) return;

  const cards = Array.from(stack.querySelectorAll('.photo-card'));
  const total = cards.length;
  let current = total - 1; // Start with last card on top (active)

  // Initial setup: set z-indexes and rotations for the stack
  function resetStack() {
    cards.forEach((card, i) => {
      card.classList.remove('active');
      // Position cards in the stack behind the active
      const offset = (i - current + total) % total;
      card.style.zIndex = offset === 0 ? '10' : String(offset);
    });
    cards[current].classList.add('active');
  }

  // Cycle to next card (bring bottom card to front)
  function cycleNext() {
    cards[current].classList.remove('active');

    // Animate the outgoing card flying slightly away
    const outgoing = cards[current];
    outgoing.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease';
    outgoing.style.transform = 'rotate(-8deg) translateX(-30px) translateY(20px) scale(0.92)';
    outgoing.style.opacity = '0.3';

    // Move to next card
    current = (current + 1) % total;
    cards[current].classList.add('active');

    // After transition, re-stack cleanly
    setTimeout(() => {
      outgoing.style.transition = 'none';
      // Reset the outgoing card to bottom of stack
      const stackPos = (cards.indexOf(outgoing) - current + total) % total;
      const rotations = [-6, -3, 2, 5];
      const translateYs = [10, 5, 3, 0];
      const idx = stackPos % rotations.length;
      outgoing.style.transform = `rotate(${rotations[idx]}deg) translateY(${translateYs[idx]}px)`;
      outgoing.style.opacity = String(0.4 + stackPos * 0.15);
      // Re-enable transitions
      setTimeout(() => {
        outgoing.style.transition = '';
      }, 50);
    }, 450);

    // Haptic-ish: brief scale pop on new active card
    const incoming = cards[current];
    incoming.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease, box-shadow 0.3s ease';
  }

  // Click / tap on the stack
  stack.addEventListener('click', cycleNext);

  // Keyboard: Enter or Space when focused
  stack.setAttribute('tabindex', '0');
  stack.setAttribute('role', 'button');
  stack.setAttribute('aria-label', 'Click to cycle through photos');
  stack.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      cycleNext();
    }
  });

  // Auto-cycle every 3.5 seconds
  let autoTimer = setInterval(cycleNext, 3500);

  // Pause auto-cycle on hover/focus
  stack.addEventListener('mouseenter', () => clearInterval(autoTimer));
  stack.addEventListener('focusin',    () => clearInterval(autoTimer));

  stack.addEventListener('mouseleave', () => {
    autoTimer = setInterval(cycleNext, 3500);
  });
  stack.addEventListener('focusout', () => {
    autoTimer = setInterval(cycleNext, 3500);
  });

  // Initialize
  resetStack();

})();
