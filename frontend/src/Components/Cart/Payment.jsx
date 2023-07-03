import React, { Fragment, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useNavigate } from "react-router-dom";
import { PaymentSucess, addInPayment, clearErrors, getAllPayment } from "../../UserAction/UserAction";
import HomeDashboard from "../Dashboard/HomeDashboard";
import Loder from "../Loder/Loder";
import { add_payment_reset } from "../../Constants/Constants";
// import { createOrder, clearErrors } from "../../../actions/OrderAction";

const Payment = () => {

    const orderInfo = JSON.parse(sessionStorage.getItem("shippingInfo"));

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate()
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const { user } = useSelector((state) => state.user);
    const { sucess, loading, error } = useSelector((state) => state.payments);

   
let paymentDetail={}
let paymentObj={};


    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;

        try {
            const paymentData = {
                amount: orderInfo.total
            };
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/v1/payment/process",
                paymentData,
                config
            );

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: orderInfo.address,
                            city: orderInfo.city,
                            state: orderInfo.state,
                            postal_code: orderInfo.pinCode,
                            country: orderInfo.country,
                        },
                    },
                },
            }
            );

            if (result.error) {
                payBtn.current.disabled = false;

                alert.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {

                    paymentDetail = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };
                    paymentObj={...orderInfo,...paymentDetail};
                    dispatch(addInPayment(paymentObj));
                    dispatch(PaymentSucess())



                    alert.success("Payment Done Sucessfully")
                    localStorage.removeItem("shippingInfo")
                    navigate("/request/payment/sucess")


                    // dispatch({type:add_payment_reset})


                } else {
                    alert.error("There's some issue while processing payment ");
                }
            }


        } catch (error) {
            payBtn.current.disabled = false;
            alert.error(error);

        }
    };
    let charge = 20, gst = 10;

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        


    }, [dispatch, error, alert, loading, sucess]);

    return (
        <>
            <HomeDashboard />

            {
                loading ? <Loder /> :

                    <Fragment>
                        <div className="status_container">
                            <div className="paymentContainer">
                                <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                                    <Typography>Card Info</Typography>
                                    <div>
                                        <CreditCardIcon />
                                        <CardNumberElement className="paymentInput" />
                                    </div>
                                    <div>
                                        <EventIcon />
                                        <CardExpiryElement className="paymentInput" />
                                    </div>
                                    <div>
                                        <VpnKeyIcon />
                                        <CardCvcElement className="paymentInput" />
                                    </div>

                                    <input
                                        type="submit"
                                        value={`Pay - ₹${orderInfo && orderInfo.total + charge + gst}`}
                                        ref={payBtn}
                                        className="paymentFormBtn"
                                    />
                                </form>
                            </div>


                        </div>
                    </Fragment>
            }
        </>
    );
};

export default Payment;