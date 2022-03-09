

const jwt = require("jsonwebtoken")
let MDwear = function (req, res, next) {

    try {

        let token = req.headers["x-auth-token"];
        if (!token) {
            return res.send({ status: false, msg: "token must be present" });
        }

        let decodedToken = jwt.verify(token, "functionup-thorium");

        if (decodedToken.userId !== req.params.userId) {
            return res.send({ msg: "you must have to login first" })
        }
        next()

    } catch (error) { res.send(error) }

}

module.exports.GB = MDwear
