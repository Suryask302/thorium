
const GM = require('../middleware/globalmd')
const express = require('express');
const router = express.Router();

const userController= require("../controllers/userController")
const productController= require("../controllers/productController");
const orderController = require("../controllers/orderController")
const { GB } = require('../middleware/globalmd');



router.post("/createUser",GM.GB, userController.createUser)
router.post("/createProduct", productController.createProduct)
router.post("/createOrder",GM.GB ,orderController.createOrder)

module.exports = router;