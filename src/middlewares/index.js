const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

module.exports = [
  express.json(),
  morgan(
    "[:date[clf]] :method :url HTTP/:http-version :status :res[content-length] - :response-time ms"
  ),
  cors(),
];
