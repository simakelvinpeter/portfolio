// ===== GLOBAL VARIABLES =====
let themeToggle;

// ===== ENHANCED DOM INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen immediately
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
    
    // Initialize theme first
    initializeTheme();
    
    // Initialize other components
    setTimeout(() => {
        initializeAnimations();
        initializeTypingAnimation();
        initializeMagneticButtons();
        initializeFloatingIcons();
        initializeParallax();
    }, 100);
    
    console.log('Portfolio initialized successfully');
});

// Main initialization function
function initializePortfolio() {
    initializeNavigation();
    initializeTheme();
    initializeScrollEffects();
    initializeTypingAnimation();
    initializeAnimations();
    initializeProjectFilter();
    initializeContactForm();
    initializeCounters();
    initializeProfessionalFeatures();
    initializeThemeSystemDetection();
    
    console.log('Professional Portfolio initialized successfully!');
}

// ===== THEME SYSTEM DETECTION =====
function initializeThemeSystemDetection() {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addEventListener('change', (e) => {
        const savedTheme = localStorage.getItem('theme');
        if (!savedTheme) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
    
    // Add theme detection indicator
    addThemeIndicator();
}

function addThemeIndicator() {
    // Create theme indicator
    const indicator = document.createElement('div');
    indicator.id = 'theme-indicator';
    indicator.className = 'fixed bottom-4 left-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-lg px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 border border-white/30 dark:border-gray-700/50 shadow-lg opacity-0 pointer-events-none transition-all duration-300 z-40';
    
    document.body.appendChild(indicator);
    
    // Show indicator briefly on theme change
    function showThemeIndicator(theme) {
        indicator.textContent = `${theme === 'dark' ? '🌙' : '☀️'} ${theme.charAt(0).toUpperCase() + theme.slice(1)} mode`;
        indicator.style.opacity = '1';
        
        setTimeout(() => {
            indicator.style.opacity = '0';
        }, 2000);
    }
    
    // Update indicator on theme change
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                const isDark = document.documentElement.classList.contains('dark');
                showThemeIndicator(isDark ? 'dark' : 'light');
            }
        });
    });
    
    observer.observe(document.documentElement, { attributes: true });
}

// ===== LOADING SCREEN =====
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    if (loadingScreen) {
        // Hide loading screen after a short delay
        setTimeout(() => {
            loadingScreen.classList.add('opacity-0');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500); // Wait for transition to complete
        }, 1000); // Show loading for 1 second
    }
}

// ===== NAVIGATION =====
function initializeNavigation() {
    navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar?.classList.add('bg-white/90', 'dark:bg-gray-900/90', 'backdrop-blur-md');
            navbar?.classList.remove('bg-transparent');
        } else {
            navbar?.classList.remove('bg-white/90', 'dark:bg-gray-900/90', 'backdrop-blur-md');
            navbar?.classList.add('bg-transparent');
        }
    });
    
    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
        const isMenuOpen = navMenu?.classList.contains('translate-x-0');
        
        if (isMenuOpen) {
            navMenu?.classList.add('-translate-x-full');
            navMenu?.classList.remove('translate-x-0');
        } else {
            navMenu?.classList.remove('-translate-x-full');
            navMenu?.classList.add('translate-x-0');
        }
        
        // Animate hamburger
        const lines = navToggle.querySelectorAll('.hamburger-line');
        if (isMenuOpen) {
            lines[0]?.classList.remove('rotate-45', 'translate-y-2');
            lines[1]?.classList.remove('opacity-0');
            lines[2]?.classList.remove('-rotate-45', '-translate-y-2');
        } else {
            lines[0]?.classList.add('rotate-45', 'translate-y-2');
            lines[1]?.classList.add('opacity-0');
            lines[2]?.classList.add('-rotate-45', '-translate-y-2');
        }
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu?.classList.add('-translate-x-full');
            navMenu?.classList.remove('translate-x-0');
            
            // Reset hamburger
            const lines = navToggle?.querySelectorAll('.hamburger-line');
            lines?.[0]?.classList.remove('rotate-45', 'translate-y-2');
            lines?.[1]?.classList.remove('opacity-0');
            lines?.[2]?.classList.remove('-rotate-45', '-translate-y-2');
        });
    });
    
    // Smooth scrolling and active link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active section in navigation
    window.addEventListener('scroll', highlightActiveSection);
}

