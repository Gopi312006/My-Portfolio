// ============================================
// PORTFOLIO WEBSITE - INTERACTIVE FEATURES
// ============================================

// 1. DARK MODE TOGGLE - Interactive Feature #1
const themeBtn = document.getElementById('themeBtn');
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-mode');
    themeBtn.textContent = '☀️';
} else {
    themeBtn.textContent = '🌙';
}

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// ============================================
// 2. HAMBURGER MENU TOGGLE
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ============================================
// 3. SMOOTH SCROLL & ACTIVE NAV LINK TRACKING
// ============================================
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ============================================
// 4. SCROLL TO SECTION FUNCTION
// ============================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

const viewCVBtn = document.getElementById('viewCVBtn');
const resumePanel = document.getElementById('resumePanel');
const resumeImage = document.getElementById('resumeImage');
const resumeMessage = document.getElementById('resumeMessage');

// Set your resume image URL here. Use a relative image file in the project or a public URL:
const resumeUrl = "resume.jpeg";

function renderResumeDisplay() {
    if (resumeUrl && resumeImage && resumeMessage) {
        resumeImage.src = resumeUrl;
        resumeImage.classList.remove('hidden');
        resumeMessage.classList.add('hidden');
        return;
    }

    if (resumeMessage) {
        resumeMessage.classList.remove('hidden');
        resumeMessage.textContent = 'Resume image URL not set. Please set resumeUrl in index.js.';
    }
}

function showResumePanel() {
    if (resumePanel) {
        resumePanel.classList.remove('hidden');
    }
    renderResumeDisplay();
    const cvSection = document.getElementById('cv');
    if (cvSection) {
        cvSection.classList.remove('hidden');
        cvSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

if (viewCVBtn) {
    viewCVBtn.addEventListener('click', showResumePanel);
}

// ============================================
// 5. HOVER SKILL PROGRESS BARS - Interactive Feature #2
// ============================================
const skillCards = document.querySelectorAll('.skill-card');

function showSkillBar(card, isActive) {
    const fill = card.querySelector('.skill-fill');
    if (!fill) return;

    const skillValue = card.style.getPropertyValue('--skill-value') || card.getAttribute('data-skill') || '0%';
    fill.style.width = isActive ? skillValue : '0';
}

skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => showSkillBar(card, true));
    card.addEventListener('focusin', () => showSkillBar(card, true));
    card.addEventListener('mouseleave', () => showSkillBar(card, false));
    card.addEventListener('focusout', () => showSkillBar(card, false));
});

// ============================================
// 6. ANIMATED COUNTERS - Interactive Feature #3
// ============================================
const counters = document.querySelectorAll('.counter');
let countersAnimated = false;

function animateCounter(counter, target) {
    let count = 0;
    const increment = target / 40;
    const interval = setInterval(() => {
        count += increment;
        if (count >= target) {
            counter.textContent = target;
            clearInterval(interval);
        } else {
            counter.textContent = Math.floor(count);
        }
    }, 50);
}

function checkCountersInView() {
    const aboutSection = document.querySelector('.about');
    const aboutPosition = aboutSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (aboutPosition < windowHeight && !countersAnimated) {
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            animateCounter(counter, target);
        });
        countersAnimated = true;
    }
}

window.addEventListener('scroll', checkCountersInView);

// ============================================
// 7. SCROLL REVEAL ANIMATION - Interactive Feature #4
// ============================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    
    reveals.forEach(reveal => {
        const revealTop = reveal.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (revealTop < windowHeight - 100) {
            reveal.classList.add('active');
        }
    });
}

// Add scroll-reveal class to elements
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    const serviceCards = document.querySelectorAll('.service-card');
    
    [...projectCards, ...serviceCards].forEach(card => {
        card.classList.add('scroll-reveal');
    });
});

window.addEventListener('scroll', revealOnScroll);

// ============================================
// 7.5 HERO BACKGROUND VISUALIZATION - Interactive Feature
// ============================================
function initHeroVisualization() {
    const hero = document.querySelector('.hero');
    const heroVisual = document.querySelector('.hero-visual');
    if (!hero || !heroVisual) return;

    const dotCount = 14;
    const heroDots = [];

    for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('span');
        dot.className = 'hero-dot';
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;
        dot.style.transform = `translate(-50%, -50%)`;
        dot.dataset.speed = (Math.random() * 1.2 + 0.5).toFixed(2);
        heroVisual.appendChild(dot);
        heroDots.push(dot);
    }

    function handleHeroMove(event) {
        const rect = hero.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        heroDots.forEach(dot => {
            const speed = parseFloat(dot.dataset.speed);
            const moveX = x * 24 * speed;
            const moveY = y * 24 * speed;
            dot.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
        });
    }

    hero.addEventListener('mousemove', handleHeroMove);
    hero.addEventListener('mouseleave', () => {
        heroDots.forEach(dot => {
            dot.style.transform = 'translate(-50%, -50%)';
        });
    });
}

