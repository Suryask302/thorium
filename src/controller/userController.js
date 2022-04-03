
const userModel = require('../models/userModel')
const validate = require('../validator/validators')
const jwt = require('jsonwebtoken')


////       USER CREATION     /////

const createUser = async function (req, res) {
    let requestBody = req.body;
    try {

        if (!validate.isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide user details' })
            return
        }
        const { title, name, phone, email, password, address } = requestBody

        if (!validate.isValid(title)) {
            res.status(400).send({ status: false, message: 'Title is required' })
            return
        }
        if (!validate.isValidTitle(title.trim())) {
            res.status(400).send({ status: false, message: `Title should be among Mr, Mrs, Miss ` })
            return
        }
        if (!validate.isValid(name)) {
            res.status(400).send({ status: false, message: 'Name is required' })
            return
        }
        if (!validate.isValid(phone)) {
            res.status(400).send({ status: false, message: 'Phone number is required' })
            return
        }
        if (!validate.isValidPhone(phone.trim())) {
            res.status(400).send({ status: false, message: 'Phone number is not valid' })
            return
        }
        let withoutCountryCode = phone.substring(3)
        let withCountryCode = '+91' + phone

        const isPhoneAlreadyUsed = await userModel.findOne({ phone: { $in: [phone, withoutCountryCode, withCountryCode] } });
        if (isPhoneAlreadyUsed) {
            res.status(400).send({ status: false, message: `Phone number is already registered` })
            return
        }
        if (!validate.isValid(email)) {
            res.status(400).send({ status: false, message: `Email is required` })
            return
        }

        if (!validate.isValidEmail(email.trim())) {
            res.status(400).send({ status: false, message: `Invalid email` })
            return
        }
        const isEmailAlreadyUsed = await userModel.findOne({ email });

        if (isEmailAlreadyUsed) {
            res.status(400).send({ status: false, message: `${email}  is already registered` })
            return
        }
        if (!validate.isValid(password)) {
            res.status(400).send({ status: false, message: `Password is required` })
            return
        }
        if (!(validate.isValidPassword(password.trim()))) {
            return res.status(400).send({ status: false, message: `Password length should be betwwen 8-15` })
        }
        if (Object.keys(requestBody).includes("address.pincode")) {
            if (!validate.isValidPincode(address.pincode.trim())) {
                res.status(400).send({ status: false, message: `Pincode is not valid` })
                return
            }
        }
        let user = await userModel.create(req.body)
        return res.status(201).send({ status: true, message: 'Success', data: user })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

//////  USER LOGIN  /////////////


const loginUser = async function (req, res) {
    try {
        let userName = req.body.email.trim();
        let password = req.body.password.trim();
        if (!userName || !password)
            return res.status(400).send({ status: false, message: "Username or the password is not entered" });

        let user = await userModel.findOne({ email: userName, password: password });
        if (!user)
            return res.status(401).send({ status: false, message: "Username or the password is not corerct" });

        let token = jwt.sign({ userId: user._id.toString() }, "this-is-aSecretTokenForLogin", { expiresIn: "1800s" })

        return res.status(201).send({ status: true, message: 'Success', data: token });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.createUser = createUser;
module.exports.loginUser = loginUser;