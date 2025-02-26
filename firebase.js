// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVwYyKQM4ZHHWQl3twAzdNYx192sth1fk",
  authDomain: "webtrends-e4a4e.firebaseapp.com",
  projectId: "webtrends-e4a4e",
  storageBucket: "webtrends-e4a4e.firebasestorage.app",
  messagingSenderId: "268651353987",
  appId: "1:268651353987:web:397e45dbf2bb085dc108b6",
  measurementId: "G-L9B8SQRXG0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth();