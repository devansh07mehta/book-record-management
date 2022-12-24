const { UserModel, BookModel } = require("../models");
const IssuedBook = require("../dtos/book-dto");
// const getAllBooks
exports.getAllBooks = async (req, res) => {
  const books = await BookModel.find();

  if (books.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Books Found",
    });
  }
  res.status(200).json({
    success: true,
    data: books,
  });
};

// const getSingleBookById
exports.getSingleBookById = async (req, res) => {
  const { id } = req.params;

  const book = await BookModel.findById(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found by id",
    });
  }
  return res.status(200).json({
    success: true,
    data: book,
  });
};

// Not Working
exports.getAllIssuedBooks = async (req, res) => {
  const users = await UserModel.find({
    issuedBook: { $exists: true },
  }).populate("issuedBook");

  // DTOs => Data Transfer Object
  const issuedBooks = users.map((each) => new IssuedBook(each));
  if (issuedBooks.length === 0)
    return res.status(404).json({
      success: false,
      message: "No books has been issued",
    });
  return res.status(200).json({
    success: true,
    data: issuedBooks,
  });
};

exports.addNewBook = async (req, res) => {
  const { data } = req.body;
  const book = await BookModel.findOne(data);

  if (book) {
    return res.status(404).json({
      success: false,
      message: "Book already exists cannot add a new book",
    });
  }
  if (!data) {
    return res.status(404).json({
      success: false,
      message: "No data was provided to add a new book",
    });
  }
  await BookModel.create(data);

  const allBooks = await BookModel.find();
  //const book = books.find((each) => each.id === data.id);
  // const book = await BookModel.findById();
  // if (book) {
  //   return res.status(404).json({
  //     success: false,
  //     message: "Book already exists with the same id",
  //   });
  // }

  return res.status(200).json({
    success: true,
    data: allBooks,
  });
};

exports.updatedBookById = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "No data provided to update a book",
    });
  }

  const updatedBook = await BookModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });

  const book = await BookModel.findById(id);
  // const book = books.find((each) => each.id === id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book cannot be updated due to false id",
    });
  }

  return res.status(200).json({
    success: true,
    data: updatedBook,
  });
};

exports.deleteBookById = async (req, res) => {
  const { id } = req.params;
  const book = await BookModel.findById(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book to be deleted is not found by id",
    });
  }

  await BookModel.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Book selected by id is deleted successfully!!",
  });
};

// module.exports = { getAllBooks, getSingleBookById };

// function compare(a, b) => {
//    let a = 2;
//    let b = 3;
//    if(this.a === a && this.b === b){

//    }
// }

// compare(4,6);
