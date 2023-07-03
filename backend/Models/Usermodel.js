const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
// const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter your name"],
        maxLength: [30, "name can not exceed 30 characters"],
        minLength: [4, "name should be greaterthan 4 characters"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "please enter your email"],
        validate: [validator.isEmail, "please enter a valid email"],
    },
    phone: {
        type: Number,
        required: true
    },

    password: {
        type: String,
        required: [true, "please enter your password"],
        minLength: [4, "password should be greaterthan 4 characters"],
        select: false
    },

    role: {
        type: String,
        default: "user"
    },
    date: {
        type: Date,
        default: Date.now
    },
    notification: {
        type: Array,
        default: []
    },
    addtocart: {
        type: Array,
        default: []
    },
    Payments: {
        type: Array,
        default: []
    },
    resetPasswordToken: Number,
    resetPasswordExpire: Date
})
userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next()
    }

    //hashing password
    this.password = await bcryptjs.hash(this.password, 10)
})

// jwt token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_KEY)
}

//compare password
userSchema.methods.comparePassword = async function (enteredpassword) {
    return await bcryptjs.compare(enteredpassword, this.password)
}

//Generate password reset token
userSchema.methods.getResetToken = function () {

    let otpcode = Math.floor((Math.random() * 10000 + 1))

    this.resetPasswordToken = otpcode
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000
    return otpcode
}


module.exports = mongoose.model("User", userSchema)