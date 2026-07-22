/* ---- Footer year ---- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---- Fade-in sections on scroll ---- */
const sections = document.querySelectorAll('.fade-section');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });
sections.forEach(section => fadeObserver.observe(section));

/* ---- Active nav link highlighting ---- */
const navLinks = document.querySelectorAll('.nav-link');
const navSections = document.querySelectorAll('section[id]');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-45% 0px -45% 0px' });
navSections.forEach(section => navObserver.observe(section));

/* ---- Scroll progress bar + back-to-top visibility ---- */
const progressBar = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
  backToTop.classList.toggle('visible', scrollTop > 400);
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---- Theme toggle (persisted) ---- */
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') root.setAttribute('data-theme', 'light');
themeToggle.addEventListener('click', () => {
  const isLight = root.getAttribute('data-theme') === 'light';
  if (isLight) {
    root.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    root.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});

/* ---- Mobile nav toggle ---- */
const navToggle = document.getElementById('navToggle');
const navbar = document.querySelector('.navbar');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---- Cursor-following glow + tilt on avatar ---- */
const avatar = document.getElementById('avatar');
const heroSection = document.querySelector('.hero');
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches === false) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = avatar.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 260;
    const strength = Math.max(0, 1 - dist / maxDist);
    avatar.style.setProperty('--glow-x', `${50 + (dx / maxDist) * 30}%`);
    avatar.style.setProperty('--glow-y', `${50 + (dy / maxDist) * 30}%`);
    avatar.style.setProperty('--glow-strength', strength.toFixed(2));
    avatar.style.setProperty('--tilt-x', `${(dy / maxDist) * -8}deg`);
    avatar.style.setProperty('--tilt-y', `${(dx / maxDist) * 8}deg`);
  });
  heroSection.addEventListener('mouseleave', () => {
    avatar.style.setProperty('--tilt-x', '0deg');
    avatar.style.setProperty('--tilt-y', '0deg');
    avatar.style.setProperty('--glow-strength', '0');
  });
}