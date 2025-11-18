// ===== ENHANCED NAVIGATION SYSTEM =====

document.addEventListener('DOMContentLoaded', function() {
    initCosmicNavigation();
    initQuickAccess();
    initSectionProgress();
    createCosmicParticles();
    initSmoothScrolling();
    initSectionObservers();
    initProjectPlanets();
    initSkillsAnimations();
    initContactForm();
    initTypingAnimation();
    initScrollAnimations();
});

function initCosmicNavigation() {
    const navOrb = document.querySelector('.nav-orb');
    const navPlanets = document.querySelectorAll('.nav-planet');

    // Central orb click - toggle navigation expansion
    if (navOrb) {
        navOrb.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            const navPlanetsContainer = document.querySelector('.nav-planets');
            if (navPlanetsContainer) {
                navPlanetsContainer.classList.toggle('expanded');
            }
            createSoundWave(this);
        });
    }

    // Planet click navigation
    navPlanets.forEach(planet => {
        planet.addEventListener('click', function(e) {
            e.stopPropagation();
            const section = this.getAttribute('data-section');
            navigateToSection(section);
            createSoundWave(this);
            activatePlanet(this);

            // Close navigation on mobile after click
            if (window.innerWidth <= 768) {
                closeNavigation();
            }
        });

        // Hover effects
        planet.addEventListener('mouseenter', function() {
            createParticleBurst(this);
        });
    });

    // Close navigation when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.cosmic-navigation')) {
            closeNavigation();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.altKey) {
            const key = e.key.toLowerCase();
            const sectionMap = {
                '1': 'home',
                '2': 'about',
                '3': 'skills',
                '4': 'projects',
                '5': 'contact'
            };

            if (sectionMap[key]) {
                navigateToSection(sectionMap[key]);
                closeNavigation();
            }
        }

        // Close navigation on Escape key
        if (e.key === 'Escape') {
            closeNavigation();
        }
    });
}

function closeNavigation() {
    const navOrb = document.querySelector('.nav-orb');
    const navPlanets = document.querySelector('.nav-planets');

    if (navOrb) navOrb.classList.remove('active');
    if (navPlanets) navPlanets.classList.remove('expanded');
}

function initQuickAccess() {
    const quickOrbs = document.querySelectorAll('.quick-orb');

    quickOrbs.forEach(orb => {
        orb.addEventListener('click', function(e) {
            e.stopPropagation();
            const section = this.getAttribute('data-section');
            navigateToSection(section);

            // Visual feedback
            this.classList.add('active');
            setTimeout(() => {
                this.classList.remove('active');
            }, 1000);

            createParticleBurst(this);
        });
    });
}

function initSectionProgress() {
    const progressDots = document.querySelectorAll('.progress-dot');

    progressDots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.stopPropagation();
            const section = this.getAttribute('data-section');
            navigateToSection(section);
        });
    });
}

function navigateToSection(section) {
    const targetSection = document.getElementById(section);
    if (targetSection) {
        // Smooth scroll to section
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Update active states
        updateActiveStates(section);

        // Create navigation effect
        createNavigationEffect(section);
    }
}

function updateActiveStates(activeSection) {
    // Update progress dots
    document.querySelectorAll('.progress-dot').forEach(dot => {
        const isActive = dot.getAttribute('data-section') === activeSection;
        dot.classList.toggle('active', isActive);

        // Add visual feedback for active dot
        if (isActive) {
            createDotPulse(dot);
        }
    });

    // Update nav planets
    document.querySelectorAll('.nav-planet').forEach(planet => {
        planet.classList.toggle('active', planet.getAttribute('data-section') === activeSection);
    });

    // Update progress bar position
    updateProgressBar(activeSection);
}

function updateProgressBar(section) {
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    const progress = (sections.indexOf(section) / (sections.length - 1)) * 100;
    const progressBar = document.querySelector('.progress-bar');

    if (progressBar) {
        progressBar.style.setProperty('--progress', `${progress}%`);
    }
}

