import React, { useEffect } from 'react'
import './profile.css'
import { Link } from 'react-router-dom'
import image from '../images/profile.png'
import { useSelector } from 'react-redux'
import HomeDashboard from '../Dashboard/HomeDashboard'
import Loder from '../Loder/Loder'

const Profile = () => {

    const { user, loading } = useSelector(state => state.user)

    useEffect(() => {


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

   
  

    }, [user, loading,window.innerWidth])

    return (
        <>
            <HomeDashboard />
            {loading ? <Loder /> :
                <>
                    <div className="status_container">

                    <div className="overview_request_container">
                            <p> <b>Dashboard / Overview / Profile </b></p>

                        </div>
                        <div className="profileContainer">
                            <div>
                                <h1>My Profile {user.role === "admin" ? ("( A ) ") : ("( U )")}</h1>
                                <img src={image} alt="not found" />
                                <Link to="/dashboard/profile/update">Edit Profile</Link>
                            </div>
                            <div>
                                <div>
                                    <h4>Full Name</h4>
                                    <p>{user.name}</p>
                                </div>
                                <div>
                                    <h4>Email</h4>
                                    <p>{user.email}</p>
                                </div>
                                <div>
                                    <h4>Joined On</h4>
                                    <p>{user.date}</p>
                                </div>

                                <div>
                                    <Link to="/dashboard/requests">My Laundry requests</Link>
                                    <Link to="/dashboard/profile/update/password">Change Password</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Profile