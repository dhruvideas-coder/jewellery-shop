// ============================================================
// Abhushan Jewellers – main.js
// ============================================================

const WA_NUMBER = '919999999999'; // Replace with actual WhatsApp number
const WA_MSG = encodeURIComponent('Hello Abhushan Jewellers, I want to know more about your jewelry collection.');
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

// ---------- Navbar scroll behavior ----------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ---------- Mobile menu toggle ----------
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = menuBtn.querySelector('svg');
    icon && icon.classList.toggle('rotate-90');
  });
  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.add('hidden'));
  });
}

// ---------- WhatsApp buttons ----------
document.querySelectorAll('[data-wa]').forEach(el => {
  el.addEventListener('click', () => window.open(WA_LINK, '_blank'));
});

// ---------- Floating WA button ----------
const waFloat = document.getElementById('wa-float');
if (waFloat) waFloat.addEventListener('click', () => window.open(WA_LINK, '_blank'));

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => observer.observe(el));

// ---------- Hero parallax on scroll ----------
const heroImg = document.querySelector('.hero-img');
if (heroImg) {
  window.addEventListener('scroll', () => {
    heroImg.style.transform = `translateY(${window.scrollY * 0.25}px)`;
  }, { passive: true });
}

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
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(l => {
    l.style.color = l.getAttribute('href') === '#' + current ? 'var(--gold)' : '';
  });
}, { passive: true });

// ---------- Gallery lightbox ----------
const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
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

// ---------- Lazy load images ----------
if ('loading' in HTMLImageElement.prototype) {
  // Native lazy loading supported, already set via HTML attribute
} else {
  // Polyfill for older browsers
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

console.log('%c✨ Abhushan Jewellers ✨', 'color:#C9A227;font-size:18px;font-weight:bold;');
