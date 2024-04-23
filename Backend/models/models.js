const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:String,
    country:String,
    age:Number,
    content:String
})

const userDetails = mongoose.model('userdetails', userSchema);

module.exports = userDetails;