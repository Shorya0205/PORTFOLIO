/*===== CORE FUNCTIONS =====*/
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/*===== MENU & NAVIGATION =====*/
// Removed showMenu and its call to avoid conflicts with new hamburger logic

/*===== SCROLL ACTIVE LINK =====*/
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    $$('section[id]').forEach(section => {
        const sectionTop = section.offsetTop - 50;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const link = $(`.nav__menu a[href*=${sectionId}]`);
        
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

/*===== TYPEWRITER EFFECT (About Section) =====*/
function startTypewriter() {
  const element = document.getElementById('typewriter');
  if (!element) return;
  const prefix = 'I am a ';
  const professions = [
    'UI/UX designer',
    'full stack web developer',
    'Problem solver'
  ];
  let profIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let cursorVisible = true;
  let cursorInterval;

  function updateText() {
    const currentProfession = professions[profIndex];
    let display = prefix + currentProfession.substring(0, charIndex);
    element.innerHTML = display + '<span class="typewriter-cursor">|</span>';
  }

  function blinkCursor() {
    const cursor = element.querySelector('.typewriter-cursor');
    if (cursor) {
      cursor.style.opacity = cursorVisible ? '1' : '0';
      cursorVisible = !cursorVisible;
    }
  }

  function type() {
    const currentProfession = professions[profIndex];
    if (!isDeleting) {
      if (charIndex < currentProfession.length) {
        charIndex++;
        updateText();
        setTimeout(type, 100);
      } else {
        setTimeout(() => {
          isDeleting = true;
          type();
        }, 1500);
      }
    } else {
      if (charIndex > 0) {
        charIndex--;
        updateText();
        setTimeout(type, 60);
      } else {
        isDeleting = false;
        profIndex = (profIndex + 1) % professions.length;
        setTimeout(type, 600);
      }
    }
  }

  updateText();
  clearInterval(cursorInterval);
  cursorInterval = setInterval(blinkCursor, 500);
  type();
}

/*===== SCROLL REVEAL =====*/
const sr = ScrollReveal({ origin: 'top', distance: '80px', duration: 2000, reset: true });

// Batch reveal animations
const revealConfigs = [
    { selector: '.home__title' },
    { selector: '.home__scroll', delay: 200 },
    { selector: '.home__img', origin: 'right', delay: 400 },
    { selector: '.about__img', delay: 500 },
    { selector: '.about__subtitle', delay: 300 },
    { selector: '.about__profession', delay: 400 },
    { selector: '.about__text', delay: 500 },
    { selector: '.about__social-icon', delay: 600, interval: 200 },
    { selector: '.about__detail', delay: 400, interval: 100 },
    { selector: '.skills__subtitle' },
    { selector: '.skills__box', delay: 200, interval: 200 },
    { selector: '.skills__img', delay: 400 },
    { selector: '.portfolio__img', interval: 200 },
    { selector: '.cta__title' },
    { selector: '.cta__text', delay: 200 },
    { selector: '.cta__buttons', delay: 400 },
    { selector: '.testimonials .section-title' },
    { selector: '.testimonial__card', delay: 200, interval: 200 },
    { selector: '.testimonials__more', delay: 600 },
    { selector: '.contact__subtitle' },
    { selector: '.contact__text', interval: 200 },
    { selector: '.contact__input', delay: 400 },
    { selector: '.contact__button', delay: 600 }
];

revealConfigs.forEach(config => sr.reveal(config.selector, config));

// Add ScrollReveal for nav links, hero buttons, and scroll down
sr.reveal('.nav__link', { interval: 100, delay: 200 });
sr.reveal('.home__button', { interval: 100, delay: 400 });
sr.reveal('.home__scroll-link', { delay: 600 });

/*===== SKILLS ANIMATION =====*/
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                $$('.skill__bar').forEach(bar => bar.style.width = bar.getAttribute('data-level') + '%');
            }, 500);
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if ($('#skills')) skillsObserver.observe($('#skills'));

/*===== CONTACT FORM =====*/
// Removed default handler to allow EmailJS to work