function createNavigationEffect(section) {
    // Create portal effect
    const portal = document.createElement('div');
    portal.className = 'navigation-portal';
    portal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 0;
        height: 0;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0, 243, 255, 0.8) 0%, transparent 70%);
        z-index: 9999;
        pointer-events: none;
        animation: portal-open 0.6s ease-out;
    `;

    document.body.appendChild(portal);

    setTimeout(() => {
        if (portal.parentNode) {
            portal.remove();
        }
    }, 600);
}

function createSoundWave(element) {
    const soundWave = document.createElement('div');
    soundWave.className = 'sound-wave';
    element.appendChild(soundWave);

    setTimeout(() => {
        if (soundWave.parentNode) {
            soundWave.remove();
        }
    }, 500);
}

function createParticleBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 8; i++) {
        createParticle(centerX, centerY);
    }
}

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random direction and distance
    const angle = Math.random() * Math.PI * 2;
    const distance = 30 + Math.random() * 50;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    const duration = Math.random() * 1.5 + 0.5;
    const size = Math.random() * 3 + 2;

    particle.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: hsl(${Math.random() * 360}, 100%, 70%);
        animation-duration: ${duration}s;
        --tx: ${tx}px;
        --ty: ${ty}px;
    `;

    const particlesContainer = document.querySelector('.cosmic-particles') || createCosmicParticlesContainer();
    particlesContainer.appendChild(particle);

    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, duration * 1000);
}

function createCosmicParticlesContainer() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'cosmic-particles';
    document.body.appendChild(particlesContainer);
    return particlesContainer;
}

function createCosmicParticles() {
    const particlesContainer = createCosmicParticlesContainer();

    // Create initial particles
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createRandomParticle();
        }, i * 100);
    }

    // Continuous particle creation
    setInterval(createRandomParticle, 200);
}

function createRandomParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const startX = Math.random() * window.innerWidth;
    const size = Math.random() * 2 + 1;
    const duration = Math.random() * 4 + 3;

    // Random direction
    const tx = (Math.random() - 0.5) * 100;
    const ty = -100 - Math.random() * 50;

    particle.style.cssText = `
        left: ${startX}px;
        top: 100vh;
        width: ${size}px;
        height: ${size}px;
        background: hsl(${Math.random() * 360}, 100%, 70%);
        animation-duration: ${duration}s;
        --tx: ${tx}px;
        --ty: ${ty}px;
    `;

    const particlesContainer = document.querySelector('.cosmic-particles');
    if (particlesContainer) {
        particlesContainer.appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, duration * 1000);
    }
}

function initSmoothScrolling() {
    // Add smooth scrolling behavior to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Close mobile navigation if open
                    closeNavigation();
                }
            }
        });
    });
}

