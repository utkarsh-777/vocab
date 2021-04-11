const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    word: String,
    data: String
},{timestamps:true});

module.exports = mongoose.model("Word",wordSchema);