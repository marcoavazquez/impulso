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

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        repoUrl: document.getElementById('repo-url').value,
        description: document.getElementById('description').value,
        timestamp: new Date().toISOString()
    };

    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    formMessage.className = 'form-message';
    formMessage.textContent = '';

    const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';

    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        formMessage.textContent = 'Thank you! Your project has been submitted successfully. We\'ll be in touch soon!';
        formMessage.className = 'form-message success';
        form.reset();
    } catch (error) {
        console.error('Error:', error);
        formMessage.textContent = 'Sorry, something went wrong. Please try again or contact us directly.';
        formMessage.className = 'form-message error';
    } finally {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
