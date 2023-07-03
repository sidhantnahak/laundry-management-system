import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./sucess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import HomeDashboard from "../Dashboard/HomeDashboard";

const SucessPayment = () => {

  //  let data= JSON.parse(sessionStorage.getItem("shippingInfo")) 

  return (
    <>
    <HomeDashboard/>
    <>
      <div className="status_container">



        <div className="orderSuccess">
          <CheckCircleIcon />

          <Typography>Your Payment Has Been Done successfully </Typography>
          <Link to="/dashboard/requests">View Requests</Link>
        </div>
      </div>
    </>
    </>
  );
};

export default SucessPayment;