function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-blue-500');
        link.classList.add('text-gray-600', 'dark:text-gray-300');
        
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.remove('text-gray-600', 'dark:text-gray-300');
            link.classList.add('text-blue-500');
        }
    });
}

// ===== SIMPLIFIED THEME TOGGLE =====
function initializeTheme() {
    themeToggle = document.getElementById('theme-toggle');
    console.log('Theme toggle element found:', themeToggle);
    
    // Check for saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    console.log('Saved theme:', savedTheme);
    
    // Apply theme immediately
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        console.log('Applied dark theme');
    } else {
        document.documentElement.classList.remove('dark');
        console.log('Applied light theme');
    }
    
    // Add click listener
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        console.log('Theme toggle event listener added');
    } else {
        console.error('Theme toggle button not found!');
    }
    
    console.log('Theme initialized:', savedTheme);
}

function toggleTheme() {
    console.log('Toggle theme clicked!');
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    console.log('Current mode is dark:', isDark);
    
    if (isDark) {
        // Switch to light mode
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        console.log('Switched to light mode');
    } else {
        // Switch to dark mode
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        console.log('Switched to dark mode');
    }
    
    // Add button animation
    if (themeToggle) {
        themeToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    }
}

// ===== TYPING ANIMATION =====
function initializeTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const words = [
        'Digital Solutions Architect',
        'Full Stack Developer', 
        'Frontend Specialist', 
        'Backend Engineer',
        'UI/UX Designer',
        'Tech Innovation Leader'
    ];
    let currentWordIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentWord = words[currentWordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }
        
        let timeout = isDeleting ? 50 : 120;
        
        if (!isDeleting && currentCharIndex === currentWord.length) {
            timeout = 2500; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentWordIndex = (currentWordIndex + 1) % words.length;
            timeout = 500; // Pause before next word
        }
        
        setTimeout(type, timeout);
    }
    
    type();
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.remove('opacity-0', 'invisible');
                backToTopBtn.classList.add('opacity-100', 'visible');
            } else {
                backToTopBtn.classList.add('opacity-0', 'invisible');
                backToTopBtn.classList.remove('opacity-100', 'visible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== ANIMATIONS ON SCROLL =====
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                
                // Trigger specific animations
                if (entry.target.classList.contains('skill-progress')) {
                    animateSkillBar(entry.target);
                }
                
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.skill-item, .project-card, .stat-number, .progress-bar');
    animatedElements.forEach(el => observer.observe(el));
}

// ===== COUNTERS =====
function initializeCounters() {
    // Auto-count projects
    updateProjectsCount();
    
    const counters = document.querySelectorAll('[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => observer.observe(counter));
}

function updateProjectsCount() {
    // Count all projects with data-project attribute
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid) {
        const projectCount = projectsGrid.querySelectorAll('[data-project]').length;
        const projectsCounter = document.getElementById('projects-count');
        if (projectsCounter) {
            projectsCounter.setAttribute('data-count', projectCount);
        }
    }
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    if (isNaN(target) || target === 0) {
        element.textContent = '0';
        return;
    }
    
    const suffix = element.textContent.includes('%') ? '%' : '';
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const stepTime = duration / steps;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, stepTime);
}

// ===== SKILL BARS =====
function animateSkillBar(skillBar) {
    if (skillBar.classList.contains('animated')) return;
    
    const percentage = skillBar.getAttribute('data-percentage');
    if (percentage) {
        skillBar.style.width = percentage + '%';
        skillBar.classList.add('animated');
    }
}

