

const publisherModel = require("../models/publisherModel")

const createPublisher = async function(req ,res){

        let data = req.body
        let newPublisher = await publisherModel.create(data)
        res.send({msg : newPublisher})

    }

    module.exports.createPublisher = createPublisher