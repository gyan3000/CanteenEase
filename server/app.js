const connectToMongo = require("./db");

connectToMongo();
const express = require('express')
const _ = require("dotenv");
require('dotenv').config(); 

var cors = require("cors");
const app = express()
const port = 5000
var bodyParser = require('body-parser')

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/menu", require("./routes/menu"));
app.use("/api/order", require("./routes/order"));
app.use("/api", require("./routes/paymentRoute"));

app.use("/api", require("./routes/razorpayRoutes"));

app.listen(port, () => {
  console.log(`CanteenConnect is listening on port ${port}`)
})