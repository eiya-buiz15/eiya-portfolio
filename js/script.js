// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Scroll Animation for Sections
const sections = document.querySelectorAll('.section');
const observerOptions = {
    root: null,
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Form Submission with Formspree (AJAX)
const form = document.querySelector('.contact-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const status = document.getElementById('my-form-status');
    const data = new FormData(form);
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });
        if (response.ok) {
            status.innerHTML = 'Thank you for your message! I will get back to you soon.';
            form.reset();
        } else {
            const responseData = await response.json();
            status.innerHTML = responseData.errors ? responseData.errors.map(error => error.message).join(', ') : 'Oops! There was a problem submitting your form.';
        }
    } catch (error) {
        status.innerHTML = 'Oops! There was a problem submitting your form.';
    }
});

// Auto-hide Navbar on Scroll
let prevScrollPos = window.pageYOffset;
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    const currentScrollPos = window.pageYOffset;
    header.style.top = prevScrollPos > currentScrollPos ? '0' : '-100px';
    header.classList.toggle('scrolled', currentScrollPos > 50);
    prevScrollPos = currentScrollPos;
});

// Typing Effect for Navbar Brand
const texts = ["I'm Eiya Mishra", "I'm a Freelancer", "Business Support Executive"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {
    if (count === texts.length) count = 0;
    currentText = texts[count];
    letter = currentText.slice(0, ++index);
    document.getElementById("typing-text").textContent = letter;
    if (letter.length === currentText.length) {
        setTimeout(() => {
            index = 0;
            count++;
            setTimeout(type, 500); // Pause between words
        }, 1200);
    } else {
        setTimeout(type, 100);
    }
})();