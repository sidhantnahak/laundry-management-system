import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import HomeDashboard from "../Dashboard/HomeDashboard";
import Loder from "../Loder/Loder";
import { useAlert } from "react-alert";
import { clearErrors } from "../../UserAction/LaundryAction";
import { PaymentDetail } from "../../UserAction/UserAction";
import store from '../../Store'

const PaymentDetails = () => {
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const { payment, error, loading } = useSelector((state) => state.paymentdetails);
    const { user } = useSelector((state) => state.user);
    const alert=useAlert()
    const params=useParams()







    useEffect(() => {

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch( PaymentDetail(params.id))



        let elemm = document.querySelector(".sidebar_pro")
        let elem3 = document.querySelector(".status_container")
        let elem4 = document.querySelector(".footer_div")
    
    
    
        const isOpen = elemm.classList.contains('active');
    
        if (elem4) {

            if (isOpen || window.innerWidth <= 750) {
                elem4.style.width = "100%"
                elem4.style.position = "static"
            } else {
                elem4.style.width = " calc(100% - 250px)";
                elem4.style.position = "relative"
            }


        }
      
        if (elem3) {
    
            if (isOpen || window.innerWidth <= 750) {
                elem3.style.width = "100%"
                elem3.style.position = "static"
            } else {
                elem3.style.width = " calc(100% - 250px)";
                elem3.style.position = "relative"
            }
    
        }
        

    }, [error, user,dispatch,params])


    return (

        <>
            <HomeDashboard />
            {loading || !payment ? <Loder /> :
                <Fragment>
                    <div className="status_container">

                    <div className="overview_request_container">
                            <p> <b>Dashboard / Overview / Payments / {params.id}</b></p>

                        </div>

                        <div className="confirmOrderPage">
                            <div>
                                <div className="confirmshippingArea">
                                    <Typography>Shipping Info</Typography>
                                    <div className="confirmshippingAreaBox">
                                        <div>
                                            <p>Name:</p>
                                            <span>{user.name}</span>
                                        </div>
                                        <div>
                                            <p>Phone:</p>
                                            <span>{payment.phoneNo}</span>
                                        </div>
                                        <div>
                                            <p>Address:</p>
                                            <span>{payment.address}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="confirmCartItems">
                                    <Typography>Payment Items:</Typography>
                                    <div className="confirmCartItemsContainer">
                                        {payment.carts &&
                                            payment.carts.map((item) => (
                                                <div  key={item._id}  >
                                                    <span  style={{fontSize:"1.2em"}}>{item._id}</span>
                                                    <span style={{fontSize:"1.2em"}}>
                                                        1 X ₹{item.price} ={" "}
                                                        <b>₹{item.price}</b>
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                </div>


                                <div className="confirmCartItems">
                                    <Typography>Time And Date:</Typography>
                                    <div className="confirmCartItemsContainer" style={{fontSize:"1.2em"}}>
                                        <span>{payment.time}</span>
                                        <br />
                                        <span>{payment.date}</span>
                                    </div>
                                </div>
                            </div>
                            {/*  */}
                            <div>
                                <div className="orderSummary">
                                    <Typography>Order Summery</Typography>
                                    <div>
                                        <div>
                                            <p>Subtotal:</p>
                                            <span>₹{payment.total}</span>
                                        </div>
                                        <div>
                                            <p>Shipping Charges:</p>
                                            <span>₹20</span>
                                        </div>
                                        <div>
                                            <p>GST:</p>
                                            <span>₹10</span>
                                        </div>
                                    </div>

                                    <div className="orderSummaryTotal">
                                        <p>
                                            <b>Total:</b>
                                        </p>
                                        <span>₹{payment.total + 20 + 10}</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            }
        </>
    );
};

export default PaymentDetails