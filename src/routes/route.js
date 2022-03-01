

const express = require('express');
const router = express.Router();

const authorController = require("../controllers/authorController");
const bookController   = require("../controllers/bookController");

router.post('/createAuthor', authorController.createAuthor)

router.post('/createBook', bookController.createBook)

router.get('/authordetails', bookController.listOfBook)

router.get('/findAndUpdate', bookController.findAndUpdate)

router.get('/findBookWithCost', bookController.findBookWithCost)

module.exports = router