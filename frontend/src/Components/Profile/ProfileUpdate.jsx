import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getUser, updateprofile } from '../../UserAction/UserAction'
import Loder from '../Loder/Loder'
import { update_profile_reset } from '../../Constants/Constants'
import { useAlert } from 'react-alert'
import HomeDashboard from '../Dashboard/HomeDashboard'


const ProfileUpdate = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert()


    const { user, isAuthenticated } = useSelector((state) => state.user);
    const { isUpdated, loading, error } = useSelector((state) => state.profile);


    const [data, setData] = useState({ name: "", phone: null })

    function Onchange(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }



    const updateProfile = (e) => {
        e.preventDefault()
        dispatch(updateprofile(data.name, data.phone))

    }


    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success("profile updated")
            navigate("/dashboard/profile")
            dispatch(getUser())
            dispatch({ type: update_profile_reset })
        }
    }, [dispatch, navigate, isAuthenticated, loading, error, user, alert, isUpdated])
    return (
        <>
            <HomeDashboard />

            {loading ? <Loder /> :
                <>
                    <div className="status_container">


                        <div className="overview_request_container">
                            <p> <b>Dashboard / Overview / Profile / Update / Profile </b></p>

                        </div>
                        <div style={{height:"60vh"}} className="login_container">
                            <div className="form">
                                <h3 className='login_heading'>Update Profile</h3>
                                <form>
                                    <input minLength={6} type="name" name='name' onChange={Onchange} placeholder="Enter Your New Name" />

                                    <input minLength={10} type="number" name='phone' onChange={Onchange} placeholder="Enter Your New Phone Number" />

                                </form>
                                <button onClick={updateProfile}>Update</button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default ProfileUpdate