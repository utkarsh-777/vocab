const express = require('express');
const mongoose = require('mongoose')
const bodyparser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express()
const {mongo_uri} = require("./keys");

const vocabRoutes = require("./routes/vocab");

app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

mongoose.connect(mongo_uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

mongoose.connection.on('connected',()=>{
    console.log("DB CONNECTED!")
});

mongoose.connection.on('error',()=>{
    console.log("ERROR CONNECTING TO DB!")
});

app.use("/api",vocabRoutes);

app.listen(PORT,()=>{
    console.log(`App is listening at ${PORT}`)
});
