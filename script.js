/* ===================================================================
   ÉLÈVE — Luxury Clothing Website
   JavaScript — Interactions & Animations
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ── Preloader ──
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            animateHero();
        }, 2200);
    });

    // Fallback: hide preloader after 4s even if load hasn't fired
    setTimeout(() => {
        if (!preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
            animateHero();
        }
    }, 4000);

    // ── Custom Cursor ──
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Smooth follower
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Cursor hover effects
    const hoverTargets = document.querySelectorAll('a, button, .product-card, .collection-card, .lookbook-item, .insta-item, .color-dot, input');
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });
        target.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });

    // ── Navigation ──
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');

    // Scroll behavior
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link
        updateActiveNavLink();

        // Back to top button
        const backToTop = document.getElementById('back-to-top');
        if (currentScroll > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Active navigation link based on scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ── Search Overlay ──
    const searchBtn = document.getElementById('search-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');

    searchBtn.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        setTimeout(() => searchInput.focus(), 300);
    });

    searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchOverlay.classList.remove('active');
        }
    });

    // ── Hero Animation ──
    function animateHero() {
        const subtitle = document.querySelector('.hero-subtitle');
        const lines = document.querySelectorAll('.hero-line');
        const desc = document.querySelector('.hero-desc');
        const buttons = document.querySelector('.hero-buttons');

        // Subtitle
        setTimeout(() => {
            subtitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateY(0)';
        }, 200);

        // Title lines
        lines.forEach((line, i) => {
            setTimeout(() => {
                line.style.transition = 'opacity 1s ease, transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, 500 + i * 200);
        });

        // Description
        setTimeout(() => {
            desc.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            desc.style.opacity = '1';
            desc.style.transform = 'translateY(0)';
        }, 1000);

        // Buttons
        setTimeout(() => {
            buttons.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            buttons.style.opacity = '1';
            buttons.style.transform = 'translateY(0)';
        }, 1200);
    }

    // ── Scroll Animations (Intersection Observer) ──
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        // Skip hero elements (handled by animateHero)
        if (!el.closest('.hero')) {
            scrollObserver.observe(el);
        }
    });

    // ── Product Filter Tabs ──
    const filterTabs = document.querySelectorAll('.filter-tab');
    const productCards = document.querySelectorAll('.product-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.dataset.filter;

            productCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hiding');
                    card.classList.add('showing');
                    card.style.display = '';
                } else {
                    card.classList.add('hiding');
                    card.classList.remove('showing');
                    setTimeout(() => {
                        if (card.classList.contains('hiding')) {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    });

    // ── Wishlist Toggle ──
    const wishlistBtns = document.querySelectorAll('.wishlist-toggle');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            btn.classList.toggle('active');

            const svg = btn.querySelector('svg');
            if (btn.classList.contains('active')) {
                svg.style.fill = 'currentColor';
                showToast('Added to wishlist ♥');
            } else {
                svg.style.fill = 'none';
                showToast('Removed from wishlist');
            }
        });
    });

    // ── Add to Cart ──
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.product-card');
            const productName = card.querySelector('.product-name').textContent;
            showToast(`${productName} added to cart!`);

            // Button animation
            btn.textContent = 'Added ✓';
            btn.style.background = 'var(--clr-gold)';
            btn.style.color = 'var(--clr-bg)';
            btn.style.borderColor = 'var(--clr-gold)';

            setTimeout(() => {
                btn.textContent = 'Add to Cart';
                btn.style.background = '';
                btn.style.color = '';
                btn.style.borderColor = '';
            }, 2000);
        });
    });

    // ── Toast Notification ──
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    let toastTimeout;

    function showToast(message) {
        clearTimeout(toastTimeout);
        toastMessage.textContent = message;
        toast.classList.add('show');
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // ── Testimonials Slider ──
    const track = document.getElementById('testimonial-track');
    const cards = track.querySelectorAll('.testimonial-card');
    const dotsContainer = document.getElementById('testimonial-dots');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    let currentSlide = 0;
    const totalSlides = cards.length;

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    function goToSlide(index) {
        currentSlide = index;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Update dots
        dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
    });

    nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
    });

    // Auto-slide
    let autoSlide = setInterval(() => {
        goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
    }, 5000);

    // Pause on hover
    document.getElementById('testimonials-slider').addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });
    document.getElementById('testimonials-slider').addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
        }, 5000);
    });

    // ── Counter Animation (About Section Stats) ──
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    let statsCounted = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsCounted) {
                statsCounted = true;
                statNumbers.forEach(num => {
                    const target = parseInt(num.dataset.count);
                    animateCounter(num, target);
                });
            }
        });
    }, { threshold: 0.5 });

    if (statNumbers.length > 0) {
        const statsSection = statNumbers[0].closest('.about-stats');
        if (statsSection) statsObserver.observe(statsSection);
    }

    function animateCounter(element, target) {
        let current = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // ── Newsletter Form ──
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterSuccess = document.getElementById('newsletter-success');

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('newsletter-email').value;
        if (email) {
            newsletterForm.style.display = 'none';
            newsletterSuccess.classList.add('show');
        }
    });

    // ── Back to Top ──
    document.getElementById('back-to-top').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ── Smooth Scroll for Anchor Links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 72;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ── Parallax on Hero (subtle) ──
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImg = document.querySelector('.hero-img');
        if (heroImg && scrolled < window.innerHeight) {
            heroImg.style.transform = `scale(${1.1 + scrolled * 0.0002}) translateY(${scrolled * 0.3}px)`;
        }
    });

    // ── Image Loading with Fade ──
    const allImages = document.querySelectorAll('img[loading="lazy"]');
    allImages.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
            img.addEventListener('error', () => {
                img.style.opacity = '1';
            });
        }
    });

    // ── Quick View Button (Visual Feedback) ──
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.product-card');
            const productName = card.querySelector('.product-name').textContent;
            showToast(`Quick view: ${productName}`);
        });
    });

    // ── Keyboard Accessibility ──
    document.addEventListener('keydown', (e) => {
        // Close mobile menu with Escape
        if (e.key === 'Escape' && navLinks.classList.contains('open')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
});
