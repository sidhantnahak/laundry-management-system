import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'


const Home = () => {

    const styles = {
        height: "100vh",
        display: "flex",
        flexDirection:"column",
        alignItems: "center",
        justifyContent: "center",
        
    }
   
    return (
        <>
            <header>
                <div className="navbar">
                    <div className="logo"><Link to="/">Laundry Management System</Link></div>
                    <div className="login_signup_div">
                      <Link to='/login'>Login</Link>
                      <Link style={{padding:"0.5em 1.4em"}} to='/register'>Signup</Link>
                        </div>                 
                </div>
            </header>
            <div className='home_content'>
                <h1>Welcome to Laundry Management System</h1>
                <h2>To make your first laundry request <Link to='/login'>Click here</Link></h2>
            </div>
        </>
    )
}

export default Home