/*===== NOTIFICATIONS =====*/
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="bx ${type === 'success' ? 'bx-check-circle' : 'bx-error-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#2ecc71' : '#e74c3c',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        zIndex: '1000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px'
    });
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 5000);
}

/*===== ENHANCED INTERACTIONS =====*/
const initEnhancedInteractions = () => {
    // Button ripple effects
    const createRipple = (event) => {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        Object.assign(ripple.style, {
            position: 'absolute',
            width: size + 'px',
            height: size + 'px',
            left: (event.clientX - rect.left - size / 2) + 'px',
            top: (event.clientY - rect.top - size / 2) + 'px',
            background: 'rgba(255, 255, 255, 0.6)',
            borderRadius: '50%',
            transform: 'scale(0)',
            animation: 'ripple-animation 0.6s linear',
            pointerEvents: 'none'
        });
        
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    };
    
    // Apply to all buttons
    $$('.home__button, .nav__cta, .contact__button, .cta__button').forEach(btn => {
        btn.addEventListener('click', createRipple);
        btn.addEventListener('mouseenter', () => btn.style.transform = btn.style.transform + ' scale(1.02)');
        btn.addEventListener('mouseleave', () => btn.style.transform = btn.style.transform.replace(' scale(1.02)', ''));
    });
    
    // Scroll animations
    const scrollProgress = $('.scroll-progress-bar');
    window.addEventListener('scroll', () => {
        if (scrollProgress) {
            const scrollPercent = (window.pageYOffset / (document.body.offsetHeight - window.innerHeight)) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        }
    });
    
    // Smooth scroll
    $$('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = $(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                document.body.classList.add('scrolling');
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setTimeout(() => document.body.classList.remove('scrolling'), 1000);
            }
        });
    });
    
    // Parallax effects
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        $$('.floating-element, .bg-element').forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${-scrolled * speed}px)`;
        });
    });
    
    // Enhanced scroll indicator
    const scrollIndicator = $('.home__scroll-link');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('mouseenter', () => scrollIndicator.style.animation = 'enhanced-bounce 0.6s ease-in-out');
        scrollIndicator.addEventListener('mouseleave', () => scrollIndicator.style.animation = 'enhanced-bounce 2s infinite');
        scrollIndicator.addEventListener('click', () => {
            scrollIndicator.style.transform = 'scale(0.95)';
            setTimeout(() => scrollIndicator.style.transform = '', 150);
        });
    }
};

/*===== CSS INJECTION =====*/
const css = `
    @keyframes ripple-animation { to { transform: scale(4); opacity: 0; } }
    @keyframes button-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
    .ripple { position: absolute; border-radius: 50%; background: rgba(255, 255, 255, 0.6); transform: scale(0); animation: ripple-animation 0.6s linear; pointer-events: none; }
    .scrolling { pointer-events: none; }
    .scrolling * { pointer-events: none; }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = css;
document.head.appendChild(styleSheet);

/*===== INITIALIZATION =====*/
window.addEventListener('load', () => {
    startTypewriter();
    initEnhancedInteractions();
});

// Ripple effect for main buttons
function addRippleEffectToButtons() {
  const buttons = document.querySelectorAll('.home__button, .contact__button, .nav__cta');
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
}
document.addEventListener('DOMContentLoaded', addRippleEffectToButtons);

// ===== SKILLS ROTATOR FOR SPLINE OVERLAY =====
(function() {
  const skills = [
    'JavaScript',
    'React.js',
    'Node.js',
    'Express.js',
    'Python',
    'FastAPI',
    'MongoDB',
    'SQL',
    'Git',
    'C++'
  ];
  let idx = 0;
  const rotator = document.querySelector('.skills-rotator');
  if (!rotator) return;
  setInterval(() => {
    rotator.style.opacity = 0;
    setTimeout(() => {
      idx = (idx + 1) % skills.length;
      rotator.textContent = skills[idx];
      rotator.style.opacity = 1;
    }, 500);
  }, 2000);
})();

