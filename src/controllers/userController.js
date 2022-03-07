

const UserModel= require("../models/userModel")

const createUser= async function (req, res) {

    
    let user = req.body
    let userCreated = await UserModel.create(user)
    res.send({data: userCreated})
}


module.exports.createUser = createUser
