// ==========================================
// PERSONA 5 ROYAL - OFFICIAL STYLE
// Animated Progress & Interactions
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // PROGRESS BAR ANIMATIONS
    // ==========================================
    function animateProgressBars() {
        const progressFills = document.querySelectorAll('.progress-fill');
        const overallFill = document.querySelector('.overall-fill');

        // Animate individual progress bars
        progressFills.forEach(fill => {
            const targetWidth = fill.getAttribute('data-progress');
            if (targetWidth) {
                setTimeout(() => {
                    fill.style.width = targetWidth + '%';
                }, 200);
            }
        });

        // Animate overall progress
        if (overallFill) {
            const targetWidth = overallFill.getAttribute('data-progress');
            if (targetWidth) {
                setTimeout(() => {
                    overallFill.style.width = targetWidth + '%';
                }, 400);
            }
        }
    }

    // ==========================================
    // INTERSECTION OBSERVER - Scroll Animations
    // ==========================================
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class for fade-in
                entry.target.classList.add('active');

                // Trigger progress bar animations when section is visible
                if (entry.target.classList.contains('progress-showcase')) {
                    animateProgressBars();
                }

                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all content sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        observer.observe(section);
    });

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
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==========================================
    // BUTTON HOVER EFFECTS
    // ==========================================
    const buttons = document.querySelectorAll('.btn-primary, .btn-download');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ==========================================
    // CARD INTERACTIONS
    // ==========================================
    const cards = document.querySelectorAll('.progress-card, .team-card, .stat-box');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // ==========================================
    // PARALLAX EFFECT ON RED LINES
    // ==========================================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const redLines = document.querySelectorAll('.red-line');

        redLines.forEach((line, index) => {
            const speed = 0.2 + (index * 0.1);
            line.style.transform = `translateY(${scrolled * speed}px) rotate(${-15 + (index * 20)}deg)`;
        });
    });

    // ==========================================
    // ACCESSIBILITY - Reduce Motion Support
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
    console.log('%c[P5R] PERSONA 5 ROYAL — УКРАЇНСЬКА ЛОКАЛІЗАЦІЯ',
        'background: #E60012; color: white; font-size: 16px; padding: 10px; font-weight: bold;');
    console.log('%cСайт завантажено у стилі офіційного P5R!',
        'color: #E60012; font-size: 12px;');
    console.log('%cСолов\'їна Команда © 2025',
        'color: #666; font-size: 10px;');
});

// ==========================================
// LOADING COMPLETE
// ==========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger initial animations
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.classList.add('active');
    }
});
