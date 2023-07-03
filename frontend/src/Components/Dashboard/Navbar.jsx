import React from 'react'
import './navbar.css'
import { Link, useNavigate } from "react-router-dom"
import { Logout } from '../../UserAction/UserAction'
import { getall_laundry_reset, register_reset } from '../../Constants/Constants'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useAlert } from 'react-alert'
import Loder from '../Loder/Loder'


const Navbar = () => {


    const Toogle = () => {
        let dropdown = document.querySelector('.sidebar')
        let arrow = document.querySelector('#arrow')

        dropdown.classList.toggle('open')

        const isOpen = dropdown.classList.contains('open');
        arrow.classList = isOpen ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down"


    }




    const closeMenu = () => {
        let elem = document.querySelector(".sidebar_pro")
        let elem2 = document.querySelector(".dashboard_container")
        let elem3 = document.querySelector(".footer_div")
        let elem4 = document.querySelector(".request_container")
        let elem5 = document.querySelector(".status_container")
        let elem6 = document.querySelector(".main")
        // elem.style.display = "block"

        let toogle_btn_icon = document.querySelector('.logo i');

        elem.classList.toggle("active")
        const isOpen = elem.classList.contains('active');


        if (elem2) {
            if (isOpen || window.innerWidth <= 750) {
                elem2.style.width = "100%"
                elem2.style.position = "static"
                elem2.transition = '2s ease'
            } else {
                elem2.style.width = " calc(100% - 250px)";
                elem2.style.position = "relative"
                elem2.transition = '2s ease'




            }
        }

        if (elem3) {

            if (isOpen || window.innerWidth <= 750) {
                elem3.style.width = "100%"
                elem3.style.position = "static"
            } else {
                elem3.style.width = " calc(100% - 250px)";
                elem3.style.position = "relative"
            }


        }

        if (elem4) {

            if (isOpen || window.innerWidth <= 750) {
                elem4.style.width = "100%"
                elem4.style.position = "static"
            } else {
                elem4.style.width = " calc(100% - 250px)";
                elem4.style.position = "relative"
            }


        }
        if (elem5) {

            if (isOpen || window.innerWidth <= 750) {
                elem5.style.width = "100%"
                elem5.style.position = "static"
            } else {
                elem5.style.width = " calc(100% - 250px)";
                elem5.style.position = "relative"
            }




        }
        if (elem6) {

            if (isOpen || window.innerWidth <= 750) {
                elem6.style.width = " calc(100% - 250px)";
                elem6.style.position = "relative"

            } else {
                elem6.style.width = "100%"
                elem6.style.position = "static"

            }


        }
        toogle_btn_icon.classList = isOpen ? "fa-solid fa-bars-staggered" : "fa-solid fa-bars"


    }



    const navigate = useNavigate()
    const alert = useAlert();
    const dispatch = useDispatch()
    const { isAuthenticated, error, lout_sucess, loading, user } = useSelector(state => state.user)
    const { laundries} = useSelector(state => state.laundries)

    const logOUt = () => {

        alert.success("Logged out successfully!")

        Toogle()
        dispatch(Logout())
        dispatch({ type: getall_laundry_reset })
        dispatch({ type: register_reset })


    }

    useEffect(() => {

        if (error) {
            alert.error(error)
        }
        if (!isAuthenticated) {

            navigate('/login')
        }
        

    }, [error, isAuthenticated, lout_sucess, navigate, dispatch, alert, loading, user,laundries])

    return (
        <>
            {loading ? <Loder /> :
                <>
                    <header>
                        <div className="navbar">


                            <div className="logo"><Link to="/dashboard">Laundry Management System</Link>

                                <i onClick={closeMenu} className="fa-solid fa-bars" />

                            </div>

                            <div onClick={Toogle} className='arrow_div'>
                                <i id='profile' className="fa-solid fa-user"></i>
                                <i id='arrow' className="fa-solid fa-angle-down"></i>
                            </div>
                            {/* <div onClick={Toogle} className="bar">
                        <i className="fa-solid fa-bars" />
                    </div> */}

                        </div>

                    </header>
                    <div className="sidebar">
                        <ul>
                            <h3 style={{ textAlign: "center", marginTop: "1rem", marginBottom: "0.3rem", color: "white" }}>{user.name}</h3>
                            <li className='account_link'><Link to="/dashboard/profile">Account</Link></li>

                            <li className='logout_div' ><Link style={{ fontWeight: "600" }} onClick={logOUt} >Logout<i style={{ fontSize: "1.6rem", marginLeft: "0.7rem", cursor: "pointer", position: "relative", top: "0.1em" }} className="fa-solid fa-right-from-bracket"></i></Link> </li>
                            {/* <li><Link to="/dashboard/request">Laundry Request</Link></li>
                            <li><Link to="/dashboard/status">Request Status</Link></li>
                            <li ><Link onClick={logOUt} className="start" >Logout</Link></li> */}

                        </ul>
                    </div>
                </>}
        </>

    )
}


export default Navbar