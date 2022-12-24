const express = require("express");

// import DB connection file
const DbConnection = require("./databaseConnection");

// import db
const dotenv = require("dotenv");

// importing models
// const { UserModel, BookModel } = require("./models/index.js");

//importing routes
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

dotenv.config();

const app = express();

DbConnection();

const PORT = 8081;

app.use(express.json()); // To transfer the data(i.e response from the server) in the JSON format.

// command for saving nodemon as developer dependency with short abbreviation named dev => npm i nodemon --save-dev
// const data = ["devansh","rohan"];

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running successfully",
  });
});

app.use("/users", usersRouter); // http://localhost:8081/users
app.use("/books", booksRouter); // http://localhost:8081/books

app.get("*", (req, res) => {
  // For Routes other than the default route i.e /users & /books
  res.status(404).json({
    message: "This route doesn't exist",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
