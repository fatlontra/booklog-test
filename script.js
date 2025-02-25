class Book {
    constructor(title, author, genre, pages, rating = 0) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.pages = pages;
        this.rating = rating;
        this.id = Date.now().toString();
    }
}

class BookLog {
    constructor() {
        this.books = JSON.parse(localStorage.getItem('books')) || [];
        this.currentEditId = null;
        
        this.initEventListeners();
        this.renderBooks();
        this.populateSortOptions();
    }

    initEventListeners() {
        document.getElementById('add-book').addEventListener('click', () => this.showModal());
        document.querySelector('.close').addEventListener('click', () => this.hideModal());
        document.getElementById('book-form').addEventListener('submit', (e) => this.handleSubmit(e));
        document.getElementById('sort-genre').addEventListener('change', () => this.sortBooks('genre'));
        document.getElementById('sort-author').addEventListener('change', () => this.sortBooks('author'));
    }

    renderBooks() {
        const container = document.getElementById('book-list');
        container.innerHTML = '';
        
        this.books.forEach(book => {
            const card = document.createElement('div');
            card.className = 'book-card';
            card.innerHTML = `
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Genre: ${book.genre}</p>
                <p>Pages: ${book.pages}</p>
                <div class="rating">${this.createRatingStars(book.rating)}</div>
                <div class="actions">
                    <button class="btn primary edit" data-id="${book.id}">Edit</button>
                    <button class="btn delete" data-id="${book.id}">Delete</button>
                </div>
            `;
            
            card.querySelector('.edit').addEventListener('click', (e) => this.editBook(e));
            card.querySelector('.delete').addEventListener('click', (e) => this.deleteBook(e));
            container.appendChild(card);
        });
    }

    createRatingStars(rating) {
        return [...Array(5)].map((_, i) => 
            `<span class="star" data-value="${i + 1}">${i < rating ? '★' : '☆'}</span>`
        ).join('');
    }

    // CRUD Operations
    addBook(book) {
        this.books.push(book);
        this.saveToLocal();
        this.renderBooks();
    }

    editBook(e) {
        const id = e.target.dataset.id;
        const book = this.books.find(b => b.id === id);
        this.currentEditId = id;
        this.showModal(book);
    }

    deleteBook(e) {
        const id = e.target.dataset.id;
        this.books = this.books.filter(b => b.id !== id);
        this.saveToLocal();
        this.renderBooks();
    }

    // Modal Handling
    showModal(book) {
        const modal = document.getElementById('book-modal');
        modal.style.display = 'block';
        
        if(book) {
            document.getElementById('modal-title').textContent = 'Edit Book';
            document.getElementById('title').value = book.title;
            document.getElementById('author').value = book.author;
            document.getElementById('genre').value = book.genre;
            document.getElementById('pages').value = book.pages;
            document.getElementById('rating').innerHTML = this.createRatingStars(book.rating);
        }
    }

    hideModal() {
        document.getElementById('book-modal').style.display = 'none';
        this.currentEditId = null;
        document.getElementById('book-form').reset();
    }

    handleSubmit(e) {
        e.preventDefault();
        const newBook = new Book(
            document.getElementById('title').value,
            document.getElementById('author').value,
            document.getElementById('genre').value,
            document.getElementById('pages').value,
            document.querySelector('.star.active')?.dataset.value || 0
        );

        if(this.currentEditId) {
            const index = this.books.findIndex(b => b.id === this.currentEditId);
            this.books[index] = {...newBook, id: this.currentEditId};
        } else {
            this.addBook(newBook);
        }

        this.hideModal();
    }

    // Helper Methods
    saveToLocal() {
        localStorage.setItem('books', JSON.stringify(this.books));
    }

    populateSortOptions() {
        // Implementation for populating sort options
    }

    sortBooks(by) {
        // Implementation for sorting
    }
}

// Initialize App
const bookLog = new BookLog();

// Placeholder for Firebase Integration
/* 
function initFirebase() {
    // Firebase initialization code
}
*/

// Placeholder for Biometric Auth
document.getElementById('bio-login').addEventListener('click', () => {
    // Biometric authentication logic
});

// Placeholder for Chatbot
document.querySelector('.chatbot-input').addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        // Handle chatbot query
    }
});