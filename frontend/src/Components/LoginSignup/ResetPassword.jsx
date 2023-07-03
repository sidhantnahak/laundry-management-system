import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, resetPassword } from '../../UserAction/UserAction'
import { reset_password_reset } from '../../Constants/Constants'
import { useAlert } from 'react-alert'
import Loder2 from '../Loder/Loder2'

const ResetPassword = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [password, setPassword] = useState("")
    const [cpassword, setcPassword] = useState("")

    const { loading, error, isUpdated } = useSelector((state) => state.profile);


    const OnSubmit = (e) => {
        e.preventDefault()
        dispatch(resetPassword(password, cpassword))

    }



    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success("password updated sucessfully")
            navigate('/dashboard')
            dispatch({ type: reset_password_reset })
        }

    }, [loading, error, isUpdated, navigate, dispatch, alert])

    return (
        <>
            {loading ? <Loder2 /> :


                    <div className="login_container">
                        <div className="form">
                            <h3 className='login_heading'>Set Password</h3>
                            <form>
                                <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your New Password" />
                                <input type="password" name='cpassword' onChange={(e) => setcPassword(e.target.value)} placeholder="Enter Your Confirm Password" />

                            </form>
                            <button onClick={OnSubmit}>Save</button>
                        </div>
                    </div>
            }
        </>
    )
}

export default ResetPassword