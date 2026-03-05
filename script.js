const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const form = document.getElementById('project-form');
const formMessage = document.getElementById('form-message');
const submitBtn = form.querySelector('.submit-btn');

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    grecaptcha.ready(function () {
        grecaptcha.execute('6Ld1XIAsAAAAAL15T0fIMyamKcrl5aRy6asIfMyt', { action: 'submit' }).then(async function (token) {
            const formData = new FormData(form);
            formData.append('token', token);
            formData.append('timestamp', new Date().toISOString());

            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            formMessage.className = 'form-message';
            formMessage.textContent = '';

            const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzDmyKWAXgqoBnuULACzCO5RzOwWPgRxBbNyjFOnq6vCUfksM1AHZZlM2ig_9Fq_u8Q/exec';

            try {
                const response = await fetch(SCRIPT_URL, {
                    method: 'POST',
                    body: formData
                });

                if (response.status !== 200) {
                    throw new Error('Error al enviar el formulario, Intenta de nuevo');
                }

                formMessage.textContent = '¡Gracias! Tu proyecto ha sido enviado exitosamente. Nos pondremos en contacto contigo pronto!';
                formMessage.className = 'form-message success';
                form.reset();
            } catch (error) {
                console.error('Error:', error);
                formMessage.textContent = 'Lo sentimos, algo salió mal. Por favor, intenta de nuevo.';
                formMessage.className = 'form-message error';
            } finally {
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
            }
        });
    });

});

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
