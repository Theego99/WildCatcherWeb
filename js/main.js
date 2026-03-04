/**
 * WildCatcher - Main JavaScript
 * Enhanced interactions and animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // Smooth Scroll for Anchor Links
  // ==========================================
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      if (href && href.length > 1) {
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
          e.preventDefault();
          
          const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
          const targetPosition = targetElement.offsetTop - navbarHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          const navbarCollapse = document.querySelector('.navbar-collapse');
          if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
              toggle: true
            });
          }
        }
      }
    });
  });

  // ==========================================
  // Scroll Animation Observer
  // ==========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        // Optionally unobserve after animation
        // animateOnScroll.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with animate-on-scroll class
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => animateOnScroll.observe(el));

  // ==========================================
  // Navbar Scroll Effect
  // ==========================================
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;
  let scrollTimer = null;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add shadow on scroll
    if (scrollTop > 50) {
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.boxShadow = 'none';
    }

    // Update active nav link based on scroll position
    if (scrollTimer) {
      clearTimeout(scrollTimer);
    }

    scrollTimer = setTimeout(() => {
      updateActiveNavLink();
    }, 100);

    lastScrollTop = scrollTop;
  });

  // ==========================================
  // Update Active Navigation Link
  // ==========================================
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
    
    let currentSection = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  // ==========================================
  // Animate Progress Ring (Species Accuracy)
  // ==========================================
  const progressRings = document.querySelectorAll('.progress-ring');
  
  const animateProgressRing = (ring) => {
    const circumference = 2 * Math.PI * 54; // radius is 54
    const percent = 95; // 95%+ accuracy
    const offset = circumference - (percent / 100) * circumference; // ~16.96 for 95%
    
    ring.style.strokeDasharray = `${circumference} ${circumference}`;
    ring.style.strokeDashoffset = circumference;
    
    // Trigger animation
    setTimeout(() => {
      ring.style.strokeDashoffset = offset;
    }, 300);
  };

  // Observe progress rings for animation
  const ringObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        animateProgressRing(entry.target);
        entry.target.dataset.animated = 'true';
      }
    });
  }, { threshold: 0.5 });

  progressRings.forEach(ring => ringObserver.observe(ring));

  // ==========================================
  // Performance Stats Counter Animation
  // ==========================================
  const statValues = document.querySelectorAll('.stat-value');
  
  const animateCounter = (element, target) => {
    const duration = 2000; // 2 seconds
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        // Handle percentage values
        if (target.toString().includes('%')) {
          element.textContent = Math.floor(current) + '%';
        } else {
          element.textContent = Math.floor(current) + '%';
        }
      }
    }, 16);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        const text = entry.target.textContent;
        const value = parseInt(text);
        if (!isNaN(value)) {
          animateCounter(entry.target, value);
          entry.target.dataset.animated = 'true';
        }
      }
    });
  }, { threshold: 0.5 });

  statValues.forEach(stat => statsObserver.observe(stat));

  // ==========================================
  // Carousel Auto-play Enhancement
  // ==========================================
  const carousel = document.querySelector('#heroCarousel');
  if (carousel) {
    // Pause carousel on hover
    carousel.addEventListener('mouseenter', () => {
      const bsCarousel = bootstrap.Carousel.getInstance(carousel);
      if (bsCarousel) {
        bsCarousel.pause();
      }
    });

    carousel.addEventListener('mouseleave', () => {
      const bsCarousel = bootstrap.Carousel.getInstance(carousel);
      if (bsCarousel) {
        bsCarousel.cycle();
      }
    });
  }

  // ==========================================
  // Pricing Card Hover Effect Enhancement
  // ==========================================
  const pricingCards = document.querySelectorAll('.pricing-card');
  
  pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      // Add subtle scale to non-highlighted cards
      if (!this.classList.contains('highlight')) {
        this.style.transform = 'translateY(-8px) scale(1.02)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      if (!this.classList.contains('highlight')) {
        this.style.transform = '';
      }
    });
  });

  // ==========================================
  // Feature Card Stagger Animation
  // ==========================================
  const featureCards = document.querySelectorAll('.feature-card');
  
  const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        featureObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    featureObserver.observe(card);
  });

  // ==========================================
  // Download Button Click Tracking (Optional)
  // ==========================================
  const downloadButtons = document.querySelectorAll('a[href*="download"], .download-btn');
  
  downloadButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      // Add download tracking animation
      const originalText = button.innerHTML;
      const isExternalLink = button.href && !button.href.includes('#');
      
      if (isExternalLink) {
        // Visual feedback
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
          button.style.transform = '';
        }, 150);
      }
      
      // You can add analytics tracking here
      console.log('Download initiated:', button.href);
    });
  });

  // ==========================================
  // Back to Top Button (if needed)
  // ==========================================
  const createBackToTop = () => {
    const button = document.createElement('button');
    button.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    `;
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'Back to top');
    
    // Add styles
    Object.assign(button.style, {
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, var(--accent), var(--accent-dim))',
      color: 'var(--forest-deepest)',
      border: 'none',
      cursor: 'pointer',
      opacity: '0',
      visibility: 'hidden',
      transition: 'all 0.3s ease',
      zIndex: '1000',
      boxShadow: '0 4px 16px var(--accent-glow)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    });
    
    document.body.appendChild(button);
    
    // Show/hide based on scroll
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        button.style.opacity = '1';
        button.style.visibility = 'visible';
      } else {
        button.style.opacity = '0';
        button.style.visibility = 'hidden';
      }
    });
    
    // Scroll to top on click
    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Hover effect
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-4px)';
      button.style.boxShadow = '0 8px 24px rgba(61, 214, 140, 0.25)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
      button.style.boxShadow = '0 4px 16px var(--accent-glow)';
    });
  };

  // Initialize back to top button
  createBackToTop();

  // ==========================================
  // Image Lazy Loading Enhancement
  // ==========================================
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
  }

  // ==========================================
  // Performance Optimization
  // ==========================================
  // Debounce function for scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // ==========================================
  // Accessibility Enhancements
  // ==========================================
  // Add focus visible class for keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });

  // ==========================================
  // Console Message
  // ==========================================
  console.log('%cWildCatcher', 'font-size: 24px; font-weight: bold; color: #3dd68c;');
  console.log('%c完全オフライン動作のAI野生動物調査ソフトウェア', 'font-size: 14px; color: #b8cec2;');
  console.log('%cCreated by Diego Alonso Cañizares', 'font-size: 12px; color: #8fa89d;');



  // ==========================================
  // Stats Banner Counter Animation
  // ==========================================
  const statBannerValues = document.querySelectorAll('.stat-banner-value');

  const animateStatBanner = (el) => {
    const text = el.textContent.trim();
    const num = parseFloat(text);
    if (isNaN(num)) return;
    const suffix = text.replace(String(num), '').replace(num.toString(), '');
    const duration = 1400;
    const steps = 50;
    const step = num / steps;
    let current = 0;
    let count = 0;
    const timer = setInterval(() => {
      count++;
      current = Math.min(current + step, num);
      el.textContent = (Number.isInteger(num) ? Math.round(current) : current.toFixed(0)) + suffix;
      if (count >= steps) {
        el.textContent = text; // restore original including any +
        clearInterval(timer);
      }
    }, duration / steps);
  };

  const bannerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateStatBanner(entry.target);
      }
    });
  }, { threshold: 0.8 });

  statBannerValues.forEach(el => bannerObserver.observe(el));

  // ==========================================
  // Initial Animations
  // ==========================================
  // Trigger initial animation check
  setTimeout(() => {
    updateActiveNavLink();
  }, 100);
});

// ==========================================
// Page Visibility API - Pause animations when tab is hidden
// ==========================================
document.addEventListener('visibilitychange', () => {
  const carousel = document.querySelector('#heroCarousel');
  if (carousel) {
    const bsCarousel = bootstrap.Carousel.getInstance(carousel);
    if (bsCarousel) {
      if (document.hidden) {
        bsCarousel.pause();
      } else {
        bsCarousel.cycle();
      }
    }
  }
});

// ==========================================
// Keyboard Navigation Enhancement
// ==========================================
document.addEventListener('keydown', (e) => {
  // Allow Escape key to close mobile menu
  if (e.key === 'Escape') {
    const navbarCollapse = document.querySelector('.navbar-collapse.show');
    if (navbarCollapse) {
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      if (bsCollapse) {
        bsCollapse.hide();
      }
    }
  }
});
