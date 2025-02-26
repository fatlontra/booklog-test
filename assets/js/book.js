import { db } from '../../firebase.js'; // Adjusted for root directory
import { 
    collection, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc, 
    getDocs, 
    query, 
    where 
} from 'firebase/firestore';

class Book {
    constructor(name, genre, author, pages, category, rate) {
        this.name = name;
        this.genre = genre;
        this.author = author;
        this.pages = pages;
        this.category = category; // Sci-Fi, Fantasy, Erotic, Horror
        this.rate = rate; // 1-5
    }
}

async function addBook() {
    const bookName = document.getElementById('book-name').value.trim();
    if (!bookName) {
        document.getElementById('book-error').textContent = 'Book name is required';
        return;
    }

    try {
        const bookData = new Book(
            bookName,
            'Sci-Fi', 
            'JK Rowling', 
            350,
            'Sci-Fi',
            3
        );
        await addDoc(collection(db, 'books'), { ...bookData });
        document.getElementById('book-name').value = '';
        document.getElementById('book-error').textContent = '';
        renderBooks();
    } catch (error) {
        console.error('Error adding book:', error);
        document.getElementById('book-error').textContent = 'Error adding book';
    }
}

async function editBook(bookId) {
    const bookItem = document.querySelector(`[data-id="${bookId}"]`);
    const currentName = bookItem.querySelector('span').textContent.split(' - ')[0];
    const newName = prompt('Enter new book name:', currentName);
    if (newName && newName.trim()) {
        try {
            const bookRef = doc(db, 'books', bookId);
            await updateDoc(bookRef, { name: newName.trim() });
            renderBooks();
        } catch (error) {
            console.error('Error editing book:', error);
        }
    }
}

async function deleteBook(bookId) {
    if (confirm('Are you sure you want to delete this book?')) {
        try {
            const bookRef = doc(db, 'books', bookId);
            await deleteDoc(bookRef);
            renderBooks();
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    }
}

async function filterBooks(criteria) {
    try {
        let q = collection(db, 'books');
        if (criteria.genre) {
            q = query(q, where('genre', '==', criteria.genre));
        } else if (criteria.author) {
            q = query(q, where('author', '==', criteria.author));
        }
        const querySnapshot = await getDocs(q);
        const booksList = document.getElementById('book-list');
        booksList.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const book = doc.data();
            const bookItem = document.createElement('li');
            bookItem.className = 'book-item';
            bookItem.tabIndex = 0;
            bookItem.dataset.id = doc.id;
            bookItem.innerHTML = `
                <span>${book.name} - ${book.genre} - ${book.author} - ${book.pages} pages - ${book.rate}/5</span>
                <button class="btn-small" onclick="editBook('${doc.id}')">Edit</button>
                <button class="btn-small" onclick="deleteBook('${doc.id}')">Delete</button>
            `;
            booksList.appendChild(bookItem);
        });
    } catch (error) {
        console.error('Error filtering books:', error);
    }
}

async function renderBooks() {
    try {
        const querySnapshot = await getDocs(collection(db, 'books'));
        const booksList = document.getElementById('book-list');
        booksList.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const book = doc.data();
            const bookItem = document.createElement('li');
            bookItem.className = 'book-item';
            bookItem.tabIndex = 0;
            bookItem.dataset.id = doc.id;
            bookItem.innerHTML = `
                <span>${book.name} - ${book.genre} - ${book.author} - ${book.pages} pages - ${book.rate}/5</span>
                <button class="btn-small" onclick="editBook('${doc.id}')">Edit</button>
                <button class="btn-small" onclick="deleteBook('${doc.id}')">Delete</button>
            `;
            booksList.appendChild(bookItem);
        });
    } catch (error) {
        console.error('Error rendering books:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize book list
    renderBooks();

    // Form submission
    const addBookForm = document.getElementById('add-book-form');
    addBookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addBook();
    });

    // Keyboard navigation for book list
    const bookList = document.getElementById('book-list');
    bookList.addEventListener('keydown', (e) => {
        const focused = document.activeElement;
        if (focused.className === 'book-item') {
            if (e.key === 'Enter') {
                focused.querySelector('.btn-small')?.focus();
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                const items = Array.from(bookList.querySelectorAll('.book-item'));
                const currentIndex = items.indexOf(focused);
                const newIndex = currentIndex + (e.key === 'ArrowDown' ? 1 : -1);
                if (newIndex >= 0 && newIndex < items.length) {
                    items[newIndex].focus();
                }
            }
        }
    });
});