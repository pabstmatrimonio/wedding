/* =============================================
   Julia & John — Main JS
   ============================================= */

// --- Nav scroll shadow ---
const nav = document.querySelector('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  });
}

// --- Mobile nav toggle ---
const toggle = document.querySelector('.nav-toggle');
const drawer = document.querySelector('.nav-drawer');
if (toggle && drawer) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    drawer.classList.toggle('open');
  });
  // Close on link click
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      drawer.classList.remove('open');
    });
  });
}

// --- Active nav link ---
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// --- Countdown Timer ---
const countdownEl = document.getElementById('countdown');
if (countdownEl) {
  const weddingDate = new Date('2026-09-08T16:00:00');

  function updateCountdown() {
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      countdownEl.innerHTML = '<p class="serif italic" style="font-size:1.5rem;color:var(--brown)">Today is the day!</p>';
      return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('cd-days').textContent    = String(days).padStart(2, '0');
    document.getElementById('cd-hours').textContent   = String(hours).padStart(2, '0');
    document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// --- Conditional pasta class field ---
const attendingRadios = document.querySelectorAll('input[name="attending"]');
const pastaGroup = document.getElementById('pasta-class-group');
if (attendingRadios.length && pastaGroup) {
  attendingRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      pastaGroup.style.display = radio.value === 'yes' ? 'block' : 'none';
    });
  });
}

// --- RSVP form (Formspree placeholder) ---
const rsvpForm = document.getElementById('rsvp-form');
if (rsvpForm) {
  const successMsg = document.getElementById('rsvp-success');
  rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = rsvpForm.querySelector('[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Replace YOUR_FORM_ID with a real Formspree endpoint when ready
    const endpoint = rsvpForm.getAttribute('action');
    if (!endpoint || endpoint.includes('YOUR_FORM_ID')) {
      // Dev mode — just show success
      setTimeout(() => {
        rsvpForm.style.display = 'none';
        if (successMsg) successMsg.style.display = 'block';
      }, 800);
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(rsvpForm),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        rsvpForm.style.display = 'none';
        if (successMsg) successMsg.style.display = 'block';
      } else {
        btn.textContent = 'Try again';
        btn.disabled = false;
        alert('Something went wrong. Please try again or contact us directly.');
      }
    } catch {
      btn.textContent = 'Try again';
      btn.disabled = false;
      alert('Something went wrong. Please try again or contact us directly.');
    }
  });
}
