import { db, auth } from './firebase.js';
import { collection, addDoc, updateDoc, deleteDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

class Book {
    constructor(name, genre, author, pages, rate = 0, id = null) {
        this.name = name;
        this.genre = genre; // Sci-Fi, Fantasy, Erotic, Horror
        this.author = author;
        this.pages = pages; 
        this.rate = rate; // 1-5
        this.id = id;
    }
}
/* Adding CRUD functionalities responding to Firestore */
async function addBook(book) {
    if (!auth.currentUser) { // Checking if the user is authenticated
        throw new Error('You must be signed in to add a book.');
    }

    try {
        const docRef = await addDoc (collection(db, 'books'), {
            name: book.name,
            genre: book.genre,
            author: book.author,
            pages: book.pages,
            rate: book.rate
        });
        return {...book, id: docRef.id};    
    } catch (error) {
        console.error('Error adding book:', error);
        throw error;
    }
}

async function editBook(id, updatedBook) {
    try {
        const bookRef = doc(db, 'books', id);
        await updateDoc(bookRef, {
            name: updatedBook.name,
            genre: updatedBook.genre,
            author: updatedBook.author,
            pages: updatedBook.pages,
            rate: updatedBook.rate
        });
    } catch (error) {
        console.error('Error editing book:', error);
        throw error;
    }
}

async function deleteBook(id) {
    try {
        await deleteDoc(doc(db, 'books', id));
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
}

async function filterBooks(by, value) {
    try {
        const booksQuery = query(collection(db, 'books'), where(by, '==', value.toLowerCase()));
        const querySnapShot = await getDocs(booksQuery);
        return querySnapShot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error filtering books:', error);
        throw error;
    }
}

export { Book, addBook, editBook, deleteBook, filterBooks };