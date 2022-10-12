const express = require("express");
const app = express();

const middlewares = require("./middlewares/index.js");
const router = require("./routes/index.js");

require("dotenv/config");

const PORT = process.env.API_PORT || 5000;

// middlewares
middlewares.forEach((middleware) => app.use(middleware));

// router
app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
