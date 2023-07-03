const express=require('express')
const { isAuthenticated, authorizedRoles } = require('../middleware/Auth')
const { getAllLaundryRequest, createLaundryRequest, deleterequest, updaterequest, getalllaudries,deletelaundry, getlaundry, UpdatlaundryStatus, DeleteNotification, AddToCart, DeleteFromCart, getAllCarts, SucessPayment, AddToPayment, DeletePayment, getAllPayment, PaymentDetail } = require('../Controllers/LaundryController')
const { LaundryCreateValidation, UpdateLaundryValidation } = require('../Utils/laundry.validation')
const router=express.Router()


router.route('/fetchallrequests').get(isAuthenticated,getAllLaundryRequest)
router.route('/createrequest').post(LaundryCreateValidation, isAuthenticated,createLaundryRequest)
router.route('/deleterequest/:id').delete(isAuthenticated,deleterequest)
router.route('/updaterequest/:id').put(UpdateLaundryValidation, isAuthenticated,updaterequest)
router.route('/request/:id').get(isAuthenticated,getlaundry)
router.route('/me/notification/delete/:id').delete(isAuthenticated,DeleteNotification)
router.route('/me/addtocart/:id').post(isAuthenticated,AddToCart)
router.route('/me/removefromcart/:id').delete(isAuthenticated,DeleteFromCart)
router.route('/me/getallcarts').get(isAuthenticated,getAllCarts)
router.route('/me/payment/sucess').get(isAuthenticated,SucessPayment)
router.route('/me/paymentdetails/:id').get(isAuthenticated,PaymentDetail)

router.route('/me/payment/all').get(isAuthenticated,getAllPayment)

router.route('/me/payment/add').post(isAuthenticated,AddToPayment)
router.route('/me/payment/delete/:id').delete(isAuthenticated,DeletePayment)

router.route('/admin/fetchallrequests').get(isAuthenticated,authorizedRoles, getalllaudries)
router.route('/admin/update/:id').put(isAuthenticated,authorizedRoles, UpdatlaundryStatus)
router.route('/admin/delete/:id').delete(isAuthenticated,authorizedRoles, deletelaundry)



module.exports=router;