// ===== PROJECT FILTER =====
function initializeProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => {
                b.classList.remove('bg-blue-500', 'text-white');
                b.classList.add('bg-gray-100', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
            });
            
            // Add active class to clicked button
            btn.classList.remove('bg-gray-100', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
            btn.classList.add('bg-blue-500', 'text-white');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category')?.split(' ') || [];
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                } else {
                    card.classList.add('hidden');
                    setTimeout(() => {
                        if (card.classList.contains('hidden')) {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    });
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateForm()) {
            submitForm();
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearError(input));
    });
}

function validateForm() {
    const form = document.getElementById('contact-form');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous error
    clearError(field);
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
        isValid = false;
    }
    
    // Email validation
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        }
    }
    
    // Show error if validation failed
    if (!isValid) {
        showError(field, errorMessage);
    }
    
    return isValid;
}

function showError(field, message) {
    field.classList.add('border-red-500');
    
    // Create or update error message
    let errorElement = document.getElementById(field.name + '-error');
    if (!errorElement) {
        errorElement = document.createElement('p');
        errorElement.id = field.name + '-error';
        errorElement.className = 'text-red-500 text-sm mt-1';
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearError(field) {
    field.classList.remove('border-red-500');
    const errorElement = document.getElementById(field.name + '-error');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function submitForm() {
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('.btn-icon');
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-75');
    btnText.textContent = 'Sending...';
    btnIcon.className = 'fas fa-spinner fa-spin';
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Reset form
        document.getElementById('contact-form').reset();
        
        // Show success message
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-75');
        btnText.textContent = 'Send Message';
        btnIcon.className = 'fas fa-paper-plane';
    }, 2000);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    } text-white`;
    
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <i class="fas ${type === 'success' ? 'fa-check' : type === 'error' ? 'fa-times' : 'fa-info'} w-5 h-5"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
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

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        navMenu?.classList.add('-translate-x-full');
        navMenu?.classList.remove('translate-x-0');
    }
});

// ===== PARALLAX EFFECT FOR HERO SECTION =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-bg');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===== PROFESSIONAL FEATURES =====
function initializeProfessionalFeatures() {
    initializeParallaxEffects();
    initializeMagneticButtons();
    initializeTextRevealAnimations();
    initializeCursorFollower();
    initializeScrollProgress();
    initializeSmoothScrolling();
    initializeAdvancedAnimations();
}

// ===== PARALLAX EFFECTS =====
function initializeParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        // Hero parallax
        const heroElements = document.querySelectorAll('.parallax-element');
        heroElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.2);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        // Background parallax
        const backgroundElements = document.querySelectorAll('.bg-parallax');
        backgroundElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// ===== MAGNETIC BUTTONS =====
function initializeMagneticButtons() {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0px, 0px)';
        });
    });
}

// ===== TEXT REVEAL ANIMATIONS =====
function initializeTextRevealAnimations() {
    const textElements = document.querySelectorAll('.text-reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.5 });
    
    textElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== CURSOR FOLLOWER =====
function initializeCursorFollower() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower fixed w-8 h-8 bg-blue-500/20 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-300';
    document.body.appendChild(cursor);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX - 16 + 'px';
        cursor.style.top = cursorY - 16 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Scale cursor on hover
    document.querySelectorAll('a, button, .cursor-hover').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// ===== SCROLL PROGRESS =====
function initializeScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50 transition-all duration-300';
    progressBar.style.width = '0%';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    // Add smooth scroll behavior to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ADVANCED ANIMATIONS =====
function initializeAdvancedAnimations() {
    // Stagger animations for cards
    const animatedCards = document.querySelectorAll('.stagger-animation');
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-fade-in');
                }, index * 100);
            }
        });
    }, { threshold: 0.3 });
    
    animatedCards.forEach(card => staggerObserver.observe(card));
    
    // Floating animations
    const floatingElements = document.querySelectorAll('.floating-animation');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
        element.classList.add('animate-bounce-slow');
    });
    
    // Rotate animations on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rotatingElements = document.querySelectorAll('.rotate-on-scroll');
        rotatingElements.forEach(element => {
            element.style.transform = `rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// ===== LOADING SCREEN =====
function initializeLoading() {
    loadingScreen = document.getElementById('loading-screen');
    
    // Simulate loading with typing effect
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.getAttribute('data-text');
        typeText(typingText, text, 50);
    }
    
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'auto';
            
            // Start other animations after loading
            setTimeout(() => {
                animateOnScroll();
                startCounters();
            }, 500);
        }
    }, 2000);
}

