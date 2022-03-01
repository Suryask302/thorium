

const express = require('express');
const router = express.Router();
const bookController = require("../controllers/bookController")


router.post("/createNewBook", bookController.createNewBook)

router.get("/getBookList", bookController.getBookList)

router.post("/getBooksInYear", bookController.getBooksInYear)

router.post("/getPerticularBook", bookController.getPerticularBooks)

router.get("/getXINRBooks", bookController.getXINRBooks)

router.get("/getRandomBooks", bookController.getRandomBooks)

module.exports = router;