// ==========================================
// PERSONA 5 ROYAL - OFFICIAL STYLE
// Progress animations
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // PROGRESS BARS ANIMATION
    // ==========================================
    function animateProgress() {
        // Individual progress bars
        const bars = document.querySelectorAll('.progress-bar-p5');
        bars.forEach(bar => {
            const fill = bar.querySelector('.bar-fill-p5');
            const progress = bar.getAttribute('data-progress');
            if (fill && progress) {
                setTimeout(() => {
                    fill.style.width = progress + '%';
                }, 300);
            }
        });

        // Overall progress bar
        const overallBar = document.querySelector('.overall-bar');
        if (overallBar) {
            const progress = overallBar.getAttribute('data-progress');
            setTimeout(() => {
                overallBar.style.width = progress + '%';
            }, 600);
        }
    }

    // ==========================================
    // INTERSECTION OBSERVER
    // ==========================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('progress-info')) {
                    animateProgress();
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    // Observe progress section
    const progressSection = document.querySelector('.progress-info');
    if (progressSection) {
        observer.observe(progressSection);
    }

    // ==========================================
    // SMOOTH SCROLL
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
    // CONSOLE LOG
    // ==========================================
    console.log('%c[P5R] PERSONA 5 ROYAL',
        'background: #D4AF37; color: #000; font-size: 16px; padding: 10px; font-weight: bold;');
    console.log('%cОфіційний стиль з persona.atlus.com/p5r',
        'color: #D4AF37; font-size: 12px;');
});
