
function printDate(){
    let x = new Date ()
    let month = x.getMonth()
    let date = x.getDate()
    console.log(`current date is ==> ${date}`)

}

function printMonth(){
    let x = new Date()
    let month = x.getMonth()+1

    console.log(`this is a month nmber => ${month}`)
}

function about(){
console.log("Thorium, W3D1, the topic for today is Nodejs module system")
}

module.exports.printDate = printDate
module.exports.printMonth = printMonth
module.exports.getBatchInfo = about