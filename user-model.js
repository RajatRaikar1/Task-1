const mongoose = require('mongoose')
const validator = require('validator')
const validatePhoneNumber = require('validate-phone-number-node-js'); 

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not valid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password is incorrect')
            }
        }
    },

    phoneNumber : {
        type : Number,
        validate(value){
            if((value.length<10) || (validatePhoneNumber.validate(value))){
                throw new Error('Enter valid phone number')

            }
        }
    },
    gender: {
        type: String,
        validate(value) {
            if (value !== 'M' || value !== 'F') {
                throw new Error('Gender must be either M or F')
            }
        }
    }
})

module.exports = User