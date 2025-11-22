// ==========================================
// PERSONA 5 ROYAL - UKRAINIAN LOCALIZATION
// JavaScript for interactivity and animations
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');

            // Animate menu toggle bars
            const spans = menuToggle.querySelectorAll('span');
            if (menuToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(9px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-9px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        const navLinkItems = navLinks.querySelectorAll('.nav-link');
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // ==========================================
    // PROGRESS BARS ANIMATION
    // ==========================================
    const progressCards = document.querySelectorAll('.progress-card');
    const overallFill = document.querySelector('.overall-fill');
    const overallPercent = document.querySelector('.overall-percent');

    // Progress values for each category
    const progressValues = {
        text: 85,
        textures: 72,
        models: 68
    };

    // Animate progress bar
    function animateProgress(element, targetValue) {
        const fill = element.querySelector('.progress-fill');
        const percentElement = element.querySelector('.progress-percent');

        if (!fill || !percentElement) return;

        let currentValue = 0;
        const increment = targetValue / 60; // 60 frames for smooth animation
        const duration = 1500; // 1.5 seconds
        const frameTime = duration / 60;

        fill.style.width = '0%';

        const interval = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(interval);
            }

            fill.style.width = currentValue + '%';
            percentElement.textContent = Math.round(currentValue) + '%';
        }, frameTime);
    }

    // Animate overall progress
    function animateOverallProgress(targetValue) {
        if (!overallFill || !overallPercent) return;

        let currentValue = 0;
        const increment = targetValue / 80; // Slower animation for overall
        const duration = 2000; // 2 seconds
        const frameTime = duration / 80;

        overallFill.style.width = '0%';

        const interval = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(interval);
            }

            overallFill.style.width = currentValue + '%';
            overallPercent.textContent = Math.round(currentValue) + '%';
        }, frameTime);
    }

    // ==========================================
    // INTERSECTION OBSERVER FOR SCROLL REVEALS
    // ==========================================
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Animate progress bars when they come into view
                if (entry.target.classList.contains('progress-card')) {
                    const category = entry.target.dataset.category;
                    const progress = progressValues[category];
                    if (progress) {
                        animateProgress(entry.target, progress);
                    }
                }

                // Animate overall progress
                if (entry.target.classList.contains('overall-progress')) {
                    const average = Math.round(
                        (progressValues.text + progressValues.textures + progressValues.models) / 3
                    );
                    animateOverallProgress(average);
                }

                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe progress cards
    progressCards.forEach(card => {
        card.classList.add('reveal');
        observer.observe(card);
    });

    // Observe overall progress
    if (overallFill) {
        const overallProgress = document.querySelector('.overall-progress');
        if (overallProgress) {
            overallProgress.classList.add('reveal');
            observer.observe(overallProgress);
        }
    }

    // ==========================================
    // GENERAL SCROLL REVEAL
    // ==========================================
    const revealElements = document.querySelectorAll('.section-header, .team-info, .team-stats, .download-content');

    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.p5r-nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // NAVBAR SCROLL EFFECT
    // ==========================================
    const nav = document.querySelector('.p5r-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove shadow on scroll
        if (currentScroll > 100) {
            nav.style.boxShadow = '0 8px 30px rgba(230, 0, 18, 0.5)';
        } else {
            nav.style.boxShadow = '0 4px 20px rgba(230, 0, 18, 0.3)';
        }

        lastScroll = currentScroll;
    });

    // ==========================================
    // PARALLAX EFFECT FOR HERO SECTION
    // ==========================================
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroCharacter = document.querySelector('.hero-character');

    window.addEventListener('scroll', () => {
        if (!heroSection) return;

        const scrolled = window.pageYOffset;
        const heroHeight = heroSection.offsetHeight;

        if (scrolled < heroHeight) {
            const opacity = 1 - (scrolled / heroHeight);

            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = opacity;
            }

            if (heroCharacter) {
                heroCharacter.style.transform = `translateY(${scrolled * 0.15}px)`;
            }
        }
    });

    // ==========================================
    // GLITCH EFFECT ON HOVER
    // ==========================================
    const glitchElements = document.querySelectorAll('.glitch');

    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.animation = 'none';
            setTimeout(() => {
                element.style.animation = '';
            }, 10);
        });
    });

    // ==========================================
    // DYNAMIC DATE UPDATE
    // ==========================================
    const updateDate = document.querySelector('.update-date');
    if (updateDate) {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = today.toLocaleDateString('uk-UA', options);
        updateDate.textContent = dateString;
    }

    // ==========================================
    // CURSOR TRAIL EFFECT (Optional - P5R Style)
    // ==========================================
    let cursorTrail = [];
    const maxTrailLength = 20;

    document.addEventListener('mousemove', (e) => {
        // Only on desktop
        if (window.innerWidth < 968) return;

        cursorTrail.push({
            x: e.clientX,
            y: e.clientY,
            time: Date.now()
        });

        // Keep trail length manageable
        if (cursorTrail.length > maxTrailLength) {
            cursorTrail.shift();
        }
    });

    // ==========================================
    // STATS COUNTER ANIMATION
    // ==========================================
    const statCards = document.querySelectorAll('.stat-card');

    function animateCounter(element, target) {
        const numberElement = element.querySelector('.stat-number');
        if (!numberElement) return;

        const originalText = numberElement.textContent;

        // Check if it's a number
        const numericValue = parseInt(originalText.replace(/\D/g, ''));
        if (isNaN(numericValue)) return;

        let currentValue = 0;
        const increment = numericValue / 60;
        const duration = 1500;
        const frameTime = duration / 60;

        const interval = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numericValue) {
                currentValue = numericValue;
                clearInterval(interval);
            }

            const displayValue = Math.round(currentValue);
            if (originalText.includes('K')) {
                numberElement.textContent = displayValue + 'K+';
            } else if (originalText.includes('∞')) {
                numberElement.textContent = '∞';
            } else {
                numberElement.textContent = displayValue + '+';
            }
        }, frameTime);
    }

    // Observe stat cards
    statCards.forEach(card => {
        card.classList.add('reveal');
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    animateCounter(entry.target);
                    statObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        statObserver.observe(card);
    });

    // ==========================================
    // BUTTON RIPPLE EFFECT
    // ==========================================
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-download, .social-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            // Prevent multiple ripples
            const existingRipple = this.querySelector('.ripple');
            if (existingRipple) {
                existingRipple.remove();
            }

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: rippleAnimation 0.6s ease-out;
            pointer-events: none;
        }

        @keyframes rippleAnimation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ==========================================
    // EASTER EGG: KONAMI CODE
    // ==========================================
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);

        // Keep only last 10 keys
        if (konamiCode.length > 10) {
            konamiCode.shift();
        }

        // Check if sequence matches
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            activateEasterEgg();
            konamiCode = [];
        }
    });

    function activateEasterEgg() {
        // Add special P5R effect
        document.body.style.animation = 'pulse 0.5s ease-in-out 3';

        // Show message
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #E60012;
            color: white;
            padding: 40px;
            font-family: 'Oswald', sans-serif;
            font-size: 2rem;
            font-weight: 900;
            text-align: center;
            z-index: 10000;
            clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px);
            box-shadow: 0 20px 60px rgba(230, 0, 18, 0.8);
        `;
        message.innerHTML = `
            <div>LOOKING COOL, JOKER!</div>
            <div style="font-size: 1rem; margin-top: 10px; font-weight: 400;">Ви знайшли пасхалку! 🎭</div>
        `;

        document.body.appendChild(message);

        setTimeout(() => {
            message.style.transition = 'opacity 0.5s ease-out';
            message.style.opacity = '0';
            setTimeout(() => message.remove(), 500);
        }, 3000);
    }

    // ==========================================
    // PERFORMANCE: REDUCE MOTION FOR USERS WHO PREFER IT
    // ==========================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        // Disable animations for users who prefer reduced motion
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        document.querySelectorAll('*').forEach(el => {
            el.style.animationDuration = '0.01ms';
            el.style.transitionDuration = '0.01ms';
        });
    }

    // ==========================================
    // LOG INITIALIZATION
    // ==========================================
    console.log('%c[P5R UA] 🎭 Persona 5 Royal - Ukrainian Localization', 'background: #E60012; color: white; font-size: 16px; padding: 10px; font-weight: bold;');
    console.log('%cСайт успішно завантажено!', 'color: #E60012; font-size: 14px;');
    console.log('%cСпасибі, що підтримуєте українську локалізацію! 💙💛', 'color: #0057B7; font-size: 14px;');
});

// ==========================================
// LOADING ANIMATION (Optional)
// ==========================================
window.addEventListener('load', () => {
    // Hide loading screen if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }

    // Trigger entry animations
    document.body.classList.add('loaded');
});
