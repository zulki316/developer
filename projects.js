// Projects Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Project filtering functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Get filter value
      const filterValue = button.getAttribute('data-filter');
      
      // Filter projects
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
  
  // Project hover effect with mouse movement
  projectCards.forEach(card => {
    const image = card.querySelector('img');
    
    card.addEventListener('mousemove', e => {
      // Calculate mouse position inside card (percentage)
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      // Limit movement range
      const moveX = x * 10 - 5; // -5px to 5px
      const moveY = y * 10 - 5; // -5px to 5px
      
      // Apply transform to image
      image.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
      image.style.transform = 'translate(0, 0) scale(1)';
    });
  });
  
  // Add animation to projects when they come into view
  const animateProjects = () => {
    const projects = document.querySelectorAll('.project-card:not(.animated)');
    
    projects.forEach((project, index) => {
      const rect = project.getBoundingClientRect();
      
      if (rect.top < window.innerHeight - 100) {
        // Stagger animation
        setTimeout(() => {
          project.classList.add('animated', 'fade-in');
        }, index * 100);
      }
    });
  };
  
  // Run on load and scroll
  animateProjects();
  window.addEventListener('scroll', animateProjects);
});