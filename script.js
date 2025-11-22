// ==========================================
// PERSONA 5 ROYAL - AUTHENTIC STYLE
// JavaScript for animations
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // PROGRESS BARS ANIMATION
    // ==========================================
    const progressBars = document.querySelectorAll('.progress-bar');
    const overallFill = document.querySelector('.overall-fill');

    // Animate individual progress bars
    function animateProgressBar(bar) {
        const targetValue = parseInt(bar.getAttribute('data-progress'));
        const fill = bar.querySelector('.bar-fill');
        const percent = bar.querySelector('.bar-percent');

        if (!fill || !percent) return;

        // Animate width
        setTimeout(() => {
            fill.style.width = targetValue + '%';
        }, 100);

        // Animate number count
        let currentValue = 0;
        const increment = targetValue / 60;
        const duration = 1500;
        const frameTime = duration / 60;

        const interval = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(interval);
            }
            percent.textContent = Math.round(currentValue) + '%';
        }, frameTime);
    }

    // Animate overall progress
    function animateOverallProgress() {
        if (!overallFill) return;

        const targetValue = parseInt(overallFill.style.width);
        if (!targetValue) {
            // Calculate from existing inline style if set
            const match = overallFill.style.width.match(/(\d+)%/);
            if (match) {
                setTimeout(() => {
                    overallFill.style.width = match[1] + '%';
                }, 200);
            }
        }
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
                if (entry.target.classList.contains('progress-bar')) {
                    animateProgressBar(entry.target);
                }

                // Animate overall progress
                if (entry.target.classList.contains('overall-progress')) {
                    animateOverallProgress();
                }

                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all progress bars
    progressBars.forEach(bar => {
        observer.observe(bar);
    });

    // Observe overall progress
    const overallProgress = document.querySelector('.overall-progress');
    if (overallProgress) {
        observer.observe(overallProgress);
    }

    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const targetPosition = target.offsetTop - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // BUTTON RIPPLE EFFECT
    // ==========================================
    const buttons = document.querySelectorAll('.btn-main, .btn-download, .social-btn');

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
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
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
    }

    // ==========================================
    // PERFORMANCE: REDUCE MOTION FOR USERS WHO PREFER IT
    // ==========================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        // Disable animations for users who prefer reduced motion
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
// LOADING ANIMATION
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
