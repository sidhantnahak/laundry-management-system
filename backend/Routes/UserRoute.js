const express = require('express');
const router = express.Router();
const User = require('../Models/Usermodel')
const {userLogin, registerUser, GetUser, Logout, updateProfile, updatePassword, forgetPassword, resetPassword, checkOTP, getalllusers, deleteuser, getAllNotifications}=require('../Controllers/UserController');
const { isAuthenticated, authorizedRoles } = require('../middleware/Auth');
const { body } = require('express-validator');
const{LoginDataValidation, RegisterDataValidation, ForgotPasswordDataValidation, OtpValidation, ResetPasswordValidation, UpdateProfileValidation, UpdatePasswordValidation}  = require('../Utils/user.Validation');
// const { userDataValidation } = require('../Utils/user.Validation');



router.route('/login').post(LoginDataValidation ,userLogin)
router.route('/register').post(RegisterDataValidation,registerUser)
router.route('/password/forgot').post(ForgotPasswordDataValidation, forgetPassword)
router.route('/password/reset/otp').put(OtpValidation, checkOTP)
router.route('/password/reset').put(ResetPasswordValidation, resetPassword)




router.route('/me').post(isAuthenticated,GetUser)
router.route('/logout').get(isAuthenticated,Logout)
router.route('/me/update').put(UpdateProfileValidation, isAuthenticated,updateProfile)
router.route('/password/update').put(UpdatePasswordValidation, isAuthenticated,updatePassword)
router.route('/me/notification').get(isAuthenticated,getAllNotifications)


router.route('/admin/users').post(isAuthenticated,authorizedRoles, getalllusers)
router.route('/admin/user/:id').delete(isAuthenticated,authorizedRoles, deleteuser)



module.exports = router;
