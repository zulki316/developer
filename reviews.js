// Reviews Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Reviews filtering functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const reviewCards = document.querySelectorAll('.review-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Get filter value
      const filterValue = button.getAttribute('data-filter');
      
      // Filter reviews
      reviewCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
  
  // Form submission handling
  const reviewForm = document.getElementById('review-form');
  
  if (reviewForm) {
    reviewForm.addEventListener('submit', e => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(reviewForm);
      const reviewData = {
        name: formData.get('name'),
        company: formData.get('company'),
        position: formData.get('position'),
        projectType: formData.get('project'),
        projectName: formData.get('project-name'),
        rating: formData.get('rating'),
        content: formData.get('review-content')
      };
      
      // Validate form
      if (!reviewData.name || !reviewData.projectType || !reviewData.projectName || !reviewData.rating || !reviewData.content) {
        alert('Please fill in all required fields');
        return;
      }
      
      // Simulate form submission
      const submitBtn = reviewForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
      
      // In a real application, this would send data to a server
      setTimeout(() => {
        // Create and add new review to the page
        addReviewToPage(reviewData);
        
        // Reset form
        reviewForm.reset();
        submitBtn.textContent = 'Review Submitted!';
        
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Review';
        }, 2000);
      }, 1500);
    });
  }
  
  // Function to add new review to the page (for demo purposes)
  function addReviewToPage(reviewData) {
    const reviewsGrid = document.querySelector('.reviews-grid');
    
    if (!reviewsGrid) return;
    
    // Create new review card
    const newReview = document.createElement('div');
    newReview.className = 'review-card';
    newReview.setAttribute('data-category', reviewData.projectType);
    
    // Format date
    const currentDate = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const formattedDate = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    
    // Generate stars based on rating
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= reviewData.rating) {
        stars += '<span class="star filled">★</span>';
      } else {
        stars += '<span class="star">★</span>';
      }
    }
    
    // Create review HTML
    newReview.innerHTML = `
      <div class="review-header">
        <div class="rating">
          ${stars}
        </div>
        <div class="review-date">${formattedDate}</div>
      </div>
      <div class="review-content">
        <blockquote>"${reviewData.content}"</blockquote>
      </div>
      <div class="reviewer">
        <div class="reviewer-info">
          <div class="reviewer-name">${reviewData.name}</div>
          <div class="reviewer-position">${reviewData.position ? reviewData.position + ', ' : ''}${reviewData.company || ''}</div>
        </div>
      </div>
      <div class="project-tag">${reviewData.projectName}</div>
    `;
    
    // Add to page with animation
    newReview.style.opacity = '0';
    newReview.style.transform = 'translateY(20px)';
    reviewsGrid.prepend(newReview);
    
    // Trigger animation
    setTimeout(() => {
      newReview.style.transition = 'all 0.5s ease';
      newReview.style.opacity = '1';
      newReview.style.transform = 'translateY(0)';
    }, 100);
  }
  
  // Animate review ratings on page load
  const animateRatings = () => {
    const ratings = document.querySelectorAll('.rating');
    
    ratings.forEach(rating => {
      const stars = rating.querySelectorAll('.star');
      
      stars.forEach((star, index) => {
        setTimeout(() => {
          star.style.transform = 'scale(1.2)';
          setTimeout(() => {
            star.style.transform = 'scale(1)';
          }, 200);
        }, index * 100);
      });
    });
  };
  
  // Run animation with delay after page load
  setTimeout(animateRatings, 500);
});