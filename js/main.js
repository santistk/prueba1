document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Add validation logic here
            console.log('Form submitted');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Hero Slider automático ---
    const slides = document.querySelectorAll('.slide');
    let current = 0;
    const interval = 4000; // 4 segundos

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        current = index;
    }

    function nextSlide() {
        let next = (current + 1) % slides.length;
        showSlide(next);
    }

    // Inicializa el primer slide
    showSlide(0);

    // Cambia de slide automáticamente cada 4 segundos
    setInterval(nextSlide, interval);
});

// Carousel functionality
function initCarousel() {
    const carousel = document.querySelector('.carousel-slide');
    const images = document.querySelectorAll('.carousel-slide img');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (!carousel || images.length === 0) return;
    
    let counter = 1;
    const size = images[0].clientWidth;
    const transitionTime = 4000; // 4 seconds
    
    carousel.style.transform = 'translateX(' + (-size * counter) + 'px)';
    
    function nextSlide() {
        if (counter >= images.length - 1) return;
        carousel.style.transition = "transform 0.5s ease-in-out";
        counter++;
        carousel.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
    
    let slideInterval = setInterval(nextSlide, transitionTime);
    
    carousel.addEventListener('transitionend', function() {
        if (images[counter].id === 'lastClone') {
            carousel.style.transition = "none";
            counter = images.length - 2;
            carousel.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }
        if (images[counter].id === 'firstClone') {
            carousel.style.transition = "none";
            counter = images.length - counter;
            carousel.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[counter-1].classList.add('active');
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            counter = index + 1;
            carousel.style.transition = "transform 0.5s ease-in-out";
            carousel.style.transform = 'translateX(' + (-size * counter) + 'px)';
            slideInterval = setInterval(nextSlide, transitionTime);
        });
    });
    
    // Initialize
    dots[0].classList.add('active');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initCarousel);