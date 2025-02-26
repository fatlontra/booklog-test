import { GoogleGenerativeAI } from '@google/generative-ai';
import { auth } from '../../firebase.js';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword 
} from 'firebase/auth';

let genAI, model, apiKey;

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function validateLogin() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');

    emailError.textContent = '';
    passwordError.textContent = '';

    if (!email) {
        emailError.textContent = 'Email is required';
        return false;
    }
    if (!validateEmail(email)) {
        emailError.textContent = 'Invalid email format';
        return false;
    }
    if (!password) {
        passwordError.textContent = 'Password is required';
        return false;
    }
    if (!validatePassword(password)) {
        passwordError.textContent = 'Password must be at least 6 characters';
        return false;
    }
    return true;
}

async function getApiKey() {
    try {
        const { getDoc, doc } = await import('firebase/firestore');
        const snapshot = await getDoc(doc(db, 'apikey', 'googlegenai'));
        apiKey = snapshot.data().key;
        genAI = new GoogleGenerativeAI(apiKey);
        model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    } catch (error) {
        console.error('Error fetching API key:', error);
    }
}

async function askChatBot(request) {
    try {
        return await model.generateContent(request);
    } catch (error) {
        console.error('Error with chatbot:', error);
        return null;
    }
}

async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in:', userCredential.user);
        window.location.href = 'book.html'; // Redirect to book management
    } catch (error) {
        const emailError = document.getElementById('email-error');
        const passwordError = document.getElementById('password-error');
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            emailError.textContent = 'Invalid email or password';
            passwordError.textContent = 'Invalid email or password';
        } else {
            console.error('Login error:', error);
            emailError.textContent = 'Login failed';
        }
    }
}

async function registerUser() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');

    emailError.textContent = '';
    passwordError.textContent = '';

    if (!validateEmail(email)) {
        emailError.textContent = 'Invalid email format';
        return;
    }
    if (!validatePassword(password)) {
        passwordError.textContent = 'Password must be at least 6 characters';
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User registered:', userCredential.user);
        alert('Registration successful! Please log in.');
        document.getElementById('login-form').reset();
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            emailError.textContent = 'Email already in use';
        } else {
            console.error('Registration error:', error);
            emailError.textContent = 'Registration failed';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateLogin()) {
            loginUser(document.getElementById('email').value, document.getElementById('password').value);
        }
    });

    const registerBtn = document.getElementById('register-btn');
    registerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        registerUser();
    });

    getApiKey(); 
});