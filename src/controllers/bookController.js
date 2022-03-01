

const authorModel = require('../models/authorModel');
const bookModel = require('../models/bookModel');

const createBook = async function(req , res){
    let data = req.body

    if(data.author_id){

    let savedData = await bookModel.create(data)
    res.send({msg : savedData})

    }else{

        res.send({msg : "Book Dosent Have Author Id"})
    }

}

const listOfBook = async function(req ,res){
    
    let idOfCb = await authorModel.find(  { author_name : "Chetan Bhagat"}   ).select( { author_Id:1 , _id : 0 })
    let listOfBookById = await bookModel.find({idOfCb});
    res.send([{authorIdOfChetanBhagat : idOfCb}, {listOfBooksByThatId:listOfBookById}])
}



const findAndUpdate = async function(req,res){
    let updatedBook = await bookModel.findOneAndUpdate(
        { name: "Two States"},
        { $set: {price : "100" } },
        { new: true , upsert : true }
    )

    let identity = await bookModel.find( { name :"Two states" } ).select({ author_id:1 })

    let authorName = await authorModel.findOne( { identity } ).select( { author_name:1 , _id:0} )

    res.send([{author : authorName},{updatedData : updatedBook}])
}




const findBookWithCost = async function(req,res){

    let booksWithCost = await bookModel.find( { price : { $gte:50 , $lte :100} } ).select({author_id :1, _id:0});
    let newArr = booksWithCost.map(ele => ele.author_id).flat()
    newArr.pop()
    

    let removeDup = [...new Set(newArr)]
    

    let newData =[]
    for(let i = 0 ; i < removeDup.length ; i++){
        newData.push ( await authorModel.find({author_Id:removeDup[i]}).select({author_name:1}) )
    }
    res.send(newData)

}




module.exports.createBook = createBook
module.exports.listOfBook = listOfBook
module.exports.findAndUpdate = findAndUpdate
module.exports.findBookWithCost = findBookWithCost