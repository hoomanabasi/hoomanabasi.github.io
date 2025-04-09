document.addEventListener('DOMContentLoaded', () => {

    // --- انیمیشن ظاهر شدن بخش‌ها هنگام اسکرول ---
    const sections = document.querySelectorAll('.resume-section');

    const observerOptions = {
        root: null, // نسبت به viewport
        rootMargin: '0px',
        threshold: 0.1 // حداقل 10% بخش دیده شود
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation to save resources
                // observer.unobserve(entry.target);
            }
            // Optional: remove class if scrolling up to re-trigger animation
            // else {
            //     entry.target.classList.remove('visible');
            // }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });


    // --- مدیریت فرم تماس Formspree ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // جلوگیری از ارسال پیش‌فرض فرم

            const formData = new FormData(contactForm);
            formStatus.textContent = 'در حال ارسال پیام...';
            formStatus.style.color = '#555';

            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json' // مهم برای دریافت پاسخ JSON از Formspree
                    }
                });

                if (response.ok) {
                    formStatus.textContent = 'پیام شما با موفقیت ارسال شد!';
                    formStatus.style.color = 'green';
                    contactForm.reset(); // پاک کردن فرم پس از ارسال موفق
                } else {
                    // تلاش برای خواندن خطای احتمالی از پاسخ
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                         formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        formStatus.textContent = 'خطا در ارسال پیام. لطفاً دوباره تلاش کنید.';
                    }
                     formStatus.style.color = 'red';
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                formStatus.textContent = 'خطا در ارتباط با سرور. لطفاً اتصال اینترنت خود را بررسی کنید.';
                formStatus.style.color = 'red';
            }
        });
    }

}); // End of DOMContentLoaded
