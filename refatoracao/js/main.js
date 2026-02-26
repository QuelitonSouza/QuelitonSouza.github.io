/* ============================================
   QUELITON SOUZA — PORTFOLIO JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initNav();
  initScrollAnimations();
  initCounterAnimation();
  initSmoothScroll();
});

/* ---------- NAVIGATION ---------- */
function initNav() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  const links = menu.querySelectorAll('.nav-link');

  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    nav.classList.toggle('nav--scrolled', current > 50);
    lastScroll = current;
  }, { passive: true });

  // Mobile toggle
  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains('active')) {
      menu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* ---------- SCROLL ANIMATIONS ---------- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger delay based on sibling index
        const siblings = entry.target.parentElement.querySelectorAll('[data-animate]');
        const siblingIndex = Array.from(siblings).indexOf(entry.target);
        const delay = siblingIndex * 100;

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ---------- COUNTER ANIMATION ---------- */
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-count'));
          animateCounter(counter, target);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  if (counters.length > 0) {
    observer.observe(counters[0].closest('.hero-stats'));
  }
}

function animateCounter(element, target) {
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);

    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* ---------- SMOOTH SCROLL ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
