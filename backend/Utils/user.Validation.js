const { body } = require('express-validator');

exports.RegisterDataValidation = [

    body("name")
        .exists({ checkFalsy: true })
        .withMessage("User name is required")
        .isLength({ min: 4, max: 30 }).withMessage("name is too short")
        .isString()
        .withMessage("User name should be string"),
    body("email")
        .exists().withMessage("email is required")
        .isEmail().withMessage("enter a valid email"),
    body("phone")
        .isNumeric()
        .withMessage("phone number should be a number")
        .isLength({ min: 10, max: 10 }).withMessage("enter a valid phone number"),
    body("password")
        .exists().withMessage("Password is required")
        .isString()
        .withMessage("Password should be string")
        .isLength({ min: 8 }).withMessage("Password should be at least 8 characters")
        .isStrongPassword({
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }).withMessage("enter a strong password")
]

exports.LoginDataValidation = [

    body("email")
        .exists().withMessage("email is required")
        .isEmail().withMessage("enter a valid email"),

    body("password")
        .exists().withMessage("Password is required")
        .isString().withMessage("Password should be string")
        .isLength({ min: 8 }).withMessage("Password should be at least 8 characters")
        .isStrongPassword({
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }).withMessage("enter a strong password")
]



exports.UpdateProfileValidation = [

    body("name")
        .exists({ checkFalsy: true })
        .withMessage("User name is required")
        .isLength({ min: 4, max: 30 }).withMessage("name is too short")
        .isString()
        .withMessage("User name should be string"),
    body("phone")
        .isNumeric()
        .withMessage("phone number should be a number")
        .isLength({ min: 10, max: 10 }).withMessage("enter a valid phone number")

]



exports.UpdatePasswordValidation = [

    body("oldPassword")
    .exists().withMessage("oldPassword is required")
    .isString().withMessage("oldPassword should be string")
    .isLength({ min: 8 }).withMessage("oldPassword should be at least 8 characters")
    .isStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("old password must be a strong password"),
    body("newPassword")
        .exists().withMessage("newPassword is required")
        .isString().withMessage("newPassword should be string")
        .isLength({ min: 8 }).withMessage("newPassword should be at least 8 characters")
        .isStrongPassword({
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }).withMessage("newpassword must be a strong password"),

    body("confirmPassword")
        .exists().withMessage("confirm Password is required")
        .isString().withMessage("confirm Password should be string")
        .isLength({ min: 8 }).withMessage("confirm Password should be at least 8 characters")
        .isStrongPassword({
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }).withMessage("enter a strong password")
]


exports.ForgotPasswordDataValidation = [

    body("email")
        .exists().withMessage("email is required")
        .isEmail().withMessage("enter a valid email"),

]

exports.OtpValidation = [

    body("otp")
        .exists().withMessage("Otp is required")
        .isNumeric().withMessage("Otp must be a number")
        .isLength({min:4,max:4}).withMessage("Enter a valid Otp")

]


exports.ResetPasswordValidation = [

    body("password")
    .exists().withMessage("Password is required")
    .isString().withMessage("Password should be string")
    .isLength({ min: 8 }).withMessage("Password should be at least 8 characters")
    .isStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("enter a strong password"),

    body("confirmPassword")
        .exists().withMessage("confirmPassword is required")
        .isString().withMessage("confirmPassword should be string")
        .isLength({ min: 8 }).withMessage("confirmPassword should be at least 8 characters")
        .isStrongPassword({
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }).withMessage("confirm password must be a strong password")
]