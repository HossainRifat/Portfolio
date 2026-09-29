const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  html.setAttribute('data-theme', savedTheme);
}

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    }
  });
});

// Scroll-driven UI: progress bar, nav background, active nav link
const scrollProgress = document.getElementById('scrollProgress');
const nav = document.querySelector('.nav');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function onScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';

  nav.classList.toggle('scrolled', scrollTop > 40);

  let current = '';
  sections.forEach(section => {
    if (scrollTop >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.section-head, .about-grid, .arch, .commit, #skills .panel, .svc, .research-grid, .contact-grid').forEach((el, index) => {
  el.classList.add('reveal');
  if (el.matches('.commit, .svc')) {
    el.classList.add(`reveal-delay-${(index % 5) + 1}`);
  }
  observer.observe(el);
});

// Count-up for numeric stats
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const finalValue = parseInt(el.dataset.count, 10);
    const duration = 900;
    const start = performance.now();

    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(finalValue * eased);
      if (t < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

if (!reduceMotion) {
  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));
}

// Hero terminal: type the command, then stream the response line by line.
// Lines keep their height while hidden, so nothing shifts during the animation.
const terminalBody = document.getElementById('terminal');
if (terminalBody && !reduceMotion) {
  const terminal = terminalBody.closest('.terminal');
  const lines = [...terminalBody.querySelectorAll('.ln')];
  const cmdLine = lines[0];
  const cmdText = cmdLine.querySelector('.t-cmd');
  const fullCommand = cmdText.textContent;

  terminal.classList.add('animating');
  cmdText.textContent = '';
  cmdLine.classList.add('shown');

  let charIndex = 0;
  function typeCommand() {
    if (charIndex < fullCommand.length) {
      cmdText.textContent += fullCommand.charAt(charIndex++);
      setTimeout(typeCommand, 28 + Math.random() * 40);
    } else {
      setTimeout(() => streamLines(1), 350);
    }
  }

  function streamLines(i) {
    if (i >= lines.length) return;
    lines[i].classList.add('shown');
    setTimeout(() => streamLines(i + 1), i < 4 ? 90 : 45);
  }

  setTimeout(typeCommand, 900);
}

// Local time in Dhaka
const clocks = document.querySelectorAll('.js-clock');
const shortFmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit' });
const longFmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit', second: '2-digit' });

function updateClocks() {
  const now = new Date();
  clocks.forEach(el => {
    el.textContent = el.dataset.format === 'long' ? longFmt.format(now) : shortFmt.format(now);
  });
}

updateClocks();
setInterval(updateClocks, 1000);
