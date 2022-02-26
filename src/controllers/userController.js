

const bookModel = require("../models/bookModel")

const createNewBook = async function (req, res) {
    let data = req.body
    let savedData = await bookModel.create(data)
    res.send({ msg: savedData })
}

const getBookList = async function (req, res) {
    let allbooks = await bookModel.find()
    res.send({ msg: allbooks })
}

module.exports.createNewBook = createNewBook
module.exports.getBookList = getBookList