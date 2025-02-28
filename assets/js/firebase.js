import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCVwYyKQM4ZHHWQl3twAzdNYx192sth1fk",
  authDomain: "webtrends-e4a4e.firebaseapp.com",
  projectId: "webtrends-e4a4e",
  storageBucket: "webtrends-e4a4e.firebasestorage.app",
  messagingSenderId: "268651353987",
  appId: "1:268651353987:web:1c6d03e51a5486adc108b6",
  measurementId: "G-3TQYJE1X2F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User registered:", userCredential.user);
        return userCredential;
      })
      .catch((error) => {
        console.error("Registration error:", error.code, error.message);
        throw error;
      });
  };

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User logged in:", userCredential.user);
      return userCredential;
    })
    .catch((error) => {
      console.error("Login error:", error.code, error.message);
      throw error;
    });
};

/* Testing Book management functions. Could be applied or not */
// 
// export const addBook = async (book) => {
    // try {
      // const docRef = await addDoc(collection(db, "books"), book);
      // console.log("Book added with ID:", docRef.id);
      // return { id: docRef.id, ...book };
    // } catch (e) {
      // console.error("Error adding book:", e);
      // throw e;
    // }
  // };
  // 
  // export const getBooks = async () => {
    // const querySnapshot = await getDocs(collection(db, "books"));
    // return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  // };
  // 
  // export const updateBook = async (id, updatedBook) => {
    // const bookRef = doc(db, "books", id);
    // try {
      // await updateDoc(bookRef, updatedBook);
      // console.log("Book updated with ID:", id);
    // } catch (e) {
      // console.error("Error updating book:", e);
      // throw e;
    // }
  // };
  // 
  // export const deleteBook = async (id) => {
    // const bookRef = doc(db, "books", id);
    // try {
      // await deleteDoc(bookRef);
      // console.log("Book deleted with ID:", id);
    // } catch (e) {
      // console.error("Error deleting book:", e);
      // throw e;
    // }
  // };
  // 
  // export const filterBooks = async (field, value) => {
    // const q = query(collection(db, "books"), where(field, "==", value));
    // const querySnapshot = await getDocs(q);
    // return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  // };