function initSectionObservers() {
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeSection = entry.target.id;
                updateActiveStates(activeSection);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

function createDotPulse(dot) {
    const pulse = document.createElement('div');
    pulse.className = 'dot-pulse';
    pulse.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 20px;
        height: 20px;
        border: 2px solid #00f3ff;
        border-radius: 50%;
        animation: dot-pulse-expand 0.6s ease-out forwards;
        pointer-events: none;
    `;

    dot.appendChild(pulse);

    setTimeout(() => {
        if (pulse.parentNode) {
            pulse.remove();
        }
    }, 600);
}

// Add dot pulse animation to CSS
const dotPulseStyle = document.createElement('style');
dotPulseStyle.textContent = `
    @keyframes dot-pulse-expand {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(dotPulseStyle);

// Mouse follower effect
document.addEventListener('mousemove', function(e) {
    const follower = document.querySelector('.mouse-follower') || createMouseFollower();
    follower.style.left = e.clientX + 'px';
    follower.style.top = e.clientY + 'px';
});

function createMouseFollower() {
    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    follower.style.cssText = `
        position: fixed;
        width: 15px;
        height: 15px;
        background: radial-gradient(circle, rgba(0, 243, 255, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(follower);
    return follower;
}

// Activate planet function
function activatePlanet(planet) {
    // Remove active class from all planets
    document.querySelectorAll('.nav-planet').forEach(p => {
        p.classList.remove('active');
    });

    // Add active class to clicked planet
    planet.classList.add('active');

    // Create activation effect
    createSoundWave(planet);
    createParticleBurst(planet);
}

// ===== PROJECT PLANETS FUNCTIONALITY =====
function initProjectPlanets() {
    // Project Data
    const projectsData = {
        1: {
            title: "Shoes Collection E-Commerce",
            description: "A full-stack e-commerce platform specializing in premium shoe collections with advanced filtering, secure payment integration, and comprehensive inventory management system.",
            image: document.querySelector('.planet-1 img')?.src || '',
            features: [
                "User authentication & authorization system",
                "Advanced product filtering & search functionality",
                "Shopping cart & wishlist management",
                "Secure payment integration with Stripe",
                "Order tracking & management system",
                "Admin dashboard for inventory control",
                "Product reviews and ratings",
                "Email notifications for orders"
            ],
            technologies: ["Python", "Django", "JavaScript", "PostgreSQL", "REST API", "Stripe", "HTML/CSS", "Bootstrap"],
            githubUrl: "https://github.com/BharatAmgain/E-commerce-.git"
        },
        2: {
            title: "Real-time Communication App",
            description: "A modern messaging application with real-time chat, video calls, and file sharing capabilities built with WebSocket technology for instant communication.",
            image: document.querySelector('.planet-2 img')?.src || '',
            features: [
                "Real-time messaging with WebSocket",
                "Video & voice call functionality",
                "File sharing & media support",
                "Group chats & channel management",
                "Message encryption & security",
                "Online/offline status indicators",
                "Message history & search",
                "Push notifications"
            ],
            technologies: ["Python", "Django", "WebSocket", "JavaScript", "Redis", "WebRTC", "HTML/CSS", "Django Channels"],
            githubUrl: "https://github.com/BharatAmgain/mini_messenger_app.git"
        },
        3: {
            title: "Canteen Management System",
            description: "A comprehensive management system for canteens with complete inventory tracking, order processing, billing, and reporting features.",
            image: document.querySelector('.planet-3 img')?.src || '',
            features: [
                "Inventory management & tracking system",
                "Online ordering with real-time updates",
                "Billing & payment processing",
                "Staff management with role-based access",
                "Sales reporting & analytics dashboard",
                "Low stock alerts & notifications",
                "Menu management & pricing",
                "Customer feedback system"
            ],
            technologies: ["HTML", "CSS", "JavaScript", "Django", "SQLite", "Bootstrap", "Chart.js", "jQuery"],
            githubUrl: "https://github.com/BharatAmgain/BharatAmgain-.git"
        }
    };

    const projectPlanets = document.querySelectorAll('.project-planet');

    projectPlanets.forEach(planet => {
        planet.addEventListener('click', function() {
            const projectId = this.classList[1].split('-')[1]; // Get planet number
            const project = projectsData[projectId];

            if (project) {
                openProjectModal(project);
            }
        });

        // Hover effects
        planet.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });

        planet.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
            }
        });
    });
}

function openProjectModal(project) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('projectModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'projectModal';
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3 id="modalTitle" class="text-2xl lg:text-3xl font-bold text-cyan-400"></h3>
                    <button id="closeModal" class="modal-close">
                        <i class="fas fa-times text-white text-xl"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="grid lg:grid-cols-2 gap-6 lg:gap-8">
                        <div class="modal-image-container">
                            <img id="modalImage" alt="Project Image" class="modal-image">
                        </div>
                        <div class="modal-details">
                            <p id="modalDescription" class="text-gray-300 mb-6 text-sm lg:text-base"></p>

                            <div class="key-features mb-6">
                                <h4 class="text-cyan-400 font-semibold mb-3 text-lg">Key Features</h4>
                                <ul id="modalFeatures" class="text-gray-300 text-sm lg:text-base space-y-2">
                                    <!-- Features will be populated by JavaScript -->
                                </ul>
                            </div>

                            <div class="tech-stack">
                                <h4 class="text-cyan-400 font-semibold mb-3 text-lg">Technology Stack</h4>
                                <div id="modalTech" class="tech-tags-modal">
                                    <!-- Tech tags will be populated by JavaScript -->
                                </div>
                            </div>

                            <div class="project-links mt-6 flex gap-4">
                                <button id="liveDemo" class="demo-btn">
                                    <i class="fas fa-external-link-alt mr-2"></i>
                                    Live Demo
                                </button>
                                <button id="sourceCode" class="code-btn">
                                    <i class="fab fa-github mr-2"></i>
                                    Source Code
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Add close functionality
        const closeBtn = modal.querySelector('#closeModal');
        closeBtn.addEventListener('click', closeProjectModal);

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeProjectModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeProjectModal();
            }
        });
    }

    // Populate modal with project data
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalDescription').textContent = project.description;
    document.getElementById('modalImage').src = project.image;
    document.getElementById('modalImage').alt = project.title;

    // Populate features
    const featuresList = document.getElementById('modalFeatures');
    featuresList.innerHTML = project.features.map(feature =>
        `<li class="flex items-start gap-2">
            <i class="fas fa-check text-green-400 mt-1 text-xs"></i>
            <span>${feature}</span>
        </li>`
    ).join('');

    // Populate technologies
    const techContainer = document.getElementById('modalTech');
    techContainer.innerHTML = project.technologies.map(tech =>
        `<span class="tech-tag-modal">${tech}</span>`
    ).join('');

    // Set up buttons
    const sourceCodeBtn = document.getElementById('sourceCode');
    sourceCodeBtn.onclick = () => window.open(project.githubUrl, '_blank');

    const liveDemoBtn = document.getElementById('liveDemo');
    liveDemoBtn.style.display = project.liveUrl ? 'block' : 'none';
    if (project.liveUrl) {
        liveDemoBtn.onclick = () => window.open(project.liveUrl, '_blank');
    }

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';

        // Remove modal after animation
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 300);
    }
}

// ===== SKILLS ANIMATIONS =====
function initSkillsAnimations() {
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.level-bar');
    const progressBars = document.querySelectorAll('.progress-fill');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                if (level) {
                    setTimeout(() => {
                        entry.target.style.width = level + '%';
                    }, 200);
                }

                // Animate progress bars
                if (entry.target.classList.contains('progress-fill')) {
                    const width = entry.target.getAttribute('data-width');
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 500);
                }
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
    progressBars.forEach(bar => observer.observe(bar));
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.querySelector('.holographic-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simple form validation
            const formData = new FormData(this);
            let isValid = true;

            for (let [key, value] of formData.entries()) {
                if (!value.trim()) {
                    isValid = false;
                    showFormError(`${key} is required`);
                    break;
                }
            }

            if (isValid) {
                // Simulate form submission
                showFormSuccess();
                this.reset();
            }
        });
    }
}

function showFormError(message) {
    // Create error notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    errorDiv.innerHTML = `
        <div class="flex items-center gap-2">
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(errorDiv);

    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

function showFormSuccess() {
    // Create success notification
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    successDiv.innerHTML = `
        <div class="flex items-center gap-2">
            <i class="fas fa-check-circle"></i>
            <span>Message sent successfully!</span>
        </div>
    `;

    document.body.appendChild(successDiv);

    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 5000);
}

// ===== TYPING ANIMATION =====
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-animation');
    if (typingElement) {
        // Typing animation is handled by CSS
        console.log('Typing animation initialized');
    }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
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

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.floating-text-block, .skill-item, .project-planet');
    animateElements.forEach(el => observer.observe(el));
}

// ===== MOBILE NAVIGATION INITIALIZATION =====
function initMobileNavigation() {
    // Add touch events for mobile
    const navOrb = document.querySelector('.nav-orb');
    if (navOrb) {
        navOrb.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            const navPlanetsContainer = document.querySelector('.nav-planets');
            if (navPlanetsContainer) {
                navPlanetsContainer.classList.toggle('expanded');
            }
            createSoundWave(this);
        });
    }

    // Close navigation when touching outside on mobile
    document.addEventListener('touchstart', function(e) {
        if (!e.target.closest('.cosmic-navigation')) {
            closeNavigation();
        }
    });
}

// Handle window resize
window.addEventListener('resize', function() {
    // Close navigation on mobile orientation change
    if (window.innerWidth <= 768) {
        closeNavigation();
    }
});

// Export functions for global access
window.Portfolio = {
    navigateToSection,
    closeNavigation,
    updateActiveStates,
    openProjectModal,
    closeProjectModal
};

// Initialize mobile navigation
initMobileNavigation();