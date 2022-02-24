
const express = require("express");
const router = express.Router();

let persons = [
    {
        name: "PK",
        age: 10,
        votingStatus: false,
    },

    {
        name: "SK",
        age: 20,
        votingStatus: false,
    },

    {
        name: "AA",
        age: 70,
        votingStatus: false,
    },

    {
        name: "SC",
        age: 5,
        votingStatus: false,
    },

    {
        name: "HO",
        age: 40,
        votingStatus: false,
    },
];

router.post("/post-query-2", (req, res) => {
    
     let votingAge = req.query.age ;
     
     let validVoters = persons.filter(element => element.age > votingAge)
     validVoters.forEach(element => element.votingStatus = true);
     res.send(validVoters);
    
});

module.exports = router;