// ===== NAVIGATION =====
function initializeNavigation() {
    navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu?.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });
    
    // Smooth scrolling and active link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active section in navigation
    window.addEventListener('scroll', highlightActiveSection);
}

function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== CUSTOM CURSOR =====
function initializeCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (!cursor || !follower) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Smooth follow for cursor follower
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Add hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = 'var(--accent-text)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = 'var(--accent-text)';
        });
    });
}

// ===== TYPING ANIMATION =====
function initializeTypingAnimation() {
    const typingElement = document.querySelector('.typing-animation');
    if (!typingElement) return;
    
    const words = typingElement.getAttribute('data-words');
    if (!words) return;
    
    const wordsArray = JSON.parse(words);
    let currentWordIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentWord = wordsArray[currentWordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }
        
        let timeout = isDeleting ? 50 : 100;
        
        if (!isDeleting && currentCharIndex === currentWord.length) {
            timeout = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentWordIndex = (currentWordIndex + 1) % wordsArray.length;
        }
        
        setTimeout(type, timeout);
    }
    
    type();
}

function typeText(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    
    typing();
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Smooth scroll for anchor links
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
    
    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.style.display = 'flex';
                backToTopBtn.style.opacity = '1';
            } else {
                backToTopBtn.style.opacity = '0';
                setTimeout(() => {
                    if (window.scrollY <= 500) {
                        backToTopBtn.style.display = 'none';
                    }
                }, 300);
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== ANIMATIONS ON SCROLL =====
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Trigger specific animations
                if (entry.target.classList.contains('skill-item')) {
                    animateSkillBar(entry.target);
                }
                
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.skill-item, .project-card, .testimonial-card, .stat-number, .detail-item');
    animatedElements.forEach(el => observer.observe(el));
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.hero-content, .hero-visual');
    elements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateX(0)';
    });
}

// ===== COUNTERS =====
function initializeCounters() {
    // Counters will be started after loading screen
}

function startCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    counters.forEach(counter => {
        animateCounter(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const increment = target / 100;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('%') ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '+');
        }
    }, 20);
}

// ===== SKILL BARS =====
function initializeSkillBars() {
    // Skill bars will animate when scrolled into view
}

function animateSkillBar(skillItem) {
    const progressBar = skillItem.querySelector('.skill-progress');
    if (progressBar && !progressBar.classList.contains('animate')) {
        const width = progressBar.getAttribute('data-width');
        progressBar.style.setProperty('--width', width);
        progressBar.classList.add('animate');
    }
}

// ===== PROJECT FILTER =====
function initializeProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                } else {
                    card.classList.add('hidden');
                    setTimeout(() => {
                        if (card.classList.contains('hidden')) {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    });
}

// ===== TESTIMONIALS CAROUSEL =====
function initializeTestimonials() {
    const track = document.getElementById('testimonials-track');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    const totalTestimonials = document.querySelectorAll('.testimonial-card').length;
    
    if (!track || totalTestimonials === 0) return;
    
    function updateCarousel() {
        const translateX = -currentTestimonial * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentTestimonial);
        });
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        updateCarousel();
    }
    
    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
        updateCarousel();
    }
    
    // Event listeners
    nextBtn?.addEventListener('click', nextTestimonial);
    prevBtn?.addEventListener('click', prevTestimonial);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            updateCarousel();
        });
    });
    
    // Auto-play testimonials
    setInterval(nextTestimonial, 5000);
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateForm()) {
            submitForm();
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearError(input));
    });
}

function validateForm() {
    const form = document.getElementById('contact-form');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous error
    clearError(field);
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
        isValid = false;
    }
    
    // Email validation
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        }
    }
    
    // Show error if validation failed
    if (!isValid) {
        showError(field, errorMessage);
    }
    
    return isValid;
}

