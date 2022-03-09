

const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({


    firstName: String,
    lastName: String,
    mobile: String,
    emailId: String,
    password: String,
    gender: String,
    isDeleted: Boolean,
    age: Number,
    posts: {
        type: [],
        deafult: []
    }


}, { timestamps: true });

module.exports = mongoose.model('newUser', userSchema)

