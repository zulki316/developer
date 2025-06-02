// Project Preview Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Get project ID from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');
  
  if (!projectId) {
    console.error('No project ID provided');
    return;
  }
  
  // Fetch project data (simulated with sample data)
  const projectData = getProjectData(projectId);
  
  // Update page with project data
  updateProjectPage(projectData);
  
  // Set up image gallery
  setupGallery(projectData.gallery);
  
  // Set up related projects
  setupRelatedProjects(projectData.related);
});

// Simulated project data - in a real application, this would come from an API or database
function getProjectData(id) {
  // Sample project data
  const projects = {
    '1': {
      title: 'E-commerce Platform',
      subtitle: 'A modern e-commerce solution with seamless user experience',
      description: 'This comprehensive e-commerce platform provides businesses with a complete solution for selling products online. The project included custom product pages, shopping cart functionality, secure checkout, and an admin dashboard for inventory management.',
      challenge: 'The client needed a scalable e-commerce solution that could handle their growing product catalog while providing a seamless shopping experience across all devices. They also required integration with their existing inventory management system.',
      solution: 'I developed a custom e-commerce platform built on modern web technologies that prioritized performance and user experience. The solution included a responsive design, optimized product search functionality, and seamless payment gateway integration. The admin dashboard was designed to be intuitive and provide comprehensive analytics.',
      client: 'TechRetail Inc.',
      date: 'June 2024',
      category: 'Web Development',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'Stripe API'],
      liveLink: 'https://example.com/project1',
      githubLink: 'https://github.com/example/project1',
      featured: true,
      gallery: [
        'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/6634170/pexels-photo-6634170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      results: [
        { label: 'Performance', value: '95%', icon: 'icon-speed' },
        { label: 'Conversion Rate', value: '8.2%', icon: 'icon-chart' },
        { label: 'Page Views', value: '42K', icon: 'icon-eye' },
        { label: 'User Satisfaction', value: '4.9/5', icon: 'icon-smile' }
      ],
      testimonial: {
        quote: 'The e-commerce platform exceeded our expectations in every way. Sales have increased by 35% since launch, and customer feedback has been overwhelmingly positive. The admin dashboard has made inventory management incredibly efficient.',
        author: 'Sarah Johnson',
        position: 'CEO, TechRetail Inc.'
      },
      related: [2, 4, 7]
    },
    '2': {
      title: 'Fitness Tracker App',
      subtitle: 'A mobile application for tracking fitness goals and progress',
      description: 'This fitness tracking application allows users to set goals, track workouts, monitor nutrition, and view progress over time. It includes features like customizable workout plans, achievement badges, and social sharing capabilities.',
      challenge: 'The client wanted to create a fitness app that would stand out in a crowded market by offering more personalized experiences and better data visualization than competitors. They also needed a solution that would work across iOS and Android platforms.',
      solution: 'I developed a cross-platform mobile application with a focus on personalization and intuitive data visualization. The app uses machine learning to provide customized workout recommendations based on user progress and goals. Interactive charts and graphs make it easy for users to track their fitness journey.',
      client: 'FitLife Solutions',
      date: 'May 2024',
      category: 'App Development',
      technologies: ['React Native', 'Redux', 'Firebase', 'D3.js', 'TensorFlow Lite'],
      liveLink: 'https://example.com/project2',
      githubLink: 'https://github.com/example/project2',
      featured: true,
      gallery: [
        'https://images.pexels.com/photos/3775128/pexels-photo-3775128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/1756959/pexels-photo-1756959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/4498361/pexels-photo-4498361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      results: [
        { label: 'App Store Rating', value: '4.8/5', icon: 'icon-star' },
        { label: 'Downloads', value: '85K', icon: 'icon-download' },
        { label: 'Active Users', value: '42K', icon: 'icon-user' },
        { label: 'User Retention', value: '78%', icon: 'icon-repeat' }
      ],
      testimonial: {
        quote: 'The fitness app has been a game-changer for our business. User engagement is significantly higher than our previous app, and the personalized workout recommendations have received excellent feedback. The cross-platform functionality works flawlessly.',
        author: 'Michael Chen',
        position: 'Product Manager, FitLife Solutions'
      },
      related: [5, 8, 1]
    },
    // Additional project data would be added here...
  };
  
  return projects[id] || {
    title: 'Project Not Found',
    subtitle: 'The requested project could not be found',
    description: 'Please check the project ID and try again.',
    gallery: []
  };
}

