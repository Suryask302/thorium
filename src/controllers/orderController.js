
const orderModel = require("../models/orderModel")
const userModel = require("../models/userModel")
const productModel = require("../models/productModel")
const { updateOne } = require("../models/userModel")

const createOrder = async function (req , res){
    let order = req.body
    let userID = req.body.userId
    let productID = req.body.productId

    if(!userID){
       return res.send({msg : "userid Must be present In req Body"})
    }
    
    let user = await userModel.findById(userID);

    if(!user){
        return res.send({msg : "no user found"})
    }


    if(!productID){
        return res.send({msg : "Product Not Found"})
    }

    let product = await productModel.findById(productID)

    if(!product){
        return res.send({msg : "Product Not Found"})
    }

    let isFreeUser = req.headers["isfreeappuser"]
    console.log(isFreeUser)

    if(isFreeUser == "true"){
        order.amount = 0
        let ChangeUSerStatus = await userModel.findOneAndUpdate( {_id : userID } , { isFreeAppUser : true} , {new : true})
        console.log(ChangeUSerStatus)
        let orderCreated = await orderModel.create(order)
        res.send({data: orderCreated})
    }
      else{

        
         
        let price = product.price

        if(user.balance < price ){
            res.send("user Dosent Have Enough Balance")
        }

        let updateUserBalance = await userModel.findOneAndUpdate( {_id : userID } , {$inc : {balance : -price}} , {new : true})
        console.log(updateUserBalance)
        order.amount = price
        let orderCreated = await orderModel.create(order)
        res.send({data: orderCreated})
        
    }

}

module.exports.createOrder = createOrder