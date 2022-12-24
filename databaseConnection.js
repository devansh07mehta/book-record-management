const mongoose = require("mongoose");

function DbConnection() {
  const DB_URL = process.env.MONGO_URI;

  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", console.error.bind("Connection error")); //error.bind will show the error on the console with font-color as red & u will be able to locate the error.
  db.once("open", function () {
    // connection is established & opened only once
    console.log("DB Connected!");
  });
}

// CRUD => Create, Read, Update & Delete
module.exports = DbConnection;
