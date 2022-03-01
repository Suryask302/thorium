

const bookModel = require("../models/bookModel")

const createNewBook = async (req, res) => {
    let data = req.body
    let savedData = await bookModel.create(data)
    res.send({ msg: savedData })
}

const getBookList = async (req, res) => {
    let allbooks = await bookModel.find().select({bookName : 1 , authorName : 1 , _id : 0})
    res.send({ msg: allbooks })
}


const getBooksInYear = async (req, res) => {
    let yr = req.body
    let booksInYr = await bookModel.find( yr )
    res.send({ msg: booksInYr })
}


const getPerticularBooks = async (req, res) => {
    let body = req.body
    let perticularBooks = await bookModel.find( body )
    res.send({ msg: perticularBooks })
}

const getXINRBooks = async (req, res) => {
    let books = await bookModel.find( { "prices.indianPrice" : {$in : ["100INR" , "INR200" , "INR500"]}} )
    res.send({ msg: books })
}

const getRandomBooks = async function (req, res) {
    let randomBooks = await bookModel.find({ $or: [ {stockAvilable : true } , { totalPages :{$gt:500} } ]})
    res.send({ msg: randomBooks })
}

module.exports.createNewBook = createNewBook
module.exports.getBookList = getBookList
module.exports.getBooksInYear = getBooksInYear
module.exports.getPerticularBooks = getPerticularBooks
module.exports.getXINRBooks = getXINRBooks
module.exports.getRandomBooks = getRandomBooks


