

const userModel = require("../models/userModel")

const createPost = async function (req, res) {
try{
    let userId = req.params.userId
    if(!userId){
        res.status(400).send( { msg : "Please Enter UserId" } )
    }

    let user = await userModel.findById(userId)
    if(!user){
        res.status(404).send( { msg : "User Not Found" } )
    }
    let message = req.body
        
        if(Object.keys(message).length !== 0){

        let updatedPosts = user.posts
            updatedPosts.push(message)
        let updatedUser = await userModel.findOneAndUpdate({ _id: user._id }, { posts: updatedPosts }, { new: true })
        return res.send({ status: true, data: updatedUser })

        }else {res.status(400).send( { msg : "Please Add Some Content To Post" } )}

}catch(err){res.status(500).send( { Error : err } )}

}

module.exports.createPost = createPost;