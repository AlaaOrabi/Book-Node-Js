document.addEventListener('DOMContentLoaded', () => {
    const bookList = document.getElementById('book-list');
    const bookNameInput = document.getElementById('book-name');
    const bookPriceInput = document.getElementById('book-price');
    const bookCategoryInput = document.getElementById('book-category');
    const addBookButton = document.getElementById('add-book');

    const fetchBooks = async () => {
        const response = await fetch('/books');
        const books = await response.json();
        bookList.innerHTML = '';
        books.forEach(book => {
            const li = document.createElement('li');
            li.textContent = `${book.name} - $${book.price} - ${book.category}`;
            li.id = `book-${book.id}`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteBook(book.id);

            const updateButton = document.createElement('button');
            updateButton.textContent = 'Update';
            updateButton.onclick = () => updateBook(book.id);

            li.appendChild(updateButton);
            li.appendChild(deleteButton);
            bookList.appendChild(li);
        });
    };

    const addBook = async () => {
        const name = bookNameInput.value;
        const price = bookPriceInput.value;
        const category = bookCategoryInput.value;
        if (!name || !price || !category) return;

        await fetch('/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, price, category }),
        });
        bookNameInput.value = '';
        bookPriceInput.value = '';
        bookCategoryInput.value = '';
        fetchBooks();
    };

    const deleteBook = async (id) => {
        await fetch(`/books/${id}`, {
            method: 'DELETE',
        });
        fetchBooks();
    };

    const updateBook = async (id) => {
        const newName = prompt('Enter new name:');
        const newPrice = prompt('Enter new price:');
        const newCategory = prompt('Enter new category:');
        if (!newName || !newPrice || !newCategory) return;

        await fetch(`/books/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newName, price: newPrice, category: newCategory }),
        });
        fetchBooks();
    };

    addBookButton.addEventListener('click', addBook);
    fetchBooks();
});
