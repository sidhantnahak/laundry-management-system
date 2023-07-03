import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import "./confirm.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import HomeDashboard from "../Dashboard/HomeDashboard";

const ConfirmOrder = () => {
  const navigate = useNavigate()
  const { carts } = useSelector((state) => state.carts);
  const { user } = useSelector((state) => state.user);



  let data = JSON.parse(sessionStorage.getItem("shippingInfo"));
  console.log(data.carts)



  let charge = 20, gst = 10;

  const proceedToPayment = (e) => {
    e.preventDefault()
    navigate('/request/payment')

  };

  useEffect(() => {

  }, [navigate])


  return (

    <>
      <HomeDashboard />

      <Fragment>
        <div className="status_container">

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
                    <span>{data.phoneNo}</span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>{data.address}</span>
                  </div>
                </div>
              </div>
              <div className="confirmCartItems">
                <Typography>Your Cart Items:</Typography>
                <div className="confirmCartItemsContainer">
                  {carts &&
                    carts.map((item) => (
                      <div key={item._id}>
                        <span>{item.top_wear}</span>
                        <span>
                          1 X ₹{item.price} ={" "}
                          <b>₹{item.price}</b>
                        </span>
                      </div>
                    ))}
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
                    <span>₹{data.total}</span>
                  </div>
                  <div>
                    <p>Shipping Charges:</p>
                    <span>₹{charge}</span>
                  </div>
                  <div>
                    <p>GST:</p>
                    <span>₹{gst}</span>
                  </div>
                </div>

                <div className="orderSummaryTotal">
                  <p>
                    <b>Total:</b>
                  </p>
                  <span>₹{data.total + charge + gst}</span>
                </div>

                <button onClick={proceedToPayment}>Proceed To Payment</button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default ConfirmOrder;