import { Application } from '@splinetool/runtime';

const canvasFeatures = document.getElementById('canvas3d-features');
const appFeatures = new Application(canvasFeatures);
appFeatures.load('https://prod.spline.design/kYw5tLgnIxObMlsM/scene.splinecode');

const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);
app.load('https://prod.spline.design/1T2Y38hPPXM8t0eC/scene.splinecode');

const canvasFull = document.getElementById('canvas3d-full');
const appFull = new Application(canvasFull);
appFull.load('https://prod.spline.design/sJoFNqFD9cPfOCsH/scene.splinecode');

// ========== SPLINE 3D LOAD HANDLING ==========
const splineViewer = document.getElementById('spline-viewer');
const heroFallback = document.getElementById('hero-fallback');

if (splineViewer) {
  // When the Spline scene successfully loads, fade out the fallback
  splineViewer.addEventListener('load', () => {
    console.log('Spline scene loaded successfully');
    if (heroFallback) {
      heroFallback.style.opacity = '0';
    }
  });
}

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ========== MOBILE NAV TOGGLE ==========
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// ========== SCROLL REVEAL ==========
const revealElements = document.querySelectorAll(
  '.feature-card, .testimonial-card, .stat-item, .section-header, .cta-card, .creator-card, .creators-3d'
);
revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ========== STAT COUNTER ANIMATION ==========
const statNumbers = document.querySelectorAll('.stat-number[data-target]');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const duration = 2000;
      const start = performance.now();
      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased).toLocaleString();
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => statObserver.observe(el));

// ========== SMOOTH ANCHOR SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
