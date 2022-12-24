const express = require("express");
const {
  getAllBooks,
  getSingleBookById,
  getAllIssuedBooks,
  addNewBook,
  updatedBookById,
  deleteBookById,
} = require("../controllers/book-controller");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const { UserModel, BookModel } = require("../models");

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all the books
 * Access: Public
 * Parameters: none
 */
router.get("/", getAllBooks);

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get a book by it's id
 * Access: Public
 * Parameters: id
 */
router.get("/:id", getSingleBookById);

/**
 * Route: /books/issued/by-user
 * Method: GET
 * Description: Get all the issued books
 * Access: Public
 * Parameters: none
 */
router.get("/issued/by-user", getAllIssuedBooks);

/**
 * Route: /books
 * Method: POST
 * Description: Add a new book
 * Access: Public
 * Parameters: none
 */
router.post("/", addNewBook);

/**
 * Route: /books/:id
 * Method: PUT
 * Description: Updating a book
 * Access: Public
 * Parameters: id
 */
router.put("/:id", updatedBookById);

router.delete("/:id", deleteBookById);

module.exports = router;
