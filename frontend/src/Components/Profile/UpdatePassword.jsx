import React, { useState,useEffect } from 'react'
import Loder from '../Loder/Loder'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, updatepassword } from '../../UserAction/UserAction'
import './updatepassword.css'
import { useNavigate } from 'react-router-dom'
import { update_password_reset } from '../../Constants/Constants'
import { useAlert } from 'react-alert'
import HomeDashboard from '../Dashboard/HomeDashboard'


const UpdatePassword = () => {
    const [oldpassword, setoldPassword] = useState("")

    const [password, setPassword] = useState("")
    const [cpassword, setcPassword] = useState("")

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert=useAlert()

    // const { user, isAuthenticated } = useSelector((state) => state.user);
    const { isUpdated, loading, error } = useSelector((state) => state.profile);


    const updatePassword = (e) => {
        e.preventDefault()
        dispatch(updatepassword(oldpassword, password, cpassword));



    }

    useEffect(() => { 
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success("Password Updated sucessfully")
            navigate('/dashboard/profile')
            dispatch({ type: update_password_reset })
        }
        



        let elem = document.querySelector(".sidebar_pro")
        let elem3 = document.querySelector(".footer_div")
        let elem5 = document.querySelector(".status_container")


        const isOpen = elem.classList.contains('active');


 

        if (elem3) {

            if (isOpen || window.innerWidth <= 750) {
                elem3.style.width = "100%"
                elem3.style.position = "static"
            } else {
                elem3.style.width = " calc(100% - 250px)";
                elem3.style.position = "relative"
            }


        }
       
    }, [error, isUpdated, loading, dispatch, navigate,alert])

    return (
        <>
            <HomeDashboard />

            {loading ? <Loder /> :
            <div className="status_container">

<div className="overview_request_container">
                            <p> <b>Dashboard / Overview / Profile / Update / Password </b></p>

                        </div>

                <div className="password_container">
                    <div className="inner_div">
                        <h3 className='login_heading'>Update Password</h3>
                        <form>
                            <input type="password" name='name' onChange={(e) => setoldPassword(e.target.value)} placeholder="Enter Your Old Password" />

                            <input type="password" name='name' onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your New Password" />

                            <input type="password" name='email' onChange={(e) => setcPassword(e.target.value)} placeholder="Enter Your Confirm Password" />

                        </form>
                        <button onClick={updatePassword}>Save</button>
                    </div>
                </div>
                </div>
            }
        </>
    )
}

export default UpdatePassword