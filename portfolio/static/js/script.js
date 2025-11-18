// ===== MAIN SCRIPT.JS - ALL FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMatrixEffect();
    initOrbitalSkills();
    initCyberTerminal();
    initProgressBars();
    initFloatingElements();
    initSkillsSection();
    initTypingAnimation();
    initCircularImageEffects();
    initProjectPlanets();
    initContactForm();
    initScrollAnimations();
    initParallaxEffects();
});

// ===== MATRIX EFFECT =====
function initMatrixEffect() {
    const matrixBg = document.querySelector('.matrix-background');
    if (matrixBg) {
        // Create falling code characters
        for (let i = 0; i < 30; i++) {
            createMatrixChar();
        }
    }
}

function createMatrixChar() {
    const char = document.createElement('div');
    char.textContent = String.fromCharCode(0x30A0 + Math.random() * 96);
    char.style.cssText = `
        position: fixed;
        color: #00ff00;
        font-family: monospace;
        font-size: ${Math.random() * 8 + 8}px;
        left: ${Math.random() * 100}%;
        top: -20px;
        animation: matrix-fall ${Math.random() * 4 + 2}s linear infinite;
        opacity: ${Math.random() * 0.3 + 0.1};
        z-index: 1;
        pointer-events: none;
    `;
    document.body.appendChild(char);

    // Remove character after animation
    setTimeout(() => {
        if (char.parentNode) {
            char.remove();
        }
    }, 6000);
}

// Add matrix fall animation
const matrixStyle = document.createElement('style');
matrixStyle.textContent = `
    @keyframes matrix-fall {
        0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(matrixStyle);

// ===== ORBITAL SKILLS =====
function initOrbitalSkills() {
    const skills = [
        { name: 'Python', icon: 'python' },
        { name: 'Django', icon: 'python' },
        { name: 'ReactJS', icon: 'react' },
        { name: 'JavaScript', icon: 'js' },
        { name: 'HTML5', icon: 'html5' },
        { name: 'CSS3', icon: 'css3-alt' },
        { name: 'Tailwind CSS', icon: 'css3' },
        { name: 'Bootstrap', icon: 'bootstrap' },
        { name: 'Postman', icon: 'postman' },
        { name: 'Figma', icon: 'figma' },
        { name: 'PHP', icon: 'php' }
    ];

    const orbitContainer = document.querySelector('.orbiting-skills');
    if (orbitContainer) {
        orbitContainer.innerHTML = '';

        skills.forEach((skill, index) => {
            const angle = (index / skills.length) * 2 * Math.PI;
            const radius = 150;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            const skillOrb = document.createElement('div');
            skillOrb.className = `skill-orb orb-${index + 1}`;
            skillOrb.style.cssText = `
                transform: translate(${x}px, ${y}px);
                animation-duration: ${20 + index * 2}s;
            `;

            skillOrb.innerHTML = `
                <div class="skill-content">
                    <i class="fab fa-${skill.icon}"></i>
                    <span class="skill-name">${skill.name}</span>
                </div>
            `;

            orbitContainer.appendChild(skillOrb);
        });
    }
}

// ===== CYBER TERMINAL =====
function initCyberTerminal() {
    const terminalBody = document.querySelector('.terminal-body');
    if (!terminalBody) return;

    const messages = [
        { text: "Connection established...", delay: 1000 },
        { text: "Welcome to my contact terminal!", delay: 1500 },
        { text: "Ready to receive your message.", delay: 1000 },
        { text: "message_input:~$ ", delay: 500, isPrompt: true }
    ];

    let currentMessage = 0;

    function displayNextMessage() {
        if (currentMessage >= messages.length) return;

        const message = messages[currentMessage];
        const line = document.createElement('div');
        line.className = 'terminal-line';

        if (message.isPrompt) {
            line.innerHTML = `
                <span class="prompt">${message.text}</span>
                <span class="cursor">_</span>
            `;
        } else {
            line.innerHTML = `<span class="output">${message.text}</span>`;
        }

        terminalBody.appendChild(line);

        // Scroll to bottom
        terminalBody.scrollTop = terminalBody.scrollHeight;

        currentMessage++;
        if (currentMessage < messages.length) {
            setTimeout(displayNextMessage, message.delay);
        }
    }

    // Start terminal animation
    setTimeout(displayNextMessage, 1000);
}

// ===== PROGRESS BARS =====
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });

    // Animate skill level bars
    const levelBars = document.querySelectorAll('.level-bar');
    levelBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        setTimeout(() => {
            bar.style.width = level + '%';
        }, 800);
    });
}

// ===== FLOATING ELEMENTS =====
function initFloatingElements() {
    // Add floating animation to elements
    const floatingElements = document.querySelectorAll('.floating-text-block');
    floatingElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });

    // Animate tech elements
    const techElements = document.querySelectorAll('.tech-element');
    techElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.5}s`;
    });
}

