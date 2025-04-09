document.addEventListener('DOMContentLoaded', function() {
  // استفاده از Intersection Observer برای انیمیشن fade-in
  const faders = document.querySelectorAll('.fade-in');

  const options = {
    threshold: 0.1,
  };

  const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // مدیریت ارسال فرم تماس
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', function(e) {
    e.preventDefault(); // جلوگیری از ارسال فرم به سرور برای نمایش در نمونه
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name && email && message) {
      // در دنیای واقعی، داده‌های فرم به سرور ارسال می‌شود
      document.getElementById('form-response').innerText = "پیام شما با موفقیت ارسال شد.";
      form.reset();
    } else {
      document.getElementById('form-response').innerText = "لطفاً تمامی فیلدها را تکمیل کنید.";
    }
  });
});
