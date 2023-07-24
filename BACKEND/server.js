const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express(); 
require("dotenv").config();


 const PORT = process.env.PORT || 8040;

 app.use(cors());
 app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    w: "majority"

});
const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("mongodb connection success!");

})

const vehicleRouter = require("./routes/Vehicles.js");
const priceRouter = require("./routes/prices.js");

app.use("/vehicle", vehicleRouter);
app.use("/price", priceRouter);


app.listen(PORT,()=>{
    console.log(`Server is up and running on port: ${PORT}`)
})