function showError(field, message) {
    field.classList.add('error');
    const errorElement = document.getElementById(field.name + '-error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearError(field) {
    field.classList.remove('error');
    const errorElement = document.getElementById(field.name + '-error');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function submitForm() {
    const submitBtn = document.getElementById('submit-btn');
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Reset form
        document.getElementById('contact-form').reset();
        
        // Show success message
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset button
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }, 2000);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '0.5rem',
        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// ===== PARALLAX EFFECTS =====
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax for hero background elements
        const heroParticles = document.querySelector('.hero-particles');
        const heroGrid = document.querySelector('.hero-grid');
        
        if (heroParticles) {
            heroParticles.style.transform = `translateY(${rate}px)`;
        }
        
        if (heroGrid) {
            heroGrid.style.transform = `translate(${rate * 0.1}px, ${rate * 0.1}px)`;
        }
        
        // Floating elements animation
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            const speed = 0.1 + (index * 0.05);
            card.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===== SKILLS CHART (Canvas) =====
function initializeSkillsChart() {
    const canvas = document.getElementById('skillsChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;
    
    const skills = [
        { name: 'JavaScript', value: 85, color: '#f7df1e' },
        { name: 'React', value: 90, color: '#61dafb' },
        { name: 'CSS', value: 95, color: '#1572b6' },
        { name: 'Node.js', value: 80, color: '#68a063' }
    ];
    
    let animationProgress = 0;
    
    function drawChart() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let startAngle = -Math.PI / 2;
        
        skills.forEach((skill, index) => {
            const sliceAngle = (skill.value / 100) * 2 * Math.PI * animationProgress;
            
            // Draw slice
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
            ctx.closePath();
            ctx.fillStyle = skill.color;
            ctx.fill();
            
            // Draw border
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 3;
            ctx.stroke();
            
            startAngle += sliceAngle;
        });
        
        // Draw center circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, 60, 0, 2 * Math.PI);
        ctx.fillStyle = 'var(--surface-bg)';
        ctx.fill();
        ctx.strokeStyle = 'var(--border-color)';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    function animateChart() {
        if (animationProgress < 1) {
            animationProgress += 0.02;
            drawChart();
            requestAnimationFrame(animateChart);
        }
    }
    
    // Start animation when chart comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateChart();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(canvas);
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add performance optimizations
const debouncedResize = debounce(() => {
    // Handle window resize
    console.log('Window resized');
}, 250);

const throttledScroll = throttle(() => {
    // Handle scroll events
}, 16);

window.addEventListener('resize', debouncedResize);
window.addEventListener('scroll', throttledScroll);

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        navToggle?.classList.remove('active');
        navMenu?.classList.remove('active');
    }
    
    // Arrow keys for testimonials
    if (e.key === 'ArrowLeft') {
        document.querySelector('.testimonial-prev')?.click();
    } else if (e.key === 'ArrowRight') {
        document.querySelector('.testimonial-next')?.click();
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('Portfolio Error:', e.error);
});

// ===== PERFORMANCE MONITORING =====
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart + 'ms');
        }, 0);
    });
}

