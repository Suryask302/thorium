

const axios = require("axios")


const memeEditor = async function(req,res){
try{
    let option = {

        method :"get",
        url: `http://api.imgflip.com/get_memes`

    }
    
    let result = await axios(option)
    res.send({ msg: result.data })

}catch(err){res.send( err.message )}

}




const Editor = async function(req,res){
    try{


        let option = {
    
            method :"post",
            url : `https://api.imgflip.com/caption_image?template_id=129242436&text0=sometext&text1=sometext&username=chewie12345&password=meme@123`
           
        }
        
        let result = await axios(option)
        res.send({ msg: result.data })
    
    }catch(err){res.send( err.message )}
    
    }

    
module.exports.memeEditor = memeEditor
module.exports.Editor = Editor