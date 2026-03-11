// ============================================================
// Mahalaxmi Jewellers – main.js
// ============================================================

const WA_NUMBER = '919510036176';
const WA_MSG = encodeURIComponent('Hello Mahalaxmi Jewellers, I want to know more about your jewelry collection.');
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

// ---------- Scroll Progress Bar ----------
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (scrollProgress) scrollProgress.style.width = pct + '%';
}, { passive: true });

// ---------- Navbar scroll behavior ----------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ---------- Mobile menu toggle ----------
const menuBtn      = document.getElementById('menu-btn');
const mobileMenu   = document.getElementById('mobile-menu');
const menuClose    = document.getElementById('mobile-menu-close');

function openMenu() {
  mobileMenu.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobileMenu.classList.add('hidden');
  document.body.style.overflow = '';
}

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', openMenu);
  menuClose && menuClose.addEventListener('click', closeMenu);
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  // Close on outside tap
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMenu();
  });
}

// ---------- WhatsApp buttons ----------
document.querySelectorAll('[data-wa]').forEach(el => {
  el.addEventListener('click', () => window.open(WA_LINK, '_blank'));
});

// ---------- Floating WA button ----------
const waFloat = document.getElementById('wa-float');
if (waFloat) waFloat.addEventListener('click', () => window.open(WA_LINK, '_blank'));

// ---------- Scroll reveal (all types) ----------
const allReveal = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
allReveal.forEach(el => revealObserver.observe(el));

// ---------- Smooth scroll for nav links ----------
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---------- Active nav highlight ----------
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 130) current = sec.id;
  });
  navLinks.forEach(l => {
    l.style.color = l.getAttribute('href') === '#' + current ? 'var(--gold)' : '';
  });
}, { passive: true });

// ---------- Gallery lightbox ----------
const galleryItems  = document.querySelectorAll('.gallery-item img');
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

if (lightbox && lightboxImg) {
  galleryItems.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  });
  const closeLightbox = () => {
    lightbox.classList.add('hidden');
    document.body.style.overflow = '';
  };
  lightboxClose && lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
}

// ---------- Counter animation ----------
function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const suffix   = el.dataset.suffix || '';
  const scale    = parseInt(el.dataset.scale, 10) || 1;
  const duration = 1800;
  const step     = 16;
  const steps    = Math.round(duration / step);
  let current    = 0;

  el.classList.add('animating');
  const timer = setInterval(() => {
    current++;
    const value = Math.round((target / steps) * current);
    if (scale > 1) {
      el.textContent = Math.round(value / scale) + 'K+';
    } else {
      el.textContent = value + suffix;
    }
    if (current >= steps) {
      clearInterval(timer);
      el.textContent = scale > 1 ? Math.round(target / scale) + 'K+' : target + suffix;
      el.classList.remove('animating');
    }
  }, step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && e.target.dataset.target) {
      animateCounter(e.target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.count-val[data-target]').forEach(el => {
  counterObserver.observe(el);
});

// ---------- Lazy load images (polyfill) ----------
if (!('loading' in HTMLImageElement.prototype)) {
  const lazyImgs = document.querySelectorAll('img[loading="lazy"]');
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.src = e.target.dataset.src || e.target.src;
        imgObserver.unobserve(e.target);
      }
    });
  });
  lazyImgs.forEach(img => imgObserver.observe(img));
}

console.log('%c✨ Mahalaxmi Jewellers ✨', 'color:#C9A227;font-size:18px;font-weight:bold;');
