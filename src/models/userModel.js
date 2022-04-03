
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: [true, "Please enter title"],
        trim :true,
        enum: ["Mr", "Mrs", "Miss"]       
    },
    name: {
        type: String,
        trim: true,
        required: [true, "Please enter name"],
    },
    phone: {
        type: String,
        unique: true,
        required: [true, "Please enter a email address"],
        trim: true,
        validator: function (phone) {
            return /^([+]\d{2})?\d{10}$/.test(phone)
        },
        message: 'Please fill a valid phone number',
        isAsync: false
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please enter a email address"],
        lowercase: true,
        trim: true,
        validate: {
            validator: function (email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            },
            message: 'Please fill a valid email address',
            isAsync: false
        }
    },
    password: {
        type: String,
        trim: true,
        minlength: 8,
        maxlength: 15,
        required: [true, "Please enter a password"],
    },
    address: {
        street: {
            type: String,
            trim: true
        },
        city: {
            type: String,
            trim: true
        },
        pincode: {
            type: String,
            trim: true,
            validate: {
                validator: function (pincode) {
                    return /^[1-9][0-9]{5}$/.test(pincode)
                },
                message: 'Please fill a valid pincode',
                isAsync: false
            }
        }
    }

}, { timestamps: true });


module.exports = mongoose.model('User', userSchema)

