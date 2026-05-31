document.addEventListener("DOMContentLoaded", () => {
    // 1. CSS Hook for JS animations
    document.body.classList.add('js-enabled');

    // 2. Minimalist Preloader
    const loader = document.getElementById('loader');
    
    // Simulate initial load sequence
    setTimeout(() => {
        if(loader) {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            
            // Trigger Hero Animations manually after loader is gone
            const heroElements = document.querySelectorAll('#hero .reveal-up');
            heroElements.forEach(el => el.classList.add('in-view'));
        }
    }, 1600); // 1.5s for the progress bar animation to finish

    // 3. Precise Custom Cursor (Desktop Only)
    if (window.innerWidth > 992) {
        const cursor = document.querySelector('.cursor');
        const interactiveElements = document.querySelectorAll('a, button, .hover-scale, .work-img-wrapper');

        if(cursor) {
            // Fast follow without delay for that snappy linear feel
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            });

            // Expand cursor on interactive elements
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => cursor.classList.add('active'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
            });
        }
    }

    // 4. Glassmorphism Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 5. Framer-Style Scroll Reveal Observer
    if ('IntersectionObserver' in window) {
        // High-end threshold and root margin to trigger slightly before element is visible
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -10% 0px', 
            threshold: 0.1
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target); // Unobserve to keep it visible once loaded
                }
            });
        }, observerOptions);

        // Select all elements with reveal-up except those in hero (which are handled by preloader)
        const revealElements = document.querySelectorAll('section .reveal-up, footer .reveal-up');
        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        document.body.classList.remove('js-enabled');
    }
});
