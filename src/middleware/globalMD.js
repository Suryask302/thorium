
const moment = require('moment')

const globalMD = function (req , res , next ){

    console.log(moment().format('HH:mm:ss'))
    console.log(req.ip)
    console.log(req.originalUrl)
    next()
}


module.exports.GB = globalMD