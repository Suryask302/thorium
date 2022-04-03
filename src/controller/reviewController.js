
const bookModel = require('../models/bookModel')
const reviewModel = require("../models/reviewModel")
const validate = require('../validator/validators')

///////////////////   Review   /////////////////////////
const addReview = async (req, res) => {
    try {
        let reviewData = req.body
        let bookID = req.params.bookId

        let { bookId, reviewedBy, rating, review } = reviewData
        if (!validate.isValid(bookId)) {
            return res.status(400).send({ status: false, message: "Book Id Is Required For writing Review" })
        }
        if (!validate.isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, message: "Please Enter A valid Book Id" })
        }
        if (!validate.isValidObjectId(bookID)) {
            return res.status(400).send({ status: false, message: "Please Enter A valid Book Id" })
        }
        let isBookPresent = await bookModel.findOne({ _id: bookID, isDeleted: false })
        if (!isBookPresent) {
            return res.status(404).send({ status: false, message: "Book not found, please check Book Id" })
        }
        if (req.body.bookId != req.params.bookId) {
            return res.status(400).send({ status: false, message: "This review dosent belong To given Book Id" })
        }
        if (!Object.keys(req.body).includes("reviewedBy")) {
            return res.status(404).send({ status: false, message: "reviewed By is require" })
        }
        if (Object.keys(req.body).includes("reviewedBy")) {
            if (typeof reviewedBy != 'string') {
                return res.status(400).send({ status: false, message: "Please Give a proper Name" })
            }
            if ((reviewedBy.trim() == "") || (reviewedBy == null)) {
                reviewedBy = 'Guest'
            }
        }
        if (!rating) {
            return res.status(400).send({ status: false, message: "rating required" })
        }
        if (!(rating >= 1 && rating <= 5)) {
            return res.status(400).send({ status: false, message: "Invalid Rating! , please rate in beetween 1 to 5" })
        }
        if (!validate.isValid(review)) {
            return res.status(400).send({ status: false, message: "Please Enter A Valid Review" })
        }
        let reviewedAt = new Date();

        if (req.body.isDeleted == true) {
            return res.status(400).send({ status: false, message: "No data should be deleted At the time of Creation" })
        }
        const finalData = { bookId, reviewedBy, reviewedAt, rating, review }
        let newReview = await reviewModel.create(finalData)
        let newData2 = { ...newReview.toObject() }
        delete newData2.createdAt
        delete newData2.updatedAt
        delete newData2.__v

        let checkRevCount = await reviewModel.find({ bookId: bookID, isDeleted: false }).count()
        let updatedBook = await bookModel.findOneAndUpdate({ _id: bookID, isDeleted: false }, { $set: { reviews: checkRevCount } }, { new: true })

        return res.status(201).send({
            status: true, message: "Success",
            Data: { ...updatedBook.toObject(), reviewsData: [newData2] }
        })

    } catch (error) {
        res.status(500).send({ status: false, Message: error.message })
    }
}


//=====================================================================================================

const updateReview = async (req, res) => {

    try {
        const reviewID = req.params.reviewId
        const bookId = req.params.bookId
        let dataToUpdate = req.body
        let updateQuery = {}

        if (!validate.isValidRequestBody(dataToUpdate)) {
            return res.status(400).send({ status: false, message: "Please Provide Data To Update" })
        }
        if (!validate.isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, message: "Invalid Book Id" })
        }
        let isBook = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!isBook) {
            return res.status(404).send({ status: false, message: "Book Not Found, PLease check book Id" })
        }
        if (!validate.isValidObjectId(reviewID)) {
            return res.status(400).send({ status: false, message: "Invalid ReviewId" })
        }
        let isReview = await reviewModel.findOne({ _id: reviewID, isDeleted: false })
        if (!isReview) {
            return res.status(404).send({ status: false, message: "Review Not Found, Please Check Review Id" })
        }

        if (isReview['bookId'] != bookId) {
            return res.status(400).send({ status: false, message: "This review dosent belong To given Book Id" })
        }
        let { reviewedBy, rating, review } = dataToUpdate
        let reviewKeys = ["reviewedBy", "rating", "review"]
        for (let i = 0; i < Object.keys(req.body).length; i++) {
            let keyPresent = reviewKeys.includes(Object.keys(req.body)[i])
            if (!keyPresent)
                return res.status(400).send({ status: false, msg: "Wrong Key present" })
        }
        if (Object.keys(dataToUpdate).includes("reviewedBy")) {
            if (typeof reviewedBy != 'string') {
                return res.status(400).send({ status: false, message: "Please Give a proper Name" })
            }
            if ((reviewedBy.trim() == "") || (reviewedBy == null)) {
                reviewedBy = 'Guest'
            }
            updateQuery.reviewedBy = reviewedBy
        }

        if (Object.keys(dataToUpdate).includes("rating")) {
            if (typeof rating != 'number') {
                return res.status(400).send({ status: false, message: "invalid Rating Input" })
            }
            if (!(rating >= 1 && rating <= 5)) {
                return res.status(400).send({ status: false, message: "Invalid Rating! , please rate in beetween 1 to 5" })
            }
            updateQuery.rating = rating
        }

        if (Object.keys(dataToUpdate).includes("review")) {
            if (!validate.isValid(review)) {
                return res.status(400).send({ status: false, message: "Please Enter A Valid Review" })
            }
            updateQuery.review = review
        }

        const updatedReview = await reviewModel.findOneAndUpdate({ _id: reviewID, isDeleted: false },
            { $set: updateQuery },
            { new: true })

        let finalReview = { ...updatedReview.toObject() }
        delete finalReview.createdAt
        delete finalReview.updatedAt
        delete finalReview.__v
        return res.status(200).send({ status: true, message: "Success", Data: { ...isBook.toObject(), reviewsData: [finalReview] } })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}



//=====================================================================================================


const deleteReview = async (req, res) => {
    try {
        if (!validate.isValidObjectId(req.params.bookId)) {
            return res.status(400).send({ status: false, message: "bookId is not valid" })
        }
        if (!validate.isValidObjectId(req.params.reviewId)) {
            return res.status(400).send({ status: false, message: "reviewId is not valid" })
        }
        let book = await bookModel.findOne({ _id: req.params.bookId, isDeleted: false })
        if (!book) {
            return res.status(404).send({ status: false, message: 'Book not exist ' })
        }
        const deleteReview = await reviewModel.findOneAndUpdate({ _id: req.params.reviewId, isDeleted: false }, { isDeleted: true })
        if (deleteReview) {
            if (deleteReview['bookId'] != req.params.bookId) {
                return res.status(400).send({ status: false, message: "This review dosent belong To given Book Id" })
            }
            let revCount = await reviewModel.find({ bookId: req.params.bookId, isDeleted: false }).count()
            await bookModel.findByIdAndUpdate({ _id: req.params.bookId }, { reviews: revCount })
            return res.status(200).send({ status: true, message: "review is deleted successfully" })
        }
        return res.status(404).send({ status: false, message: 'review not exist' })

    } catch (error) {
        res.status(500).send({ satus: false, error: error.message })
    }

}


module.exports.addReview = addReview
module.exports.deleteReview = deleteReview
module.exports.updateReview = updateReview