// ===== SKILLS SECTION =====
function initSkillsSection() {
    animateSkillBars();
    initSkillInteractions();
    createFloatingParticles();
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.level-bar');

    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        setTimeout(() => {
            bar.style.width = level + '%';
        }, 500);
    });
}

function initSkillInteractions() {
    const skillItems = document.querySelectorAll('.skill-item, .skill-card');

    skillItems.forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            const skillType = this.getAttribute('data-skill');
            createSkillParticles(this);
            highlightRelatedSkills(skillType);
        });

        skill.addEventListener('mouseleave', function() {
            removeSkillHighlights();
        });

        // Click effect
        skill.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

function createSkillParticles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 8; i++) {
        createSkillParticle(centerX, centerY);
    }
}

function createSkillParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'skill-particle';
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: #00f3ff;
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 100;
        animation: skill-particle-float 1s ease-out forwards;
    `;

    document.body.appendChild(particle);

    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 1000);
}

// Add particle animation to CSS
const skillParticleStyle = document.createElement('style');
skillParticleStyle.textContent = `
    @keyframes skill-particle-float {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(skillParticleStyle);

function highlightRelatedSkills(skillType) {
    const relatedSkills = {
        'python': ['django', 'postgresql'],
        'django': ['python', 'postgresql'],
        'javascript': ['react', 'html', 'css'],
        'react': ['javascript', 'html', 'css'],
        'html': ['css', 'javascript'],
        'css': ['html', 'javascript']
    };

    const skillsToHighlight = relatedSkills[skillType] || [];

    skillsToHighlight.forEach(relatedSkill => {
        const elements = document.querySelectorAll(`[data-skill="${relatedSkill}"]`);
        elements.forEach(el => {
            el.style.background = 'rgba(0, 243, 255, 0.1)';
            el.style.borderColor = '#00f3ff';
        });
    });
}

function removeSkillHighlights() {
    const skillItems = document.querySelectorAll('.skill-item, .skill-card');
    skillItems.forEach(item => {
        item.style.background = '';
        item.style.borderColor = '';
    });
}

function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'skills-particles';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;

    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        skillsSection.appendChild(particlesContainer);

        // Create initial particles
        for (let i = 0; i < 15; i++) {
            createFloatingParticle(particlesContainer);
        }

        // Continuous particle creation
        setInterval(() => {
            createFloatingParticle(particlesContainer);
        }, 2000);
    }
}

function createFloatingParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 6 + 4;

    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${Math.random() > 0.5 ? '#00f3ff' : '#ff00ff'};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: -20px;
        animation: floating-particle ${duration}s linear forwards;
        opacity: ${Math.random() * 0.5 + 0.2};
    `;

    container.appendChild(particle);

    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, duration * 1000);
}

// Add floating particle animation to CSS
const floatingParticleStyle = document.createElement('style');
floatingParticleStyle.textContent = `
    @keyframes floating-particle {
        0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) translateX(${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(floatingParticleStyle);

// ===== TYPING ANIMATION =====
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-animation');
    if (typingElement) {
        // Typing animation is handled by CSS
        console.log('Typing animation initialized');
    }
}

// ===== CIRCULAR IMAGE EFFECTS =====
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

// ===== PARALLAX EFFECTS =====
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');

        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===== LOADING ANIMATIONS =====
window.addEventListener('load', function() {
    document.body.classList.add('loaded');

    // Remove loading spinner if exists
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

// ===== RESIZE HANDLER =====
window.addEventListener('resize', function() {
    // Reinitialize components on resize if needed
    initOrbitalSkills();
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
});

// Export functions for global access
window.Portfolio = {
    initMatrixEffect,
    initOrbitalSkills,
    initCyberTerminal,
    initProjectPlanets,
    openProjectModal,
    closeProjectModal
};