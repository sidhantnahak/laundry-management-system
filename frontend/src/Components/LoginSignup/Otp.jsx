import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { OtpResent, clearErrors, getUser, otpverify } from '../../UserAction/UserAction'
import { otp_resend_reset, otp_reset } from '../../Constants/Constants'
import { useAlert } from 'react-alert'
import Loder2 from '../Loder/Loder2'


const Otp = () => {
    const [opt, setOpt] = useState(null)
    const alert = useAlert()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, isUpdated, otpresent } = useSelector((state) => state.profile);

    const Otpsubmit = () => {
        dispatch(otpverify(opt))

    }

    const email = localStorage.getItem("email");

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (otpresent) {
            alert.success("Resend otp successfully!")
            navigate("/password/forgot/otp");
            dispatch({ type: otp_resend_reset })
        }
        if (isUpdated) {
            alert.success(" Otp Submited successfully ")
            navigate("/password/reset")
            dispatch({ type: otp_reset })
        }

    }, [loading, isUpdated, error, navigate, alert, dispatch, otpresent])

    return (
        <>
            {loading ? <Loder2 /> :

                <div className="forgotpassword_container">
                    <h3 className='login_heading'>OTP Verification</h3>
                    <form>
                        <input type="number" name='name' onChange={(e) => setOpt(e.target.value)} placeholder="Enter OTP" />

                    </form>
                    <button onClick={() => dispatch(OtpResent(email))}>Resend</button>

                    <button onClick={Otpsubmit}>Submit</button>
                </div>
            }
        </>
    )
}

export default Otp