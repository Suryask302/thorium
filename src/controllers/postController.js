const userModel = require("../models/userModel")


const createPost = async function (req, res) {

    let userId = req.params.userId
    let user = await userModel.findById(userId)
    let message = req.body
    let updatedPosts = user.posts
        updatedPosts.push(message)
    let updatedUser = await userModel.findOneAndUpdate({ _id: user._id }, { posts: updatedPosts }, { new: true })
    return res.send({ status: true, data: updatedUser })

}

module.exports.createPost = createPost;