/*===== SCROLL ANIMATIONS =====*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add smooth scroll to all internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Enhanced navigation highlighting
    const navLinks = document.querySelectorAll('.nav__link');
    const sectionsById = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sectionsById.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Enhanced form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
            submitBtn.disabled = true;
            // Add logic to show 'Sent' after 2.5 seconds
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="bx bx-check"></i> Sent';
                submitBtn.disabled = false;
            }, 2500);
        });
    }
    
    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        });
    });
    
    // Enhanced button ripple effect
    const buttons = document.querySelectorAll('.nav__cta, .home__button, .contact__button, .cta__button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

/*===== ENHANCED SCROLL PROGRESS =====*/
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    if (scrollProgress) {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }
});

/*===== PERFORMANCE OPTIMIZATION =====*/
// Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Slideshow for first project card (gym)
document.addEventListener('DOMContentLoaded', function() {
  const gymImages = [
    'assets/gym1.webp',
    'assets/gym2.webp',
    'assets/gym3.webp'
  ];
  const imgEl = document.querySelector('.portfolio__img-slideshow');
  if (imgEl) {
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % gymImages.length;
      imgEl.src = gymImages[idx];
    }, 2000);
  }
});

// ===== GYM PROJECT SLIDESHOW =====
document.addEventListener('DOMContentLoaded', function() {
  const gymImages = [
    'assets/gym1.webp',
    'assets/gym2.webp',
    'assets/gym3.webp'
  ];
  const firstCard = document.querySelector('.portfolio__img-link');
  if (!firstCard) return;
  const img = firstCard.querySelector('.portfolio__img-slideshow');
  if (!img) return;
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % gymImages.length;
    img.src = gymImages[idx];
  }, 2000);
});

// Slideshow for second project card (petcare)
document.addEventListener('DOMContentLoaded', function() {
  const petImages = [
    'assets/pet1.webp',
    'assets/pet2.webp',
    'assets/pet3.webp'
  ];
  // Select the second .portfolio__img-link
  const allCards = document.querySelectorAll('.portfolio__img-link');
  if (allCards.length < 2) return;
  const petCard = allCards[1];
  // Try to find an <img> inside, or create one if only a placeholder exists
  let img = petCard.querySelector('img');
  if (!img) {
    img = document.createElement('img');
    img.alt = 'Petcare Project Screenshot';
    img.className = 'portfolio__img-slideshow';
    // Replace the placeholder div with the image
    const placeholder = petCard.querySelector('.portfolio__img-placeholder');
    if (placeholder) {
      petCard.replaceChild(img, placeholder);
    } else {
      petCard.insertBefore(img, petCard.firstChild);
    }
  }
  let idx = 0;
  img.src = petImages[0];
  setInterval(() => {
    idx = (idx + 1) % petImages.length;
    img.src = petImages[idx];
  }, 2000);
});

// Slideshow for third project card (menz/fashion)
document.addEventListener('DOMContentLoaded', function() {
  const fashionImages = [
    'assets/fashion1.webp',
    'assets/fashion2.webp',
    'assets/fashion3.webp'
  ];
  // Select the third .portfolio__img-link
  const allCards = document.querySelectorAll('.portfolio__img-link');
  if (allCards.length < 3) return;
  const fashionCard = allCards[2];
  // Try to find an <img> inside, or create one if only a placeholder exists
  let img = fashionCard.querySelector('img');
  if (!img) {
    img = document.createElement('img');
    img.alt = 'Fashion Project Screenshot';
    img.className = 'portfolio__img-slideshow';
    // Replace the placeholder div with the image
    const placeholder = fashionCard.querySelector('.portfolio__img-placeholder');
    if (placeholder) {
      fashionCard.replaceChild(img, placeholder);
    } else {
      fashionCard.insertBefore(img, fashionCard.firstChild);
    }
  }
  let idx = 0;
  img.src = fashionImages[0];
  setInterval(() => {
    idx = (idx + 1) % fashionImages.length;
    img.src = fashionImages[idx];
  }, 2000);
});

