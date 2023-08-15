const connectToMongo = require("./db");

connectToMongo();
const express = require('express')
const _ = require("dotenv");
require('dotenv').config(); 

var cors = require("cors");
const app = express()
const port = 5000

app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/menu", require("./routes/menu"));

app.listen(port, () => {
  console.log(`CanteenConnect is listening on port ${port}`)
})