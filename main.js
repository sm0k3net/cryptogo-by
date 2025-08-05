// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Hero slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Auto-advance slides
setInterval(nextSlide, 5000);

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Smooth scrolling for navigation links
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

// Consultant button functionality
document.querySelector('.consultant-btn').addEventListener('click', () => {
    alert('Функция онлайн-консультанта будет доступна в ближайшее время!');
});

// Form submission
document.querySelector('.contact-form form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
    e.target.reset();
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections for animation
document.querySelectorAll('.crypto-card, .platform-card, .regulation-card, .tax-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Update crypto prices (simulation)
function updateCryptoPrices() {
    const prices = document.querySelectorAll('.crypto-price');
    prices.forEach(price => {
        const currentPrice = parseFloat(price.textContent.replace(/[^0-9.]/g, ''));
        const change = (Math.random() - 0.5) * 0.02; // ±1% change
        const newPrice = currentPrice * (1 + change);
        
        if (price.textContent.includes('$')) {
            price.textContent = '$' + newPrice.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }
        
        // Add color indication
        if (change > 0) {
            price.style.color = '#28a745';
        } else {
            price.style.color = '#dc3545';
        }
        
        setTimeout(() => {
            price.style.color = '#28a745';
        }, 2000);
    });
}

// Update prices every 10 seconds
setInterval(updateCryptoPrices, 10000);
