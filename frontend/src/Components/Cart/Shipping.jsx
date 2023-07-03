import React, { Fragment, useEffect, useState } from "react";
import "./shipping.css";
import { useSelector, useDispatch } from "react-redux";
// import { saveShippingInfo } from "../../../actions/CartAction";
// import MetaData from "../Metadata";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import HomeDashboard from "../Dashboard/HomeDashboard";

const Shipping = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate()
    const { carts } = useSelector((state) => state.carts);
    const total = carts.reduce(
        (acc, item) => acc + item.price,
        0
    );
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [phoneNo, setPhoneNo] = useState("");

    const shippingSubmit = (e) => {
        e.preventDefault();
        if (phoneNo.length != 10) {
            alert.error("enter a valid phone number")
            return
        }
        let data = { address, city, state, country, pinCode, phoneNo, total, carts }
        sessionStorage.setItem("shippingInfo", JSON.stringify(data))



        navigate("/request/confirm");
    };

    useEffect(() => {

    }, [navigate])


    return (
        <> <HomeDashboard />

            <Fragment>
                <div className="status_container">




                    <div className="shippingContainer">
                        <div className="shippingBox">
                            <h2 className="shippingHeading">Shipping Details</h2>

                            <form
                                className="shippingForm"
                                encType="multipart/form-data"
                                onSubmit={shippingSubmit}
                            >
                                <div>
                                    <HomeIcon />
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        required
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <LocationCityIcon />
                                    <input
                                        type="text"
                                        placeholder="City"
                                        required
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <PinDropIcon />
                                    <input
                                        type="number"
                                        placeholder="Pin Code"
                                        required
                                        value={pinCode}
                                        onChange={(e) => setPinCode(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <PhoneIcon />
                                    <input
                                        type="number"
                                        placeholder="Phone Number"
                                        required
                                        value={phoneNo}
                                        onChange={(e) => setPhoneNo(e.target.value)}
                                        size="10"
                                    />
                                </div>

                                <div>
                                    <PublicIcon />

                                    <select
                                        required
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                    >
                                        <option value="">Country</option>
                                        {Country &&
                                            Country.getAllCountries().map((item) => (
                                                <option key={item.isoCode} value={item.isoCode}>
                                                    {item.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                {country && (
                                    <div>
                                        <TransferWithinAStationIcon />

                                        <select
                                            required
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                        >
                                            <option value="">State</option>
                                            {State &&
                                                State.getStatesOfCountry(country).map((item) => (
                                                    <option key={item.isoCode} value={item.isoCode}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                )}

                                <input
                                    type="submit"
                                    value="Continue"
                                    className="shippingBtn"
                                    disabled={state ? false : true}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        </>
    );
};

export default Shipping;