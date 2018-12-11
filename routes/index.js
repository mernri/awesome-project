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