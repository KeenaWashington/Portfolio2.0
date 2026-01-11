document.addEventListener('DOMContentLoaded', () => {
  // ----------------------------
  // Navigation (mobile menu + hide on scroll)
  // ----------------------------
  (function navigationLogic() {
    const navToggle = document.getElementById('navToggle');
    const navClose = document.getElementById('navClose');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const body = document.body;
    const overlayLinks = document.querySelectorAll('.navigation-overlay-link');

    if (!navToggle || !navClose || !mobileOverlay) return;

    const openMenu = () => {
      mobileOverlay.classList.add('is-active');
      mobileOverlay.setAttribute('aria-hidden', 'false');
      navToggle.setAttribute('aria-expanded', 'true');
      body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      mobileOverlay.classList.remove('is-active');
      mobileOverlay.setAttribute('aria-hidden', 'true');
      navToggle.setAttribute('aria-expanded', 'false');
      body.style.overflow = '';
    };

    navToggle.addEventListener('click', openMenu);
    navClose.addEventListener('click', closeMenu);

    overlayLinks.forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileOverlay.classList.contains('is-active')) {
        closeMenu();
      }
    });

    let lastScroll = 0;
    const navWrapper = document.querySelector('.navigation-wrapper');

    window.addEventListener('scroll', () => {
      if (!navWrapper) return;

      const currentScroll = window.pageYOffset;
      if (currentScroll <= 0) {
        navWrapper.style.transform = 'translateY(0)';
        return;
      }

      if (currentScroll > lastScroll && !mobileOverlay.classList.contains('is-active')) {
        navWrapper.style.transform = 'translateY(-100%)';
      } else {
        navWrapper.style.transform = 'translateY(0)';
      }

      lastScroll = currentScroll;
    });
  })();

  // ----------------------------
  // Scroll reveal + form feedback + hero parallax
  // ----------------------------
  (function devswitchLogic() {
    // Intersection Observer for scroll reveals
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.timeline-card, .bento-cell').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
      revealObserver.observe(el);
    });

    // Simple form feedback
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', () => {
        const btn = contactForm.querySelector('button[type="submit"]');
        if (!btn) return;

        btn.textContent = 'Sending...';
        btn.style.opacity = '0.7';
        btn.style.pointerEvents = 'none';

        setTimeout(() => {
          btn.textContent = 'Message Sent!';
          btn.classList.replace('btn-primary', 'btn-accent');
        }, 1000);
      });
    }

    // Parallax effect for hero
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroMedia = document.querySelector('.hero-bg-image');
      if (heroMedia) {
        heroMedia.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    });
  })();

  // ----------------------------
  // Footer interactions (logo hover + arrow on links)
  // ----------------------------
  (function footerInteractions() {
    const footerLogo = document.querySelector('.footer-logo-icon');
    if (footerLogo) {
      footerLogo.addEventListener('mouseenter', () => {
        footerLogo.style.transform = 'scale(1.1) rotate(10deg)';
      });
      footerLogo.addEventListener('mouseleave', () => {
        footerLogo.style.transform = 'scale(1) rotate(0deg)';
      });
    }

    const footerLinks = document.querySelectorAll('.footer-nav-link');
    footerLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        // Prevent adding multiple arrows
        if (link.querySelector('.footer-hover-arrow')) return;

        const icon = document.createElement('span');
        icon.className = 'footer-hover-arrow';
        icon.textContent = ' →';
        icon.style.opacity = '0';
        icon.style.transition = 'opacity 0.2s ease';

        link.appendChild(icon);

        setTimeout(() => {
          icon.style.opacity = '1';
        }, 10);
      });

      link.addEventListener('mouseleave', () => {
        const icon = link.querySelector('.footer-hover-arrow');
        if (icon) icon.remove();
      });
    });
  })();
});
