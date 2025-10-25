const form = document.getElementById('contactForm');

const fields = {
  name: { el: document.getElementById('name'), error: document.querySelector('[data-testid="error-name"]') },
  email: { el: document.getElementById('email'), error: document.querySelector('[data-testid="error-email"]') },
  subject: { el: document.getElementById('subject'), error: document.querySelector('[data-testid="error-subject"]') },
  message: { el: document.getElementById('message'), error: document.querySelector('[data-testid="error-message"]') },
};

const validateField = (field, validator, message) => {
  if (!validator(field.el.value.trim())) {
    field.error.textContent = message;
    field.el.classList.add('invalid');
    return false;
  } else {
    field.error.textContent = '';
    field.el.classList.remove('invalid');
    return true;
  }
};

Object.values(fields).forEach(({ el }) => {
  el.addEventListener('input', () => validateForm());
});

function validateForm() {
  let valid = true;
  valid &= validateField(fields.name, v => v.length > 0, 'Name is required.');
  valid &= validateField(fields.email, v => /^[^@]+@[^@]+\.[^@]+$/.test(v), 'Enter a valid email.');
  valid &= validateField(fields.subject, v => v.length > 0, 'Subject is required.');
  valid &= validateField(fields.message, v => v.length >= 10, 'Message must be at least 10 characters.');
  return !!valid;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if (validateForm()) {
    alert('Message sent successfully!');
    form.reset();
  }
});
