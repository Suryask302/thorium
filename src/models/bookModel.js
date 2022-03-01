

const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({

    bookName: {
        type: String,
        required: true
    },

    prices: {
        indianPrice: String,
        europePrice: String
    },
    
    tags: [String],
    authorName: String,
    totalPages : Number,
    stockAvilable : Boolean,

    year: {
        type: Number,
        default: 2021
    }

}, { timestamps: true });

module.exports = mongoose.model('book', bookSchema)
