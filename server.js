const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

let books = [
    { id: 1, name: 'OOP', price: 10, category: 'Programming' },
    { id: 2, name: 'Bootstrap', price: 15, category: 'Front-end' },
    { id: 3, name: 'Java', price: 20, category: 'Back-end' },
    { id: 4, name: 'Angular', price: 25, category: 'Front-end' }
];

// Create
app.post('/books', (req, res) => {
    const book = req.body;
    book.id = books.length + 1;
    books.push(book);
    res.status(201).send(book);
});

// Read all
app.get('/books', (req, res) => {
    res.send(books);
});

// Read one
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');
    res.send(book);
});

// Update
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');

    book.name = req.body.name;
    book.price = req.body.price;
    book.category = req.body.category;
    res.send(book);
});

// Delete
app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).send('Book not found');

    const deletedBook = books.splice(bookIndex, 1);
    res.send(deletedBook);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
