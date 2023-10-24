const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet'); // adds a bunch of standard security to server
const Book = require('./models/Book.js');
require('dotenv').config();
require('./config/db.js');
const PORT = 3000;


const app = express();


// START MIDDLEWARE //
app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(morgan('dev'));
app.use(helmet());
// END MIDDLEWARE //

// START ROUTES //


// find   - finds everything
// .find()

// findById

// insertMany
app.post('/books', async (req, res) => {
    // in the request there should be an array of books objects.
    let books = req.body.books;

    let dbResponse = await Book.insertMany(books);
    res.send(dbResponse);
});

// findOne
app.get("/books", async (req, res) => {
    let bookToFind = req.body.books
    let dbResponse = await Book.findOne(bookToFind)
    res.send(dbResponse);
});

//update one book title based on title
app.put("/books", async (req, res) => {
    let oldTitle = req.body.books.title;
    let newTitle = req.body.books.newTitle
    let dbResponse = await Book.updateOne({ title: oldTitle }, { title: newTitle }, { new: true });
    res.send(dbResponse)
});

// create new book
app.post("/books", async (req, res) => {
    let newBook = req.body.books
    let dbResponse = await Book.create(newBook);
    res.send(dbResponse)
});

// delete a book by its id
app.delete("/books", async (req, res) => {
    let bookId = req.body.books.id
    let deletedBook = await Book.findByIdAndDelete(bookId);
    res.send(deletedBook)
});

// find all books larger than X pages
app.get("/books/pages", async (req, res) => {
    let largeBook = req.body.books.pages;
    let bigBooks = await Book.find({ pages: { $gt: largeBook } }).exec();
    res.send(bigBooks)
});


// END ROUTES //

app.listen(PORT, () => {
    console.log(`Server LIVE on port ${PORT}`);
});


