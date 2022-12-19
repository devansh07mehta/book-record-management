const express = require("express");
const app = express();
const PORT = 8081;
app.use(express.json());

// command for saving nodemon as developer dependency with short abbreviation named dev => npm i nodemon --save-dev