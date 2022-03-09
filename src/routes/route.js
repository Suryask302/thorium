

const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const postController = require("../controllers/postController")
const GB = require("../Middleware/Auth")


router.post("/users", userController.createUser)
router.post("/login", userController.loginUser)
router.get("/users/:userId", GB.GB, userController.getUserData)
router.put("/users/:userId", GB.GB, userController.updateUser)
router.put("/addpost/:userId", GB.GB, postController.createPost)
router.delete("/users/:userId", GB.GB, userController.deleteUser)

module.exports = router;