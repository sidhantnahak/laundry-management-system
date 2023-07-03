const { body } = require("express-validator");



    exports.LaundryCreateValidation = [

        body("top_wear")
            .exists({ checkFalsy: true }).withMessage("top wear is required")
            .isLength({ min: 3, max: 30 }).withMessage("top wear name is too short")
            .isString().withMessage("top wear should be string"),
        body("bottom_wear")
            .exists({ checkFalsy: true }).withMessage("bottom wear is required")
            .isLength({ min: 3, max: 30 }).withMessage("enter a valid bottom wear")
            .isString().withMessage("bottom wear name should be string"),

        body("cloth_type")
            .exists({ checkFalsy: true }).withMessage("cloth_type is required")
            .isLength({ min: 3, max: 30 }).withMessage("bottom wear should be a string")
            .isString().withMessage("bottom wear should be string"),

        body("service_type")
            .exists({ checkFalsy: true }).withMessage("service_type is required")
            .isLength({ min: 3, max: 30 }).withMessage("service type should be a string")
            .isString().withMessage("service type should be string"),
        body("contact")
            .exists().withMessage("Phone number is required")
            .isNumeric().withMessage("phone number should be a number")
            .isLength({ min: 10, max: 10 }).withMessage("enter a valid phone number"),
        body("description")

            .isString().withMessage("description should be string"),
            body("required_date")
               .exists({ checkFalsy: true }).withMessage("date is required")
            // .isLength({ min: 3, max: 30 }).withMessage("service type should be a string")
            .isString().withMessage("date should be string"),

    ]



    exports.UpdateLaundryValidation = [

        body("top_wear")
            .exists({ checkFalsy: true }).withMessage("top wear is required")
            .isLength({ min: 3, max: 30 }).withMessage("top wear name is too short")
            .isString().withMessage("top wear should be string"),
        body("bottom_wear")
            .exists({ checkFalsy: true }).withMessage("bottom wear is required")
            .isLength({ min: 3, max: 30 }).withMessage("enter a valid bottom wear")
            .isString().withMessage("bottom wear name should be string"),

        body("cloth_type")
            .exists({ checkFalsy: true }).withMessage("cloth_type is required")
            .isLength({ min: 3, max: 30 }).withMessage("bottom wear should be a string")
            .isString().withMessage("bottom wear should be string"),

        body("service_type")
            .exists({ checkFalsy: true }).withMessage("service_type is required")
            .isLength({ min: 3, max: 30 }).withMessage("service type should be a string")
            .isString().withMessage("service type should be string"),
        body("contact")
            .exists().withMessage("Phone number is required")
            .isNumeric().withMessage("phone number should be a number")
            .isLength({ min: 10, max: 10 }).withMessage("enter a valid phone number"),
        body("description")

            .isString().withMessage("description should be string"),
            body("required_date")
               .exists({ checkFalsy: true }).withMessage("date is required")
            // .isLength({ min: 3, max: 30 }).withMessage("service type should be a string")
            .isString().withMessage("date should be string"),

    ]