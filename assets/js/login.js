// assets/js/login.js
import { GoogleGenerativeAI } from '@google/generative-ai';

function validateLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    // Future: Validate email format, password length, Firebase auth
    if (!email) document.getElementById("email-error").textContent = "Email is required";
    if (!password) document.getElementById("password-error").textContent = "Password is required";
    console.log("Login validation placeholder");
}

async function getApiKey() {
    let snapshot = await getDoc(doc(db, "apikey", "googlegenai"));
    apiKey =  snapshot.data().key;
    genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }
  
  async function askChatBot(request) {
    return await model.generateContent(request);
  }

function registerUser() {
    // Future: Register with Firebase
    console.log("Register user placeholder");
}

document.addEventListener("DOMContentLoaded", () => {
    // Add event listeners for form submission, biometric auth (future)
});