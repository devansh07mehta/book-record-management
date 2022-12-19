const express = require("express");

//importing routes
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

const app = express();
const PORT = 8081;
app.use(express.json()); // To transfer the data(i.e response from the server) in the JSON format.

// command for saving nodemon as developer dependency with short abbreviation named dev => npm i nodemon --save-dev
// const data = ["devansh","rohan"];

app.get("/", (req,res) => {
    res.status(200).json({
        message: "Server is up and running successfully",
    });
});

app.use("/users", usersRouter); // http://localhost:8081/users
app.use("/books", booksRouter); // http://localhost:8081/books