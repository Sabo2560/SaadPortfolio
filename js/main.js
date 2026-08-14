document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Fade in sections on scroll
    const sections = document.querySelectorAll('.fade-in-section');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Highlight the active nav link and toggle the back-to-top button while scrolling
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
    const trackedSections = Array.from(navAnchors)
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);
    const backToTop = document.querySelector('.back-to-top');

    const setActiveLink = (id) => {
        navAnchors.forEach(link => {
            link.classList.toggle('active', id !== null && link.getAttribute('href') === `#${id}`);
        });
    };

    let ticking = false;
    const updateOnScroll = () => {
        if (trackedSections.length) {
            const threshold = window.innerHeight * 0.35;
            let current = null;
            trackedSections.forEach(section => {
                if (section.getBoundingClientRect().top <= threshold) {
                    current = section.id;
                }
            });
            setActiveLink(current);
        }

        if (backToTop) {
            backToTop.classList.toggle('visible', window.scrollY > 500);
        }

        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });

    updateOnScroll();

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
