
// const ObjectId = mongoose.Schema.Types.ObjectId

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({


    name: String,
    category: String,
    price: {
        type: Number,
        required: true
    }
    
})

module.exports = mongoose.model("product", productSchema)


//     name: String,

//     author: {

//         type : ObjectId,
//         ref : "newAuthor"
//     },

//     price: Number,
//     ratings: Number,
//     publisher : {

//         type : ObjectId,
//         ref : "newPublisher"
//     },
//     isHardCover: {
//         type : Boolean,
//         default : false
//     }

// }, { timestamps: true });


