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
    document.getElementById('chatModal').style.display = 'block';
});

// Close chat modal
document.querySelector('.close-chat').addEventListener('click', () => {
    document.getElementById('chatModal').style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('chatModal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// CTA buttons functionality
document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const action = e.target.getAttribute('data-action');
        switch(action) {
            case 'start':
                document.querySelector('#contacts').scrollIntoView({ behavior: 'smooth' });
                break;
            case 'learn':
                document.querySelector('#trading').scrollIntoView({ behavior: 'smooth' });
                break;
            case 'laws':
                document.querySelector('#regulation').scrollIntoView({ behavior: 'smooth' });
                break;
        }
    });
});

// Detail buttons functionality
document.querySelectorAll('.detail-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const topic = e.target.getAttribute('data-topic');
        // Для будущей реализации - пока показываем alert
        alert(`Подробная информация по теме "${topic}" будет добавлена в ближайшее время.`);
    });
});

// New buttons functionality
document.addEventListener('DOMContentLoaded', () => {
    // Portfolio button
    const portfolioBtn = document.querySelector('.portfolio-btn');
    if (portfolioBtn) {
        portfolioBtn.addEventListener('click', () => {
            alert('Функция создания портфеля будет доступна в ближайшее время!');
        });
    }

    // Analytics button
    const analyticsBtn = document.querySelector('.analytics-btn');
    if (analyticsBtn) {
        analyticsBtn.addEventListener('click', () => {
            alert('Аналитические отчеты будут доступны в ближайшее время!');
        });
    }

    // PVT button
    const pvtBtn = document.querySelector('.pvt-btn');
    if (pvtBtn) {
        pvtBtn.addEventListener('click', () => {
            alert('Информация о присоединении к ПВТ будет предоставлена нашими консультантами!');
        });
    }

    // Expertise buttons
    document.querySelectorAll('.expertise-btn').forEach(btn => {
        if (btn.tagName === 'BUTTON') {
            btn.addEventListener('click', (e) => {
                const text = e.target.textContent;
                if (text === 'Получить консультацию') {
                    document.querySelector('#contacts').scrollIntoView({ behavior: 'smooth' });
                } else if (text === 'Заказать аудит') {
                    alert('Для заказа аудита свяжитесь с нашими консультантами!');
                }
            });
        }
    });
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

// Update crypto prices (real data from Binance API)
async function updateCryptoPrices() {
    const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'XRPUSDT', 'LTCUSDT', 'USDTUSDT', 'LINKUSDT', 'DOGEUSDT'];
    
    try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/price');
        const data = await response.json();
        
        symbols.forEach(symbol => {
            const priceData = data.find(item => item.symbol === symbol);
            if (priceData) {
                const card = document.querySelector(`[data-symbol="${symbol}"]`);
                if (card) {
                    const priceElement = card.querySelector('.crypto-price');
                    const price = parseFloat(priceData.price);
                    
                    if (symbol === 'USDTUSDT') {
                        priceElement.textContent = '$1.00';
                    } else {
                        priceElement.textContent = '$' + (price < 1 ? price.toFixed(4) : price.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }));
                    }
                    
                    // Add loading animation
                    priceElement.style.opacity = '0.7';
                    setTimeout(() => {
                        priceElement.style.opacity = '1';
                    }, 300);
                }
            }
        });
    } catch (error) {
        console.log('Не удалось получить актуальные цены:', error);
        // Fallback to simulation if API fails
        simulatePriceUpdate();
    }
}

// Fallback price simulation
function simulatePriceUpdate() {
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

// Initial price update
updateCryptoPrices();

// Update prices every 30 seconds
setInterval(updateCryptoPrices, 30000);

// Phone number reveal function
function revealPhone(button) {
    button.classList.add('revealed');
    // Make the phone clickable after reveal
    setTimeout(() => {
        const phoneNumber = "+375299481356";
        window.open(`tel:${phoneNumber}`, '_self');
    }, 500);
}
