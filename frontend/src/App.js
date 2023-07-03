import './App.css';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import Login from './Components/LoginSignup/Login';
import UserRoute from './Components/ProtectedRoutes/ProtectedRoute';
import AdminRoute from './Components/ProtectedRoutes/AdminRoute';
import Register from './Components/LoginSignup/Register';
import { clearErrors, getAllCart, getAllNotification, getAllPayment, getAllUser, getUser } from './UserAction/UserAction';
import { admin_getall_laundries, get_laundry_details, getall_laundries } from './UserAction/LaundryAction';
import { useEffect, useState } from 'react';
import store from './Store'
import Request from './Components/Request/Request';
import Home from './Components/Home/Home';
import Dashboard from './Components/Dashboard/Dashboard'
import Footer from './Components/Dashboard/Footer';
import AllLaundryRequests from './Components/LaundryRequests/AllLaundryRequests'
import AllLaundryStatus from './Components/LaundryRequests/AlllaundryStatus'
import { useDispatch, useSelector } from 'react-redux';
import Finished from './Components/LaundryRequests/Finished';
import Requested from './Components/LaundryRequests/Requested';
import Accepted from './Components/LaundryRequests/Accepted';
import Progress from './Components/LaundryRequests/Progress';
import AllRequests from './Components/Admin/AllRequests';
import Alluser from './Components/Admin/Alluser';
import RequestDetail from './Components/Request/RequestDetail';
import Profile from './Components/Profile/Profile';
import ProfileUpdate from './Components/Profile/ProfileUpdate';
import UpdatePassword from './Components/Profile/UpdatePassword';
import ForgotPassword from './Components/LoginSignup/ForgotPassword';
import Otp from './Components/LoginSignup/Otp';
import ResetPassword from './Components/LoginSignup/ResetPassword';
import Notification from './Components/Profile/Notification';
import Notfound from './Components/Loder/Notfound';
import Carts from './Components/Cart/Carts';
import Shipping from './Components/Cart/Shipping';
import ConfirmOrder from './Components/Cart/ConfirmRequest';
import Payment from './Components/Cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useAlert } from 'react-alert';
import SucessPayment from './Components/Cart/SucessPayment';
import PaymentSection from './Components/Payment/PaymentSection';
import PaymentDetails from './Components/Payment/PaymentDetail';


function App() {

  const [stripeApiKey, setStripeApiKey] = useState("");

  const { isAuthenticated } = useSelector(state => state.user)
  const [setsize, setSetsize] = useState(undefined)

  const handlesize = () => {
    setSetsize(window.innerWidth)
  }

  const alert = useAlert()
  const params=useParams()


  async function getStripeApiKey() {
    try {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);

      
    } catch (error) {
      // alert.error(error.message)
    }
    


  }

  useEffect(() => {

    store.dispatch(getUser());
    store.dispatch(getall_laundries())
    store.dispatch(admin_getall_laundries())
    store.dispatch(getAllUser())
    store.dispatch(getAllNotification())
    store.dispatch(getAllCart())
    store.dispatch(getAllPayment())
    getStripeApiKey()


    handlesize()
    window.addEventListener("resize", handlesize)
    // return ()=> window.removeEventListener("resize",handlesize)


  }, [alert])
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<Notfound />} />

        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/password/forgot' element={<ForgotPassword />} />
        <Route exact path='/password/forgot/otp' element={<Otp />} />
        <Route exact path='/password/reset' element={<ResetPassword />} />
        <Route element={<UserRoute />}>
          <Route exact path='/dashboard' element={<Dashboard />} />
          <Route exact path='/dashboard/profile' element={<Profile />} />
          <Route exact path='/dashboard/profile/update' element={<ProfileUpdate />} />
          <Route exact path='/dashboard/profile/update/password' element={<UpdatePassword />} />
          <Route exact path='/dashboard/notification' element={<Notification />} />
          <Route exact path='/dashboard/cart' element={<Carts />} />
          <Route exact path='/request/shipping' element={<Shipping />} />
          <Route exact path='/request/confirm' element={<ConfirmOrder />} />
          {stripeApiKey && <Route path="/request/payment" element={(<Elements stripe={loadStripe(stripeApiKey)}> {<Payment />}</Elements>)} />}
          <Route exact path='/request/payment/sucess' element={<SucessPayment />} />
          <Route exact path='/Dashboard/payment/history' element={<PaymentSection />} />
          <Route exact path='/Dashboard/payment/:id' element={<PaymentDetails />} />




          <Route exact path='/dashboard/request' element={<Request />} />
          <Route exact path='/dashboard/requests' element={<AllLaundryRequests />} />
          <Route exact path='/dashboard/requests/update/:id' element={<AllLaundryRequests />} />
          <Route exact path='/dashboard/requests/:id' element={<RequestDetail />} />
          <Route exact path='/dashboard/status' element={<AllLaundryStatus />} />
          <Route exact path='/dashboard/status/finished' element={<Finished />} />
          <Route exact path='/dashboard/status/requested' element={<Requested />} />
          <Route exact path='/dashboard/status/progress' element={<Progress />} />
          <Route exact path='/dashboard/status/accepted' element={<Accepted />} />

        </Route>

        <Route element={<AdminRoute isAdmin={true} />}>

          <Route path='/admin/dashboard/allrequests' element={<AllRequests />} />
          <Route path='/admin/dashboard/allrequests/update/:id' element={<AllRequests />} />
          <Route path='/admin/dashboard/allusers' element={<Alluser />} />


        </Route>

      </Routes>
      {isAuthenticated && <Footer />}

    </BrowserRouter>

  );
}

export default App;
