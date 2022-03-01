

const authorModel = require('../models/authorModel');



    const createAuthor = async function(req,res){
        let data = req.body 
        if(data.author_id){
        let savedData = await authorModel.create(data)
        res.send({msg : savedData})
        
        }else{
            res.send({msg : "Author Dosent Have Author Id"})
        }

    }


    module.exports.createAuthor = createAuthor 