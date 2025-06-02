// Animations JavaScript

// Element reveal on scroll
document.addEventListener('DOMContentLoaded', () => {
  // Add reveal class to elements that should animate on scroll
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    // Add reveal class to section headings
    const heading = section.querySelector('h2');
    if (heading && !heading.classList.contains('reveal')) {
      heading.classList.add('reveal');
    }
    
    // Add reveal class to cards with stagger effect
    const cards = section.querySelectorAll('.service-card, .project-card, .review-card, .education-item');
    
    cards.forEach((card, index) => {
      card.classList.add('reveal');
      card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add reveal classes to grid sections
    const grids = section.querySelectorAll('.services-grid, .projects-grid, .reviews-grid, .skills-wrapper');
    
    grids.forEach(grid => {
      grid.classList.add('reveal');
    });
  });
  
  // Hero content animations
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    const heroElements = heroContent.children;
    
    Array.from(heroElements).forEach((element, index) => {
      element.classList.add('slide-up');
      element.style.animationDelay = `${index * 0.2}s`;
    });
  }
  
  // Hero image animation
  const heroImage = document.querySelector('.hero-image');
  if (heroImage) {
    heroImage.classList.add('slide-in-right');
    heroImage.style.animationDelay = '0.4s';
  }
  
  // Animate timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  timelineItems.forEach((item, index) => {
    if (index % 2 === 0) {
      item.classList.add('reveal', 'slide-in-right');
    } else {
      item.classList.add('reveal', 'slide-in-left');
    }
    item.style.transitionDelay = `${index * 0.2}s`;
  });
  
  // Animate process steps
  const processSteps = document.querySelectorAll('.process-step');
  
  processSteps.forEach((step, index) => {
    step.classList.add('reveal');
    step.style.transitionDelay = `${index * 0.2}s`;
  });
});

// Parallax effect for hero section
function parallaxEffect() {
  const heroSection = document.querySelector('.hero');
  
  if (!heroSection) return;
  
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    heroSection.style.backgroundPosition = `center ${scrollPosition * 0.05}px`;
  });
}

parallaxEffect();

// Typing effect for text
function setupTypingEffect() {
  const typingElements = document.querySelectorAll('.typing-effect');
  
  typingElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    element.classList.add('typing');
    
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
        element.classList.remove('typing');
      }
    }, 100);
  });
}

// Call typing effect if elements with class exist
if (document.querySelector('.typing-effect')) {
  setupTypingEffect();
}

// Tilt effect for cards
function setupTiltEffect() {
  const cards = document.querySelectorAll('.service-card, .project-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      // Get position of mouse inside card
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate rotation
      const xRotation = (y - rect.height / 2) / (rect.height / 2) * -5;
      const yRotation = (x - rect.width / 2) / (rect.width / 2) * 5;
      
      // Apply transform
      card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });
}

// Only apply tilt effect on non-touch devices
if (!('ontouchstart' in window)) {
  setupTiltEffect();
}

// Scroll to section when clicking on navigation links
function smoothScrollToAnchor() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      // Only process links to anchor tags
      if (link.getAttribute('href').length > 1) {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Close mobile menu if open
          const navMenu = document.querySelector('.nav-menu');
          if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.querySelector('.nav-toggle').classList.remove('active');
          }
          
          // Scroll to target
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

smoothScrollToAnchor();

// Page transition effect
function setupPageTransitions() {
  const links = document.querySelectorAll('a:not([href^="#"]):not([target="_blank"])');
  
  links.forEach(link => {
    // Skip links with no href or external links
    if (!link.getAttribute('href') || link.getAttribute('href').startsWith('http')) return;
    
    link.addEventListener('click', e => {
      // Skip if modifier keys are pressed
      if (e.metaKey || e.ctrlKey) return;
      
      e.preventDefault();
      const targetHref = link.getAttribute('href');
      
      // Create transition element
      const transition = document.createElement('div');
      transition.classList.add('page-transition');
      document.body.appendChild(transition);
      
      // Animate transition
      setTimeout(() => {
        transition.classList.add('active');
      }, 10);
      
      // Navigate after animation completes
      setTimeout(() => {
        window.location.href = targetHref;
      }, 600);
    });
  });
  
  // Handle back navigation
  window.addEventListener('pageshow', e => {
    if (e.persisted) {
      // Page is loaded from cache (back button)
      const transition = document.createElement('div');
      transition.classList.add('page-transition', 'active');
      document.body.appendChild(transition);
      
      setTimeout(() => {
        transition.classList.add('exit');
        
        setTimeout(() => {
          transition.remove();
        }, 600);
      }, 10);
    }
  });
}

// Setup page transitions if not on a touch device
// Disable for now as it can cause issues with navigation
// if (!('ontouchstart' in window)) {
//   setupPageTransitions();
// }