// ===== CUSTOMER SATISFACTION RATING SYSTEM =====
function initializeSatisfactionRating() {
    const modal = document.getElementById('satisfaction-modal');
    const satisfactionStat = document.getElementById('satisfaction-stat');
    const cancelBtn = document.getElementById('cancel-rating');
    const submitBtn = document.getElementById('submit-rating');
    const starButtons = document.querySelectorAll('.star-rating');
    const levelButtons = document.querySelectorAll('.satisfaction-level');
    const commentField = document.getElementById('satisfaction-comment');
    
    let selectedRating = 0;
    let selectedLevel = 0;
    
    // Load saved ratings
    loadSatisfactionData();
    
    // Open modal
    satisfactionStat?.addEventListener('click', () => {
        modal.classList.remove('opacity-0', 'invisible');
        modal.querySelector('.bg-white').classList.remove('scale-95');
        modal.querySelector('.bg-white').classList.add('scale-100');
    });
    
    // Close modal
    cancelBtn?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    function closeModal() {
        modal.classList.add('opacity-0', 'invisible');
        modal.querySelector('.bg-white').classList.add('scale-95');
        modal.querySelector('.bg-white').classList.remove('scale-100');
        resetForm();
    }
    
    // Star rating interaction
    starButtons.forEach((star, index) => {
        star.addEventListener('click', () => {
            selectedRating = index + 1;
            updateStars(selectedRating);
            // Calculate level from stars (20% per star)
            selectedLevel = (selectedRating * 20);
            updateLevels(selectedLevel);
            submitBtn.disabled = false;
        });
        
        star.addEventListener('mouseenter', () => {
            updateStars(index + 1, true);
        });
        
        star.addEventListener('mouseleave', () => {
            updateStars(selectedRating);
        });
    });
    
    // Satisfaction level buttons
    levelButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            selectedLevel = parseInt(btn.dataset.level);
            updateLevels(selectedLevel);
            // Update stars based on level
            selectedRating = Math.ceil(selectedLevel / 20);
            updateStars(selectedRating);
            submitBtn.disabled = false;
        });
    });
    
    function updateStars(rating, hover = false) {
        starButtons.forEach((star, index) => {
            if (index < rating) {
                star.classList.remove('text-gray-300');
                star.classList.add('text-yellow-400');
            } else {
                star.classList.add('text-gray-300');
                star.classList.remove('text-yellow-400');
            }
        });
    }
    
    function updateLevels(level) {
        levelButtons.forEach(btn => {
            const btnLevel = parseInt(btn.dataset.level);
            if (btnLevel === level) {
                btn.classList.add('ring-2', 'ring-blue-500', 'bg-blue-50', 'dark:bg-blue-900/20');
            } else {
                btn.classList.remove('ring-2', 'ring-blue-500', 'bg-blue-50', 'dark:bg-blue-900/20');
            }
        });
    }
    
    // Submit rating
    submitBtn?.addEventListener('click', () => {
        if (selectedLevel > 0) {
            saveRating(selectedRating, selectedLevel, commentField.value);
            showNotification('Thank you for your feedback!', 'success');
            closeModal();
        }
    });
    
    function resetForm() {
        selectedRating = 0;
        selectedLevel = 0;
        updateStars(0);
        updateLevels(0);
        commentField.value = '';
        submitBtn.disabled = true;
    }
}

function saveRating(stars, level, comment) {
    // Get existing ratings
    let ratings = JSON.parse(localStorage.getItem('satisfactionRatings') || '[]');
    
    // Add new rating
    ratings.push({
        stars: stars,
        level: level,
        comment: comment,
        timestamp: new Date().toISOString()
    });
    
    // Save to localStorage
    localStorage.setItem('satisfactionRatings', JSON.stringify(ratings));
    
    // Update the display
    updateSatisfactionDisplay();
}

function loadSatisfactionData() {
    updateSatisfactionDisplay();
}

function updateSatisfactionDisplay() {
    const ratings = JSON.parse(localStorage.getItem('satisfactionRatings') || '[]');
    
    if (ratings.length > 0) {
        // Calculate average satisfaction
        const total = ratings.reduce((sum, rating) => sum + rating.level, 0);
        const average = Math.round(total / ratings.length);
        
        // Update the stat counter
        const statElement = document.querySelector('#satisfaction-stat [data-count]');
        if (statElement) {
            statElement.setAttribute('data-count', average);
            statElement.textContent = average;
        }
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-24 right-8 px-6 py-4 rounded-xl shadow-2xl z-50 transform transition-all duration-300 translate-x-full ${
        type === 'success' ? 'bg-green-500' : 'bg-blue-500'
    } text-white font-semibold`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize satisfaction rating when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeSatisfactionRating();
});

// Export functions for testing or external use
window.PortfolioAPI = {
    toggleTheme,
    showNotification,
    animateCounter,
    typeText,
    saveRating,
    loadSatisfactionData
};
