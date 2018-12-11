const express = require("express");
const router = express.Router();

/* we are requiring our collection model */
const Book = require("../models/book.js");

module.exports = router;


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* creating a books route to list all the books */
router.get('/books', (req, res, next) => {
  Book.find()
    .then(books => {
      res.render("books", { books });
    })
    .catch(error => {
      console.log(error)
    })
});

/* creating a route to see a specific book */ 
router.get('/book/:id', (req, res, next) => {
  let bookId = req.params.id;
  Book.findOne({'_id': bookId})
    .then(book => {
      res.render("book-detail", { book })
    })
    .catch(error => {
      console.log(error)
    })
});

/* route to create a book - PART 1 : afficher le formulaire de saisie */
router.get('/add', (req, res, next) => {
  res.render("book-add");
});

/* route to create a book - PART 2 : prend les données saisies dans le 
formulaire et les ajoute à la base de données */
router.post('/books/add', (req, res, next) => {
  // 1st - get the data and store it in variables 
  const { title, author, description, rating } = req.body;
  // 2nd - we create a new book
  const newBook = new Book({ title, author, description, rating});
  // 3d - we save the new book 
  newBook.save()
  .then((book) => {
    res.redirect('/books');
  })
  .catch((error) => {
    console.log(error);
  })
});


/* edit a book - PART 1 : afficher le formulaire d'édition */
router.get('/books/edit', (req, res, next) => {
  Book.findOne({_id: req.query.book_id})
  .then((book) => {
    res.render("book-edit", {book});
  })
  .catch((error) => {
    console.log(error);
  })
});
/* edit a book - PART 2 : pré-remplir les champs qu'on veut modifier */

router.post('/books/edit', (req, res, next) => {
  const { book_id, title, author, description, rating } = req.body;
  Book.update({_id: book_id}, { $set: {title, author, description, rating }})
  .then((book) => {
    res.redirect('/books');
  })
  .catch((error) => {
    console.log(error);
  })
});

