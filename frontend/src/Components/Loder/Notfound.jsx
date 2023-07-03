import React from "react";
import "./notfound.css";
import { Link } from "react-router-dom";
import error from '../images/notfound.jpg'

const Notfound = () => {
  return (
    <div className="PageNotFound">
<img src={error} alt="" />
      <Link to="/">Home</Link>
    </div>
  );
};

export default Notfound;