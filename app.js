require("dotenv").config();

const express = require('express')
const app = express()
const port = 3000

const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGOURL)
    .then(()=>console.log("Connected"));


const company = require("./router/company");
app.use("/company",company);

const product = require("./router/product");
app.use("/product",product);

const seller = require("./router/seller");
app.use("/seller",seller);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`app listening on port ${port}!`))