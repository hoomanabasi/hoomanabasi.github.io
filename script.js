// js/script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling ---
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.getElementById('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // بستن منوی موبایل (اگر باز است) بعد از کلیک
                 if (navMenu.classList.contains('active')) {
                     navMenu.classList.remove('active');
                 }
            }
        });
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-links');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }


    // --- Active Link Highlighting on Scroll (using Intersection Observer) ---
    const sections = document.querySelectorAll('section[id]'); // انتخاب تمام بخش‌های دارای ID
    const headerHeight = document.getElementById('header').offsetHeight;

    const observerOptions = {
      root: null, // نسبت به viewport
      rootMargin: `-${headerHeight}px 0px 0px 0px`, // آفست به اندازه ارتفاع هدر از بالا
      threshold: 0.4 // 40% از بخش باید دیده شود
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // حذف کلاس active از همه لینک‌ها
          navLinks.forEach(link => link.classList.remove('active'));
          // اضافه کردن کلاس active به لینک مربوطه
          const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });


     // (اختیاری) انیمیشن Skill Bars وقتی نمایان می‌شوند
     const skillItems = document.querySelectorAll('.skill-item');
     const skillObserverOptions = {
         root: null,
         threshold: 0.5 // وقتی 50% از نوار دیده شد
     };

     const skillObserver = new IntersectionObserver((entries, observer) => {
         entries.forEach(entry => {
             if (entry.isIntersecting) {
                 const skillLevel = entry.target.querySelector('.skill-level');
                 if (skillLevel) {
                      // اعمال width واقعی (که در استایل HTML یا CSS تعریف شده)
                     skillLevel.style.width = skillLevel.parentElement.dataset.level || skillLevel.style.width; // فرض کنید درصد در data-level یا style است
                      // اضافه کردن یک کلاس برای انیمیشن (اگر transition در CSS تعریف شده)
                     // skillLevel.classList.add('animate-skill');
                 }
                 observer.unobserve(entry.target); // فقط یک بار اجرا شود
             }
         });
     }, skillObserverOptions);

     skillItems.forEach(item => {
         const skillLevelDiv = item.querySelector('.skill-level');
          // برای جلوگیری از نمایش اولیه width قبل از انیمیشن، آن را 0 می‌کنیم
         // و مقدار واقعی را در data-level ذخیره می‌کنیم (یا مستقیماً از style می‌خوانیم)
         if (skillLevelDiv) {
             skillLevelDiv.parentElement.dataset.level = skillLevelDiv.style.width; // ذخیره مقدار
             skillLevelDiv.style.width = '0%'; // شروع از صفر
             skillObserver.observe(item); // مشاهده آیتم
         }
     });


}); // End of DOMContentLoaded
