// انیمیشن اسکرول نرم برای لینک‌های داخلی
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// افکت ظاهر شدن تدریجی برای بخش‌ها هنگام اسکرول
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// اضافه کردن کلاس‌های انیمیشن به بخش‌های مختلف
document.querySelectorAll('section').forEach(section => {
    section.classList.add('animate-section');
    observer.observe(section);
});

// اضافه کردن استایل‌های انیمیشن به صورت داینامیک
const style = document.createElement('style');
style.textContent = `
    .animate-section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }

    .skill-category li {
        opacity: 0;
        transform: translateX(-10px);
        animation: slideIn 0.5s ease forwards;
    }

    @keyframes slideIn {
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;

document.head.appendChild(style);

// تاخیر در نمایش مهارت‌ها
document.querySelectorAll('.skill-category li').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// اضافه کردن قابلیت چاپ
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + P
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        window.print();
    }
});

// بهینه‌سازی عملکرد با استفاده از requestAnimationFrame
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // اینجا می‌توانید کدهای مرتبط با اسکرول را اضافه کنید
            ticking = false;
        });
        ticking = true;
    }
});
