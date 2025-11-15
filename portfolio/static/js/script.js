// Enhanced Navigation System
document.addEventListener('DOMContentLoaded', function() {
    initCosmicNavigation();
    initQuickAccess();
    initSectionProgress();
    createCosmicParticles();
    initSmoothScrolling();
    initSectionObservers();
});

function initCosmicNavigation() {
    const navOrb = document.querySelector('.nav-orb');
    const navPlanets = document.querySelectorAll('.nav-planet');
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];

    // Central orb click - toggle navigation
    navOrb.addEventListener('click', function() {
        this.classList.toggle('active');
        document.querySelector('.nav-planets').classList.toggle('expanded');

        // Create sound wave effect
        createSoundWave(this);
    });

    // Planet click navigation
    navPlanets.forEach(planet => {
        planet.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            navigateToSection(section);

            // Visual feedback
            createSoundWave(this);
            activatePlanet(this);
        });

        // Hover effects
        planet.addEventListener('mouseenter', function() {
            createParticleBurst(this);
        });
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
            }
        }
    });
}

function initQuickAccess() {
    const quickOrbs = document.querySelectorAll('.quick-orb');

    quickOrbs.forEach(orb => {
        orb.addEventListener('click', function() {
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
    const progressBar = document.querySelector('.progress-bar');

    progressDots.forEach(dot => {
        dot.addEventListener('click', function() {
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
        dot.classList.toggle('active', dot.getAttribute('data-section') === activeSection);
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
    const progressBarFill = document.querySelector('.progress-bar::after');

    if (progressBarFill) {
        progressBarFill.style.height = `${progress}%`;
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
        portal.remove();
    }, 600);
}

function createSoundWave(element) {
    const soundWave = document.createElement('div');
    soundWave.className = 'sound-wave';
    element.appendChild(soundWave);

    setTimeout(() => {
        soundWave.remove();
    }, 500);
}

function createParticleBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 6; i++) {
        createParticle(centerX, centerY);
    }
}

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        animation-duration: ${Math.random() * 1.5 + 0.5}s;
    `;

    document.querySelector('.cosmic-particles').appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 2000);
}

function createCosmicParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'cosmic-particles';
    document.body.appendChild(particlesContainer);

    // Create initial particles
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            createRandomParticle();
        }, i * 80);
    }

    // Continuous particle creation
    setInterval(createRandomParticle, 150);
}

function createRandomParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const startX = Math.random() * window.innerWidth;
    const size = Math.random() * 2 + 1;
    const duration = Math.random() * 4 + 2;

    particle.style.cssText = `
        left: ${startX}px;
        top: 100vh;
        width: ${size}px;
        height: ${size}px;
        background: hsl(${Math.random() * 360}, 100%, 70%);
        animation-duration: ${duration}s;
        animation-delay: ${Math.random() * 1.5}s;
    `;

    document.querySelector('.cosmic-particles').appendChild(particle);

    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, duration * 1000);
}

function initSmoothScrolling() {
    // Add smooth scrolling behavior to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
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

                // Add section-specific effects
                addSectionEffects(activeSection);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

function addSectionEffects(section) {
    // Remove previous effects
    document.querySelectorAll('.section-effect').forEach(effect => effect.remove());

    // Add section-specific effects
    const effect = document.createElement('div');
    effect.className = `section-effect ${section}-effect`;

    switch(section) {
        case 'home':
            effect.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle at center, rgba(255, 107, 107, 0.1) 0%, transparent 50%);
                pointer-events: none;
                z-index: -1;
                animation: home-glow 4s ease-in-out infinite;
            `;
            break;
        case 'about':
            effect.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle at 30% 70%, rgba(78, 205, 196, 0.1) 0%, transparent 50%);
                pointer-events: none;
                z-index: -1;
                animation: about-glow 4s ease-in-out infinite;
            `;
            break;
        // Add more section effects as needed
    }

    document.body.appendChild(effect);
}

// Add CSS animations for new effects
const extraStyles = document.createElement('style');
extraStyles.textContent = `
    @keyframes portal-open {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 100vmax;
            height: 100vmax;
            opacity: 0;
        }
    }

    @keyframes home-glow {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.6; }
    }

    @keyframes about-glow {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }

    .navigation-portal {
        animation: portal-open 0.6s ease-out;
    }

    .nav-planets.expanded .nav-planet {
        animation: planet-expand 0.5s ease-out;
    }

    @keyframes planet-expand {
        0% {
            transform: scale(0);
            opacity: 0;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(extraStyles);

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
// Initialize Project Planets
function initProjectPlanets() {
    const projects = [
        {
            title: "Shoes Collection E-Commerce",
            description: "A full-stack e-commerce platform specializing in premium shoe collections with advanced filtering and secure payment integration.",
            technologies: ["Python", "Django", "React", "PostgreSQL", "Stripe API"],
            image: "/static/images/project1.jpeg"
        },
        {
            title: "Real-time Communication App",
            description: "A modern messaging application with real-time chat, video calls, and file sharing capabilities using WebSocket technology.",
            technologies: ["Python", "Django", "WebSocket", "JavaScript", "Redis"],
            image: "/static/images/project2.jpeg"
        },
        {
            title: "Canteen Management System",
            description: "A comprehensive management system for canteens with inventory tracking, order processing, and reporting features.",
            technologies: ["HTML", "CSS", "JavaScript", "Django", "SQLite"],
            image: "/static/images/project3.jpeg"
        }
    ];

    const universe = document.querySelector('.projects-universe');
    if (universe) {
        universe.innerHTML = '';

        projects.forEach((project, index) => {
            const angle = (index / projects.length) * 2 * Math.PI;
            const radius = 150;
            const x = Math.cos(angle) * radius + 200;
            const y = Math.sin(angle) * radius + 200;

            const planet = document.createElement('div');
            planet.className = `project-planet planet-${index + 1}`;
            planet.style.cssText = `
                left: ${x}px;
                top: ${y}px;
                animation-duration: ${20 + index * 5}s;
            `;

            planet.innerHTML = `
                <div class="planet-surface">
                    <div class="circular-image-container">
                        <img src="${project.image}" alt="${project.title}" class="circular-project-image">
                    </div>
                </div>
                <div class="project-info">
                    <h3 class="text-xl font-bold mb-2">${project.title}</h3>
                    <p class="text-gray-300 mb-3 text-sm">${project.description}</p>
                    <div class="tech-tags">
                        ${project.technologies.map(tech =>
                            `<span class="tech-tag">${tech}</span>`
                        ).join('')}
                    </div>
                </div>
                <div class="project-orbit" style="animation-duration: ${20 + index * 5}s;"></div>
            `;

            universe.appendChild(planet);
        });
    }
}

// Initialize Circular Image Effects
function initCircularImageEffects() {
    const circularImages = document.querySelectorAll('.circular-project-image, .circular-card-image img');

    circularImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });

        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Add to your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // ... your existing code ...

    initProjectPlanets();
    initCircularImageEffects();
});

// Initialize Project Planets with Key Features
function initProjectPlanets() {
    const projects = [
        {
            title: "Shoes Collection E-Commerce",
            description: "A full-stack e-commerce platform specializing in premium shoe collections with advanced filtering and secure payment integration.",
            features: [
                "User authentication & authorization",
                "Advanced product filtering & search",
                "Shopping cart & wishlist functionality",
                "Secure payment integration (Stripe)",
                "Order tracking & management",
                "Admin dashboard for inventory"
            ],
            technologies: ["Python", "Django", "JavaScript", "PostgreSQL", "REST API", "Stripe"],
            image: "/static/images/project1.jpeg"
        },
        {
            title: "Real-time Communication App",
            description: "A modern messaging application with real-time chat, video calls, and file sharing capabilities using WebSocket technology.",
            features: [
                "Real-time messaging with WebSocket",
                "Video & voice call functionality",
                "File sharing & media support",
                "Group chats & channels",
                "Message encryption & security",
                "Online/offline status indicators"
            ],
            technologies: ["Python", "Django", "WebSocket", "JavaScript", "Redis", "WebRTC"],
            image: "/static/images/project2.jpeg"
        },
        {
            title: "Canteen Management System",
            description: "A comprehensive management system for canteens with inventory tracking, order processing, and reporting features.",
            features: [
                "Inventory management & tracking",
                "Online ordering system",
                "Billing & payment processing",
                "Staff management & roles",
                "Sales reporting & analytics",
                "Low stock alerts & notifications"
            ],
            technologies: ["HTML", "CSS", "JavaScript", "Django", "SQLite", "Bootstrap"],
            image: "/static/images/project3.jpeg"
        }
    ];

    const universe = document.querySelector('.projects-universe');
    if (universe) {
        // Remove any existing content
        universe.innerHTML = '';

        // Create project planets
        projects.forEach((project, index) => {
            const planet = document.createElement('div');
            planet.className = `project-planet planet-${index + 1}`;

            // Generate features HTML
            const featuresHTML = project.features.map(feature => `
                <li class="flex items-start gap-2">
                    <i class="fas fa-check text-green-400 mt-1 text-xs"></i>
                    <span>${feature}</span>
                </li>
            `).join('');

            // Generate technologies HTML
            const techHTML = project.technologies.map(tech =>
                `<span class="tech-tag">${tech}</span>`
            ).join('');

            planet.innerHTML = `
                <div class="planet-surface">
                    <div class="circular-image-container">
                        <img src="${project.image}" alt="${project.title}" class="circular-project-image">
                    </div>
                </div>
                <div class="project-info">
                    <h3 class="text-xl lg:text-2xl font-bold mb-3">${project.title}</h3>
                    <p class="text-gray-300 mb-4 text-sm lg:text-base">${project.description}</p>

                    <div class="key-features mb-4">
                        <h4 class="text-cyan-400 font-semibold mb-2 text-sm lg:text-base">Key Features:</h4>
                        <ul class="text-gray-300 text-xs lg:text-sm space-y-1">
                            ${featuresHTML}
                        </ul>
                    </div>

                    <div class="tech-tags">
                        ${techHTML}
                    </div>
                </div>
            `;

            universe.appendChild(planet);
        });
    }
}

// Initialize Circular Image Effects
function initCircularImageEffects() {
    const circularImages = document.querySelectorAll('.circular-project-image');

    circularImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });

        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Add click functionality for mobile
function initProjectInteractions() {
    const projectPlanets = document.querySelectorAll('.project-planet');

    projectPlanets.forEach(planet => {
        planet.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.stopPropagation();
                const allInfos = document.querySelectorAll('.project-info');
                allInfos.forEach(info => {
                    info.style.opacity = '0';
                });

                const thisInfo = this.querySelector('.project-info');
                thisInfo.style.opacity = '1';
            }
        });
    });

    // Close project info when clicking outside
    document.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            const allInfos = document.querySelectorAll('.project-info');
            allInfos.forEach(info => {
                info.style.opacity = '0';
            });
        }
    });
}

// Add to your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // ... your existing code ...

    initProjectPlanets();
    initCircularImageEffects();
    initProjectInteractions();
});