
let obj = require('./logger')
const express = require('express');
const router = express.Router();

router.get('/test-me', function (req, res) {
    obj.printMessage('thorium')
    console.log(obj.endpoint)
    res.send('My first ever api!')
});

module.exports = router;