// Main JavaScript

// DOM Elements
const header = document.getElementById('header');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

// Mobile Navigation Toggle
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
}

// Header Scroll Effect
function handleScroll() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleScroll);

// Custom Cursor
function updateCursor(e) {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
  
  // Add a slight delay to follower for smooth effect
  setTimeout(() => {
    cursorFollower.style.left = `${e.clientX}px`;
    cursorFollower.style.top = `${e.clientY}px`;
  }, 70);
}

function cursorHover() {
  cursorFollower.classList.add('hover');
}

function cursorLeave() {
  cursorFollower.classList.remove('hover');
}

// Only enable custom cursor on non-touch devices
if (!('ontouchstart' in window)) {
  document.addEventListener('mousemove', updateCursor);
  
  // Add hover effect to links and buttons
  const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .project-card, .service-card');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', cursorHover);
    element.addEventListener('mouseleave', cursorLeave);
  });
} else {
  // Hide cursor elements on touch devices
  cursor.style.display = 'none';
  cursorFollower.style.display = 'none';
}

// Reveal animations on scroll
function reveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add('active');
    }
  }
}

window.addEventListener('scroll', reveal);
reveal(); // Initial check

// Accordion functionality
function setupAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    
    header.addEventListener('click', () => {
      // Toggle current item
      item.classList.toggle('active');
      
      // Close other items
      accordionItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
    });
  });
}

// Initialize accordions if they exist
if (document.querySelector('.accordion')) {
  setupAccordion();
}

// Testimonial slider
function setupTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  const prevBtn = document.querySelector('.prev-testimonial');
  const nextBtn = document.querySelector('.next-testimonial');
  
  if (!slides.length) return;
  
  let currentSlide = 0;
  
  function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentSlide = index;
  }
  
  function nextSlide() {
    let next = currentSlide + 1;
    if (next >= slides.length) next = 0;
    showSlide(next);
  }
  
  function prevSlide() {
    let prev = currentSlide - 1;
    if (prev < 0) prev = slides.length - 1;
    showSlide(prev);
  }
  
  // Event listeners
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
  }
  
  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });
  
  // Auto advance slides
  setInterval(nextSlide, 5000);
}

// Initialize testimonial slider if it exists
if (document.querySelector('.testimonial-slider')) {
  setupTestimonialSlider();
}

// Initialize skill bars animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  skillBars.forEach(bar => {
    const width = bar.style.width;
    
    // Reset width to animate from 0
    bar.style.width = '0';
    
    // Animate to target width
    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });
}

// Animate skills when in viewport
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  observer.observe(skillsSection);
}

// Back to top button
function setupBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  
  if (!backToTopBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

setupBackToTop();

// Form validation and submission
function setupForms() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic form validation
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });
      
      if (isValid) {
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        
        // Simulate success after delay
        setTimeout(() => {
          form.reset();
          submitBtn.textContent = 'Sent Successfully!';
          
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }, 2000);
        }, 1500);
      }
    });
  });
}

setupForms();