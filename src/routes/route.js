
const express = require('express');
const router = express.Router();

router.get('/movies', function(req, res) {
   res.send('["heropanti","titanic","spiderMan","ironman","Dabang"]')
})

router.get('/movies/:movieid', function(req,res){

    let movi=["heropanti","titanic","spiderMan","ironman","Dabang"]
    let num = req.params.movieid
    if(num>movi.length-1){
        res.send("invalid input")
    }else{
        res.send(movi[num])
    }
})

router.get('/films/:filmid', function(req,res){
    let movies=[ {id: 1, name: 'The Shining'}, {id: 2, name: 'Incendies'}, {id: 3,name: 'Rang de Basanti'}, {id: 4, name: 'Finding Demo'}]
     let num = req.params.filmid
     let cnt = false;

     for(let i =0 ; i<movies.length ; i++){

        if(movies[i].id == num){
            cnt = true;
            res.send(movies[i])
            break;
        }
     } 
     if(cnt = false){
         res.send("invalid input");
     }
})
module.exports = router;
