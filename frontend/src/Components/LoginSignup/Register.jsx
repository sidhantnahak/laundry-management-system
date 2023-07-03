import { React, useState, useEffect, useRef } from 'react'
import './register.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, register } from '../../UserAction/UserAction'
import { useNavigate,Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { register_reset } from '../../Constants/Constants'
import Loder2 from '../Loder/Loder2'


const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert=useAlert()

  const [data, setData] = useState({ name: "", email: "", password: "",phone:null })
  const {  isAuthenticated, error,loading,sucess } = useSelector((state) => state.user);

  const Onchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })

  }
  const { email, password, name, phone } = data;
  const onsubmit = (e) => {
    e.preventDefault()
    dispatch(register(name, email,phone, password))
  }
  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearErrors())
  }
    if (sucess) {
      alert.success("Sucessfully registered")
      navigate('/dashboard');
      dispatch({type:register_reset})
    }
    
  }, [dispatch, isAuthenticated, navigate, error,alert,sucess])



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

  return (
  <>
  {loading?<Loder2/>:
    <div className="register_form">
      <div className="form2">
        <h3>Register Here</h3>
        <form >
          <input type="text" name='name' onChange={Onchange} placeholder="Enter Your Name" minLength={4} maxLength={30} />

          <input type="email" name='email' onChange={Onchange} placeholder="Enter Your Email" />
          <input type="number"  name='phone' onChange={Onchange} placeholder="Enter Your Mobile NUmber" minLength={10} maxLength={10} />
          <input id='password' type="password" name='password' onChange={Onchange} placeholder="Enter Your Password" minLength={8} maxLength={25} />
        </form>
        <button onClick={onsubmit}>Submit</button><Link className='signin' to="/login">Already registerd</Link>
        <i style={{position:"relative",bottom:"48px",left:"20px",color:"black",cursor:"pointer",fontSize:"0.9em"}} onClick={myFunction} id="open" class="fa-solid fa-eye-slash"></i>
      </div>
    </div>}
  </>
  )
}

export default Register