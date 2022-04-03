const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true,'title is required'],
        trim: true,
        unique: true,
        lowercase:true
    },
    
    bookCover : {
        type: String,
    },

    excerpt: {
        type: String,
        trim: true,
        required: [true,'excerpt is required']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true,'userId is required'],
        trim: true,
        refs: 'User'
    },
    ISBN: {
        type: String,
        requireed: [true,'ISBN is required'],
        trim: true,
        unique: true
    },
    category: {
        type: String,
        trim: true,
        required: [true,'category is required']
    },
    subcategory: {
        type: [],
        trim: true,
        required: [true,'subcategory is required']
    },
    reviews: {
        type: Number,
        default: 0,
        //comment: Holds number of reviews of this book
    },
    deletedAt: {
        type: Date,
        default: null
        //when the document is deleted
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    releasedAt: {
        type: Date,
        required: [true,"Release date is required"]// format("YYYY-MM-DD")
    },



}, { timestamps: true })
module.exports = mongoose.model('Book', bookSchema)