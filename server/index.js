const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const ProductRoute = require("./Routes/product");
const InvoiceRoute = require("./Routes/invoice");
var bodyParser = require('body-parser')

const app = express();
dotenv.config();
var corsOptions = {
  origin: 'http://localhost:3000'
}
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_DEV_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('open', function () {
  console.log("connected to db")
});

app.use('/api/product', ProductRoute);
app.use('/api/invoice', InvoiceRoute);

app.listen("5000", () => {
  console.log("Server up & Running at localhost:5000")
});