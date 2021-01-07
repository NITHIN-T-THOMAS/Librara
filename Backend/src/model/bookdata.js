//Accessing Mongoose package
const mongoose = require('mongoose');

//Database connection
mongoose.connect('mongodb+srv://userone:userone@ictlib.xusnv.mongodb.net/LIBRAARY?retryWrites=true&w=majority');

//schema definition
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    bookname: String,
    author: String,
    genre: String,
    imageurl: String
});

//Model creation
var Bookdata = mongoose.model('bookdata',BookSchema); //Note: if the name is singular the database will show a plural name automatically i.e here 'bookdata' will become 'bookdatas' in database

module.exports = Bookdata;
