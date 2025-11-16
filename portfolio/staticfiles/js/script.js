// ===== ENHANCED NAVIGATION SYSTEM =====

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

    // Central orb click - toggle navigation expansion
    if (navOrb) {
        navOrb.addEventListener('click', function() {
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
        planet.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            navigateToSection(section);
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

    for (let i = 0; i < 8; i++) {
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

    const particlesContainer = document.querySelector('.cosmic-particles') || createCosmicParticlesContainer();
    particlesContainer.appendChild(particle);

    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 2000);
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
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

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