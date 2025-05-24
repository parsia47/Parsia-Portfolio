// Code Animation for Laptop Screen
const codeLines = [
    "import cv2",
    "import numpy as np",
    "",
    "def detect_faces(image):",
    "    face_cascade = cv2.CascadeClassifier(",
    "        cv2.data.haarcascades +",
    "        'haarcascade_frontalface_default.xml')",
    "    ",
    "    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)",
    "    faces = face_cascade.detectMultiScale(gray, 1.1, 4)",
    "    ",
    "    for (x, y, w, h) in faces:",
    "        cv2.rectangle(image, (x, y), (x+w, y+h), (255, 0, 0), 2)",
    "    ",
    "    return image",
    "",
    "# Initialize camera",
    "cap = cv2.VideoCapture(0)",
    "",
    "while True:",
    "    ret, frame = cap.read()",
    "    if ret:",
    "        frame = detect_faces(frame)",
    "        cv2.imshow('Face Detection', frame)",
    "    ",
    "    if cv2.waitKey(1) & 0xFF == ord('q'):",
    "        break",
    "",
    "cap.release()",
    "cv2.destroyAllWindows()"
];

function animateCode() {
    const codeContainer = document.getElementById('codeAnimation');
    codeContainer.innerHTML = '';

    codeLines.forEach((line, index) => {
        setTimeout(() => {
            const lineElement = document.createElement('div');
            lineElement.className = 'code-line';
            lineElement.textContent = line;
            lineElement.style.animationDelay = '0s';
            codeContainer.appendChild(lineElement);

            // Scroll to bottom
            codeContainer.scrollTop = codeContainer.scrollHeight;
        }, index * 200);
    });

    // Restart animation after completion
    setTimeout(animateCode, (codeLines.length * 200) + 5000);
}

// Start code animation
animateCode();

// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        nav.style.background = 'rgba(0, 0, 0, 0.8)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s ease forwards';
        }
    });
}, observerOptions);

// Observe all project cards
document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');

    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Add subtle mouse movement effect to hero content
document.addEventListener('mousemove', (e) => {
    const heroContent = document.querySelector('.hero-content');
    const laptop = document.querySelector('.laptop');

    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    const moveX = (mouseX - 0.5) * 20;
    const moveY = (mouseY - 0.5) * 20;

    heroContent.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.5}px)`;

    if (laptop) {
        laptop.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
    }
});

// Typing effect for hero text
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing effect on load
window.addEventListener('load', () => {
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero h1');
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 100);
    }, 1000);
});
