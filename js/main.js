/* ==========================================================================
   Currículo digital — Rafael Raunan da Silva
   Microinterações: typewriter, reveal on scroll, navbar, progresso, menu
   ========================================================================== */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Typewriter no hero ---------- */
  var roles = [
    'Suporte Técnico em T.I',
    'Programação para Web',
    'Automação Industrial',
    'Design Gráfico',
    'Desenvolvimento Web'
  ];

  var typewriterEl = document.getElementById('typewriter');

  if (typewriterEl && !prefersReducedMotion) {
    var roleIndex = 0;
    var charIndex = roles[0].length;
    var deleting = true;
    var TYPE_DELAY = 65;
    var DELETE_DELAY = 35;
    var HOLD_DELAY = 2200;

    var tick = function () {
      var current = roles[roleIndex];

      if (deleting) {
        charIndex--;
        typewriterEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(tick, 350);
          return;
        }
        setTimeout(tick, DELETE_DELAY);
      } else {
        current = roles[roleIndex];
        charIndex++;
        typewriterEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, HOLD_DELAY);
          return;
        }
        setTimeout(tick, TYPE_DELAY);
      }
    };

    setTimeout(tick, HOLD_DELAY);
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal, .lang-card');

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------- Navbar: fundo ao rolar + barra de progresso + botão topo ---------- */
  var navbar = document.getElementById('navbar');
  var progressBar = document.getElementById('scrollProgress');
  var backToTop = document.getElementById('backToTop');
  var scrollTicking = false;

  var onScroll = function () {
    var scrollY = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (navbar) {
      navbar.classList.toggle('is-scrolled', scrollY > 24);
    }

    if (progressBar) {
      var progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    }

    if (backToTop) {
      backToTop.classList.toggle('is-visible', scrollY > 600);
    }

    updateActiveLink(scrollY);
    scrollTicking = false;
  };

  window.addEventListener(
    'scroll',
    function () {
      if (!scrollTicking) {
        window.requestAnimationFrame(onScroll);
        scrollTicking = true;
      }
    },
    { passive: true }
  );

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Link ativo conforme a seção visível ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));

  function updateActiveLink(scrollY) {
    var offset = 120;
    var currentId = sections.length ? sections[0].id : null;

    sections.forEach(function (section) {
      if (scrollY + offset >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      var isActive = link.getAttribute('href') === '#' + currentId;
      link.classList.toggle('is-active', isActive);
    });
  }

  /* ---------- Menu mobile ---------- */
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    var closeMenu = function () {
      navMenu.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Abrir menu');
    };

    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    });

    navMenu.addEventListener('click', function (event) {
      if (event.target.closest('.nav__link')) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });
  }

  /* ---------- Ano dinâmico no rodapé ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------- Estado inicial ---------- */
  onScroll();
})();
