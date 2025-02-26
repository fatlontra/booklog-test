// assets/js/book.js
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

// Placeholder functions
function addBook() {
    // Add book to list and Firebase (future)
    console.log("Add book placeholder");
}

function editBook(bookId) {
    // Edit book details
    console.log("Edit book placeholder");
}

function deleteBook(bookId) {
    // Delete book from list and Firebase (future)
    console.log("Delete book placeholder");
}

function filterBooks(criteria) {
    // Filter by genre or author
    console.log("Filter books placeholder");
}

// Event listeners (to be implemented)
document.addEventListener("DOMContentLoaded", () => {
    // Initialize book list from Firebase (future)
    // Add event listeners for form submission, keyboard navigation
});