// Slideshow for fourth project card (blog/food)
document.addEventListener('DOMContentLoaded', function() {
  const foodImages = [
    'assets/food1.webp',
    'assets/food2.webp',
    'assets/food3.webp'
  ];
  // Select the fourth .portfolio__img-link
  const allCards = document.querySelectorAll('.portfolio__img-link');
  if (allCards.length < 4) return;
  const foodCard = allCards[3];
  // Try to find an <img> inside, or create one if only a placeholder exists
  let img = foodCard.querySelector('img');
  if (!img) {
    img = document.createElement('img');
    img.alt = 'Food/Blog Project Screenshot';
    img.className = 'portfolio__img-slideshow';
    // Replace the placeholder div with the image
    const placeholder = foodCard.querySelector('.portfolio__img-placeholder');
    if (placeholder) {
      foodCard.replaceChild(img, placeholder);
    } else {
      foodCard.insertBefore(img, foodCard.firstChild);
    }
  }
  let idx = 0;
  img.src = foodImages[0];
  setInterval(() => {
    idx = (idx + 1) % foodImages.length;
    img.src = foodImages[idx];
  }, 2000);
});

document.addEventListener('DOMContentLoaded', function() {
  // ===== EMAILJS CONTACT FORM =====
  if (window.emailjs) {
    emailjs.init("ipPFlbp2TxR-Sm_6R");
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        var status = document.getElementById('form-status');
        status.textContent = '';
        emailjs.sendForm('service_ixxymkc', 'template_ath9hwa', this)
          .then(function() {
            status.style.color = 'green';
            status.textContent = 'Message sent! ';
            contactForm.reset();
          }, function(error) {
            status.style.color = 'red';
            status.textContent = 'FAILED... ' + (error.text || JSON.stringify(error));
          });
      });
    }
  }

  // ===== FOOTER STATS COUNTING ANIMATION =====
  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      let displayValue = Math.floor(current);
      if (target === 100) {
        displayValue += '%';
      } else {
        displayValue += '+';
      }
      element.textContent = displayValue;
    }, 16);
  }
  // Use a lower threshold and rootMargin for mobile
  let observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };
  if (window.innerWidth <= 768) {
    observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    };
  }
  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll('.footer__stat-number');
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'));
          animateCounter(stat, target);
        });
        footerObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  const footer = document.querySelector('.footer');
  if (footer) {
    footerObserver.observe(footer);
  }

  // ===== BACK TO TOP BUTTON =====
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  window.scrollToTop = scrollToTop;
  window.addEventListener('scroll', function() {
    const btn = document.querySelector('.back-to-top');
    if (btn) {
      if (window.scrollY > 200) {
        btn.style.display = 'flex';
      } else {
        btn.style.display = 'none';
      }
    }
  });
});

// === Hero Quote Interactivity ===
document.addEventListener('DOMContentLoaded', function() {
  var quote = document.querySelector('.home__hero-quote blockquote');
  if (quote) {
    quote.addEventListener('click', function() {
      quote.classList.remove('wiggle-quote');
      // Restart animation
      void quote.offsetWidth;
      quote.classList.add('wiggle-quote');
    });
    quote.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        quote.classList.remove('wiggle-quote');
        void quote.offsetWidth;
        quote.classList.add('wiggle-quote');
      }
    });
    quote.setAttribute('tabindex', '0');
    quote.setAttribute('role', 'region');
    quote.setAttribute('aria-label', 'Inspirational quote');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Enhanced mobile menu
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navBackdrop = document.getElementById('nav-backdrop');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('show');
      navMenu.classList.toggle('show');
      document.body.classList.toggle('menu-open');
      // Optionally, toggle an 'active' class on the hamburger icon
      navToggle.classList.toggle('active', !isOpen);
    });

    if (navBackdrop) {
      navBackdrop.addEventListener('click', () => {
        navMenu.classList.remove('show');
        document.body.classList.remove('menu-open');
        navToggle.classList.remove('active');
      });
    }

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        document.body.classList.remove('menu-open');
        navToggle.classList.remove('active');
      });
    });
  }
});



