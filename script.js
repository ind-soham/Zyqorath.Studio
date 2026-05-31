document.addEventListener("DOMContentLoaded", () => {
    // 1. Core JS Activation Hook
    document.body.classList.add('js-enabled');

    // 2. Preloader Logic
    const loader = document.getElementById('loader');
    
    setTimeout(() => {
        if(loader) {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            
            // Trigger Hero Elements Sequence on Load Complete
            const heroElements = document.querySelectorAll('#hero .reveal-up');
            heroElements.forEach(el => el.classList.add('in-view'));
        }
    }, 1600);

    // 3. Custom Snappy Cursor Engine (Desktop Only)
    if (window.innerWidth > 992) {
        const cursor = document.querySelector('.cursor');
        const interactiveElements = document.querySelectorAll('a, button, .hover-scale, .work-img-wrapper, input, select, textarea');

        if(cursor) {
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            });

            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => cursor.classList.add('active'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
            });
        }
    }

    // 4. Sticky Navbar Transition
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 5. Scroll Reveal Intersection Observer Framework
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -10% 0px', 
            threshold: 0.1
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll('section .reveal-up, footer .reveal-up');
        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        document.body.classList.remove('js-enabled');
    }
});
