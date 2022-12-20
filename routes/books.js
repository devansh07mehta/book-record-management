const express = require("express");
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all the books
 * Access: Public
 * Parameters: none
 */
router.get("/", (req,res) => {
    res.status(200).json({
        success: true,
        data: books
    });
});

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get a book by it's id
 * Access: Public
 * Parameters: id
 */
router.get("/:id", (req,res) => {
    const {id} = req.params;
    const book = books.find((each) => each.id === id);
    if(!book){
        return res.status(404).json({
            success: false,
            message: "Book not found by id"
        });
    }
    return res.status(200).json({
        success: true,
        data: book
    });
});

/**
 * Route: /books/issued/by-user
 * Method: GET
 * Description: Get all the issued books
 * Access: Public
 * Parameters: none
 */

router.get("/issued/by-user", (req,res) => {
    const usersWithIssuedBook = users.filter((each) => {
        if(each.issuedBook)
            return each;
    });
    const issuedBooks = [];

    usersWithIssuedBook.forEach((each) => {
        const book = books.find((book) => book.id === each.issuedBook);
        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
    });

    if(issuedBooks.length === 0)
        return res.status(404).json({
            success: false,
            message: "No books has been issued"
        });
    return res.status(200).json({
        success: true,
        data: issuedBooks
    });
});

/**
 * Route: /books
 * Method: POST
 * Description: Add a new book
 * Access: Public
 * Parameters: none
 */

router.post("/", (req,res) => {
    const {data} = req.body;

    if(!data){
        return res.status(404).json({
            success: false,
            message: "No data was provided to add a new book"
        });
    }

    const book = books.find((each) => each.id === data.id);

    if(book){
        return res.status(404).json({
            success: false,
            message: "Book already exists with the same id"
        });
    }

    const allBooks = [...books,data];   // We r using array syntax here bcauz of array inside object concept in books.json.

    return res.status(200).json({
        success: true,
        data: allBooks
    });
});

/**
 * Route: /books/:id
 * Method: PUT
 * Description: Updating a book
 * Access: Public
 * Parameters: id
 */

router.put("/:id", (req,res) => {
    const {id} =req.params;
    const {data} =req.body;
    if(!data){
        return res.status(404).json({
            success: false,
            message: "No data provided to update a book"
        });
    }

    const book = books.find((each) => each.id === id);
    if(!book){
        return res.status(404).json({
            success: false,
            message: "Book cannot be updated due to false id"
        });
    }

    const updatedData = books.map((each) => {
        if(each.id === id){
            return {...each,...data};
        }
        return each;
    });

    return res.status(200).json({
        success: true,
        data: updatedData
    });
});

module.exports = router;