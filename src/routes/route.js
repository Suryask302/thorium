
const obj = require('../logger/logger')
const today = require('../util/helper')
const textFormatter = require('../validator/formatter')
const express = require('express');
const router = express.Router();
const lodash = require('lodash')

router.get('/test-me', function (req, res) {
    obj.welcome('Welcome to my application. I am surajBhoyar and a part of FunctionUp Thorium cohort.')
    today.printDate()
    today.printMonth()
    today.getBatchInfo()
    textFormatter.whiteSpaceRemover("   Suraj Bhoyar     ")
    textFormatter.changetoLowerCase("SuRaJ BhOyaR")
    textFormatter.changetoUpperCase("sURaj BHoyar")
    res.send('My first ever api!')
});

router.get('/hello', function (req, res) {

    let arr = ["jan", "feb", "march", "april", "may", "june", "july", "aug", "sept", "oct", "nov", "dec"]
    console.log(lodash.chunk(arr, 4));

    let arr2 = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
    console.log(lodash.tail(arr2));

    let first = [9, 7, 6, 5, 4, 8, 5]
    let second = [7, 5, 6, 4, 12, 13]
    let third = [9, 8, 6, 5, 4, 12, 11]
    let fourth = [10, 14, 9, 8, 7, 5, 6]
    let fifth = [20, 11, 5, 7, 6, 32, 45]

    console.log(lodash.union(first, second, third, fourth, fifth));

    let pairs = [['horror', 'The Shining'], ['drama', 'Titanic'], ['thriller', 'Shutter Island'], ['fantasy', 'Pans Labyrinth']]
    console.log(lodash.fromPairs(pairs));

    res.send('hey there i am using lodash')
})

module.exports = router;