document.addEventListener('DOMContentLoaded', initHeroVisualization);

// ============================================
// 8. FORM VALIDATION & SUBMISSION - Interactive Feature #5
// ============================================
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateName() {
    const nameError = document.getElementById('nameError');
    const nameGroup = nameInput.parentElement;
    
    if (nameInput.value.trim().length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        nameGroup.classList.add('error');
        return false;
    } else {
        nameError.textContent = '';
        nameGroup.classList.remove('error');
        return true;
    }
}

function validateEmail() {
    const emailError = document.getElementById('emailError');
    const emailGroup = emailInput.parentElement;
    
    if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email address';
        emailGroup.classList.add('error');
        return false;
    } else {
        emailError.textContent = '';
        emailGroup.classList.remove('error');
        return true;
    }
}

function validateSubject() {
    const subjectError = document.getElementById('subjectError');
    const subjectGroup = subjectInput.parentElement;
    
    if (subjectInput.value.trim().length < 3) {
        subjectError.textContent = 'Subject must be at least 3 characters';
        subjectGroup.classList.add('error');
        return false;
    } else {
        subjectError.textContent = '';
        subjectGroup.classList.remove('error');
        return true;
    }
}

function validateMessage() {
    const messageError = document.getElementById('messageError');
    const messageGroup = messageInput.parentElement;
    
    if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        messageGroup.classList.add('error');
        return false;
    } else {
        messageError.textContent = '';
        messageGroup.classList.remove('error');
        return true;
    }
}

// Real-time validation
nameInput.addEventListener('blur', validateName);
nameInput.addEventListener('input', validateName);

emailInput.addEventListener('blur', validateEmail);
emailInput.addEventListener('input', validateEmail);

subjectInput.addEventListener('blur', validateSubject);
subjectInput.addEventListener('input', validateSubject);

messageInput.addEventListener('blur', validateMessage);
messageInput.addEventListener('input', validateMessage);

// Form submission with validation
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();
    
    // If all validations pass
    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        const recipientEmail = 'gopisneeha@gmail.com';
        const subject = `Portfolio Contact: ${subjectInput.value.trim()}`;
        const body = [
            `Name: ${nameInput.value.trim()}`,
            `Email: ${emailInput.value.trim()}`,
            `Subject: ${subjectInput.value.trim()}`,
            '',
            'Message:',
            messageInput.value.trim()
        ].join('\n');

        const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Show success message
        const successMsg = document.createElement('div');
        successMsg.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            animation: slideInRight 0.3s ease;
            z-index: 1001;
        `;
        successMsg.textContent = '✓ Opening your email app...';
        document.body.appendChild(successMsg);
        
        // Clear form
        contactForm.reset();
        
        // Open the default mail client with the message prefilled
        window.location.href = mailtoLink;
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successMsg.remove();
        }, 3000);
    }
});

// ============================================
// 9. PARALLAX SCROLLING EFFECT
// ============================================
const heroSection = document.querySelector('.hero');
const heroContent = document.querySelector('.hero .container');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    if (heroSection) {
        heroContent.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// ============================================
// 10. MOUSE FOLLOWING CURSOR EFFECT
// ============================================
const projectImages = document.querySelectorAll('.project-image img');

document.addEventListener('mousemove', (e) => {
    projectImages.forEach(img => {
        const rect = img.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const moveX = (x - 0.5) * 20;
        const moveY = (y - 0.5) * 20;
        
        img.style.transform = `scale(1.15) translate(${moveX}px, ${moveY}px)`;
    });
});

// Reset transform when mouse leaves
projectImages.forEach(img => {
    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1.15) translate(0, 0)';
    });
});

// ============================================
// 11. PAGE LOAD ANIMATION
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// 12. DYNAMIC YEAR IN FOOTER
// ============================================
const footerYear = document.querySelector('.footer p:first-child');
if (footerYear) {
    footerYear.textContent = `© ${new Date().getFullYear()} Your Name. All rights reserved.`;
}

// ============================================
// 13. INTERSECTION OBSERVER FOR SCROLL EFFECTS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all scroll reveal elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
});

// ============================================
// 14. ADD SMOOTH SCROLL BEHAVIOR
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#!' && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// 15. LAZY LOADING FOR IMAGES
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// 16. KEYBOARD NAVIGATION SUPPORT
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        document.querySelector('.nav-menu').classList.remove('active');
        document.querySelector('.hamburger').classList.remove('active');
    }
});

console.log('✨ Portfolio website loaded! Check out the interactive features:');
console.log('1. Dark Mode Toggle');
console.log('2. Animated Skill Bars');
console.log('3. Animated Counters');
console.log('4. Scroll Reveal Animations');
console.log('5. Form Validation');
console.log('6. Parallax Scrolling');
console.log('7. Mouse Following Cursor');
console.log('8. Smooth Navigation');
console.log('9. Lazy Image Loading');
console.log('10. Keyboard Navigation');
