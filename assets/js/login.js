// login.js
import { registerUser, loginUser } from './firebase.js';

document.getElementById('login-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert('Please fill in all fields.');
    return;
  }
  if (!validateEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }
  if (!validatePassword(password)) {
    alert('Password must be at least 6 characters long.');
    return;
  }

  try {
    await loginUser(email, password);
    window.location.href = './assets/html/book.html';
  } catch (error) {
    alert(`Login failed: ${error.message}`);
  }
});

document.getElementById('register-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (!email || !password || !confirmPassword) {
    alert('Please fill in all fields.');
    return;
  }
  if (!validateEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }
  if (!validatePassword(password)) {
    alert('Password must be at least 6 characters long.');
    return;
  }
  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  try {
    await registerUser(email, password);
    alert('Registration successful! Please log in.');
    window.location.href = 'index.html';
  } catch (error) {
    alert(`Registration failed: ${error.message}`);
  }
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

// Keyboard navigation (Enter to submit)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && document.activeElement.tagName === 'INPUT') {
    const form = document.activeElement.closest('form');
    if (form) form.dispatchEvent(new Event('submit'));
  }
});