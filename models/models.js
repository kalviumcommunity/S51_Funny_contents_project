const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userid:Number,
    fname:String,
    lname:String,
    country:String,
    age:Number,
    typeofcontent:String
})

const userDetails = mongoose.model('userdetails', userSchema);

module.exports = userDetails;