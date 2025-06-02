// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Form validation and submission
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        budget: formData.get('budget'),
        message: formData.get('message')
      };
      
      // Validate required fields
      if (!contactData.name || !contactData.email || !contactData.subject || !contactData.message) {
        showFormError('Please fill in all required fields');
        return;
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactData.email)) {
        showFormError('Please enter a valid email address');
        return;
      }
      
      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      
      // In a real application, this would send data to a server
      setTimeout(() => {
        // Show success message
        showFormSuccess('Your message has been sent successfully! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          
          // Remove success message after a delay
          setTimeout(() => {
            const successMessage = document.querySelector('.form-success');
            if (successMessage) {
              successMessage.remove();
            }
          }, 5000);
        }, 2000);
      }, 1500);
    });
  }
  
  // Show form error message
  function showFormError(message) {
    // Remove any existing error messages
    removeFormMessages();
    
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.textContent = message;
    
    // Insert before submit button
    const submitBtn = contactForm.querySelector('.form-submit');
    contactForm.insertBefore(errorDiv, submitBtn);
    
    // Highlight required fields
    const requiredFields = contactForm.querySelectorAll('[required]');
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        field.classList.add('error');
        
        // Remove error class on input
        field.addEventListener('input', () => {
          field.classList.remove('error');
        }, { once: true });
      }
    });
  }
  
  // Show form success message
  function showFormSuccess(message) {
    // Remove any existing messages
    removeFormMessages();
    
    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.style.padding = '16px';
    successDiv.style.marginBottom = '20px';
    successDiv.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
    successDiv.style.color = 'var(--color-success)';
    successDiv.style.borderRadius = 'var(--radius-lg)';
    successDiv.style.borderLeft = '4px solid var(--color-success)';
    successDiv.textContent = message;
    
    // Insert at the top of the form
    contactForm.prepend(successDiv);
    
    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  
  // Remove existing form messages
  function removeFormMessages() {
    const errorMessage = document.querySelector('.form-error');
    if (errorMessage) {
      errorMessage.remove();
    }
    
    const successMessage = document.querySelector('.form-success');
    if (successMessage) {
      successMessage.remove();
    }
  }
  
  // FAQ accordion functionality
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', () => {
      // Toggle current accordion item
      item.classList.toggle('active');
      
      // Close other accordion items
      accordionItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
    });
  });
  
  // Map loading animation (if there's a map)
  const mapContainer = document.querySelector('.map-container');
  if (mapContainer) {
    mapContainer.classList.add('fade-in');
  }
  
  // Animate contact icons on scroll
  function animateContactIcons() {
    const contactIcons = document.querySelectorAll('.contact-icon');
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('pulse');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    contactIcons.forEach(icon => {
      observer.observe(icon);
    });
  }
  
  animateContactIcons();
});