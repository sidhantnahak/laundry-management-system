import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './login.css'
import { useState, useEffect } from 'react'
import { clearErrors, login } from '../../UserAction/UserAction';
import { useDispatch, useSelector } from 'react-redux'
import { getall_laundries } from '../../UserAction/LaundryAction';

import { useAlert } from 'react-alert';
import { login_reset } from '../../Constants/Constants';
import Loder2 from '../Loder/Loder2';


const Login = () => {







    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert()


    const { user, loading, isAuthenticated, error, sucess } = useSelector((state) => state.user);


    const [data, setData] = useState({ email: "", password: "" })
    const { email, password } = data;

    function Onchange(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }



    const OnSubmit = (e) => {

        e.preventDefault()
        dispatch(login(email, password))
    }




    function myFunction() {

        const open = document.querySelector("#open")

        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
            open.classList = "fa-solid fa-eye"


        } else {
            x.type = "password";
            open.classList = "fa-solid fa-eye-slash"




        }
    }

    useEffect(() => {
        if (error) {
            alert.error(error)

            dispatch(clearErrors())
        }
        if (sucess && isAuthenticated) {
            alert.success("Logged in sucessfully")

            navigate("/dashboard");
            dispatch(getall_laundries())
            dispatch({ type: login_reset })

        }



    }, [dispatch, navigate, isAuthenticated, loading, error, user, alert, sucess])
    return (
        <>

            {loading ? <Loder2 /> :
                <div className="login_container">
                    <div className="form">
                        <h3 className='login_heading'>Login Here</h3>
                        <form >
                            <input type="email" name='email' onChange={Onchange} placeholder="Enter Your Email" required />
                          
                             <input id='password' type="password" name='password' onChange={Onchange} placeholder="Enter Your Password" required minLength={8} maxLength={25} />




                        </form>
                        <button onClick={OnSubmit}>Submit</button>
    <i style={{position:"relative",bottom:"48px",left:"170px",color:"black",cursor:"pointer",fontSize:"0.9em"}} onClick={myFunction} id="open" class="fa-solid fa-eye-slash"></i>

                        <div className="login_links">
                            <Link className='Forgot' to="/password/forgot">forgot password</Link>

                            <Link className='Create_new' to="/register">Create New Account</Link>

                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Login