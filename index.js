const express = require("express");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const products = require("./routes/products");
const app = express();

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/hanabi-jar-backend")
  .then(() => console.error("you connected to hanabi jar backend"))
  .catch((error) => console.log(error));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/products", products);

const port = process.env.PORT || 5555;
app.listen(port, () => console.log(`listening from port ${port}`));