// Update the page with project data
function updateProjectPage(project) {
  // Update page title
  document.title = `${project.title} - Project Details`;
  
  // Update project title and subtitle
  const titleContainer = document.getElementById('project-title-container');
  if (titleContainer) {
    titleContainer.innerHTML = `
      <h1>${project.title}</h1>
      <p class="project-subtitle">${project.subtitle}</p>
    `;
  }
  
  // Update project description
  const descriptionContent = document.getElementById('project-description-content');
  if (descriptionContent) {
    descriptionContent.innerHTML = `<p>${project.description}</p>`;
  }
  
  // Update challenge section
  const challengeContent = document.getElementById('project-challenge');
  if (challengeContent) {
    challengeContent.innerHTML = `<p>${project.challenge}</p>`;
  }
  
  // Update solution section
  const solutionContent = document.getElementById('project-solution');
  if (solutionContent) {
    solutionContent.innerHTML = `<p>${project.solution}</p>`;
  }
  
  // Update project meta information
  document.getElementById('project-client').textContent = project.client;
  document.getElementById('project-date').textContent = project.date;
  document.getElementById('project-category').textContent = project.category;
  
  // Update technologies
  const techContainer = document.getElementById('project-technologies');
  if (techContainer) {
    techContainer.innerHTML = project.technologies.map(tech => 
      `<span class="tech-tag">${tech}</span>`
    ).join('');
  }
  
  // Update project links
  const liveLink = document.getElementById('live-link');
  if (liveLink) {
    liveLink.href = project.liveLink;
  }
  
  const githubLink = document.getElementById('github-link');
  if (githubLink) {
    githubLink.href = project.githubLink;
  }
  
  // Update results section
  const resultsGrid = document.getElementById('project-results');
  if (resultsGrid && project.results) {
    resultsGrid.innerHTML = project.results.map(result => `
      <div class="result-card">
        <div class="result-icon">
          <i class="${result.icon}"></i>
        </div>
        <div class="result-number">${result.value}</div>
        <div class="result-label">${result.label}</div>
      </div>
    `).join('');
  }
  
  // Update testimonial
  if (project.testimonial) {
    document.getElementById('testimonial-quote').textContent = project.testimonial.quote;
    document.getElementById('testimonial-author').textContent = project.testimonial.author;
    document.getElementById('testimonial-position').textContent = project.testimonial.position;
  }
}

// Set up image gallery
function setupGallery(images) {
  if (!images || !images.length) return;
  
  // Set featured image
  const featuredImage = document.getElementById('featured-image');
  if (featuredImage) {
    featuredImage.src = images[0];
    featuredImage.alt = 'Project featured image';
  }
  
  // Create thumbnails
  const thumbnailGallery = document.getElementById('thumbnail-gallery');
  if (thumbnailGallery) {
    thumbnailGallery.innerHTML = images.map((image, index) => `
      <div class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
        <img src="${image}" alt="Thumbnail ${index + 1}">
      </div>
    `).join('');
    
    // Add click event to thumbnails
    const thumbnails = thumbnailGallery.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', () => {
        // Update featured image
        featuredImage.src = images[thumbnail.dataset.index];
        
        // Update active thumbnail
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnail.classList.add('active');
      });
    });
  }
}

// Set up related projects
function setupRelatedProjects(relatedIds) {
  if (!relatedIds || !relatedIds.length) return;
  
  const relatedGrid = document.getElementById('related-projects');
  if (!relatedGrid) return;
  
  // Get related project data (simplified for demo)
  const relatedProjects = relatedIds.map(id => getProjectData(id));
  
  // Create related project cards
  relatedGrid.innerHTML = relatedProjects.map(project => `
    <div class="project-card">
      <div class="project-image">
        <img src="${project.gallery[0]}" alt="${project.title}">
        <div class="project-overlay">
          <div class="project-category">${project.category}</div>
          <h3>${project.title}</h3>
          <a href="project-preview.html?id=${relatedIds[relatedProjects.indexOf(project)]}" class="btn btn-sm">View Details</a>
        </div>
      </div>
    </div>
  `).join('');
}