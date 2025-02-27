class Book {
    constructor(name, genre, author, pages, category, rate = 0) {
        this.name = name;
        this.genre = genre;
        this.author = author;
        this.pages = pages;
        this.category = category; // Sci-Fi, Fantasy, Erotic, Horror
        this.rate = rate; // 1-5
        this.id = Date.now().toString();
    }
}

function addBook(book) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}

function editBook(id, updatedBook) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const index = books.findIndex(b => b.id === id);
    if (index !== -1) {
        books[index] = { ...updatedBook, id };
        localStorage.setItem('books', JSON.stringify(books));
    }
}

function deleteBook(id) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const updatedBooks = books.filter(b => b.id !== id);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
}

function filterBooks(by, value) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    return books.filter(book => book[by].toLowerCase() === value.toLowerCase());
}

export { Book, addBook, editBook, deleteBook, filterBooks };