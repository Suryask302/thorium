

const express = require('express');
const router = express.Router();
const UserController = require("../controllers/userController")


router.post("/createNewBook", UserController.createNewBook)

router.get("/getBookList", UserController.getBookList)

module.exports = router;