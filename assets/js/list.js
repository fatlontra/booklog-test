import { Book, addBook, editBook, deleteBook, filterBooks } from './book.js';
import { db } from './firebase.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

class BookList {
  constructor() {
    this.books = [];
    this.currentEditId = null;
    this.initEventListeners();
    onAuthStateChanged(auth, (user) => {
      if (user){
        this.fetchBooks(); // Fetch books from Firestore when user is signed in
      } else {
        window.location.href = '../../index.html'; // Redirect to login page if not signed
      }
    })
    
  }

  async fetchBooks() {
    try {
      const querySnapshot = await getDocs(collection(db, 'books'));
      this.books = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      this.renderBooks();
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }

    initEventListeners() {
      document.getElementById('add-book').addEventListener('click', () => this.showModal());
      document.querySelector('.close').addEventListener('click', () => this.hideModal());
      document.getElementById('book-form').addEventListener('submit', (e) => this.handleSubmit(e));
      document.getElementById('sort-genre').addEventListener('change', (e) => this.filter('genre', e.target.value));
      document.getElementById('sort-author').addEventListener('change', (e) => this.filter('author', e.target.value));
    }

    renderBooks(books = this.books) {
        const container = document.getElementById('book-list');
        container.innerHTML = '';
        books.forEach(book => {
          const card = document.createElement('div');
          card.className = 'book-card';
          card.innerHTML = `
            <h3>${book.name}</h3>
            <p>Author: ${book.author}</p>
            <p>Genre: ${book.genre}</p>
            <p>Pages: ${book.pages}</p>
            <div class="rating">${this.createRatingStars(book.rate)}</div>
            <div class="actions">
              <button class="btn primary edit" data-id="${book.id}">Edit</button>
              <button class="btn delete" data-id="${book.id}">Delete</button>
            </div>
          `;
          card.querySelector('.edit').addEventListener('click', (e) => this.editBook(e.target.dataset.id));
          card.querySelector('.delete').addEventListener('click', (e) => this.deleteBook(e.target.dataset.id));
          container.appendChild(card);
        });
      }

    createRatingStars(rate) {
        return [...Array(5)].map((_, i) => 
            `<span class="star">${i < rate ? '★' : '☆'}</span>`
        ).join('');
    }

    showModal(book = null) {
        const modal = document.getElementById('book-modal');
        modal.style.display = 'block';
        if (book) {
            document.getElementById('modal-title').textContent = 'Edit Book';
            document.getElementById('name').value = book.name;
            document.getElementById('author').value = book.author;
            document.getElementById('genre').value = book.genre;
            document.getElementById('pages').value = book.pages;
            document.getElementById('rating').innerHTML = this.createRatingStars(book.rate);
            this.currentEditId = book.id;
        }
    }

    hideModal() {
        document.getElementById('book-modal').style.display = 'none';
        this.currentEditId = null;
        document.getElementById('book-form').reset();
    }

    async handleSubmit(e) {
        e.preventDefault();
        const book = new Book(
          document.getElementById('name').value,
          document.getElementById('genre').value,
          document.getElementById('author').value,
          document.getElementById('pages').value,
          document.querySelector('.star.active')?.dataset.value || 0
        );
        if (this.currentEditId) {
          await editBook(this.currentEditId, book);
        } else {
          await addBook(book);
        }
        await this.fetchBooks();
        this.hideModal();
    }

    async editBook(id) {
        const book = this.books.find(b => b.id === id);
        this.showModal(book);
    }

    async deleteBook(id) {
        await deleteBook(id);
        await this.fetchBooks(); // Refresh
    }

    async filter(by, value) {
        if (value) {
            this.books = await filterBooks(by, value);
        } else {
            await this.fetchBooks(); // Fetch all if no filter
        }
        this.renderBooks();
    }
}

new BookList();