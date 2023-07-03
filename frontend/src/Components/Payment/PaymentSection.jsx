import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import './payment.css'
import { clearErrors } from '../../UserAction/LaundryAction';
import { useNavigate } from 'react-router-dom';
import Loder from '../Loder/Loder';
import HomeDashboard from '../Dashboard/HomeDashboard';
import { DeletePayment, PaymentDetail, getAllPayment, removeFromCart } from '../../UserAction/UserAction';
import { delete_payment_reset } from '../../Constants/Constants';

const PaymentSection = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate()

    const { payments, loading, error, sucess } = useSelector(state => state.payments)




    useEffect(() => {
        if (error) {
            alert.success(error);
            dispatch(clearErrors());

        }
        if (sucess) {
            alert.success("Payment Deleted Successfully")
            navigate("/dashboard/payment/history")
            dispatch(getAllPayment())
            
            dispatch({ type: delete_payment_reset })
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

   
        if (elem5) {

            if (isOpen || window.innerWidth <= 750) {
                elem5.style.width = "100%"
                elem5.style.position = "static"
            } else {
                elem5.style.width = " calc(100% - 250px)";
                elem5.style.position = "relative"
            }




        }

    }, [payments, loading, error, dispatch, navigate, alert,sucess,window.innerWidth])

    return (
        <>
            <HomeDashboard />
            {loading || !payments ? <Loder /> :
                <>


                    <div className='status_container'>
                        <div className="overview_request_container">
                            <p> <b>Dashboard / Overview / Payments /History </b></p>

                        </div>
                        {payments.length===undefined|| payments.length === 0 ? <h1> No Payments Found </h1> : <>
                            <h1>Your Payments</h1>

                            <div className="table_container1">
                                <table >
                                    <tbody >
                                        <tr >
                                            <th className='price'>Payment Id</th>
                                            <th>Total Item</th>
                                            {/* <th> Delete</th> */}
                                            <th>Price</th>

                                            <th>Status</th>
                                            <th>Date / Time</th>

                                            <th>Remove</th>

                                        </tr>

                                        {

                                            payments.map(e =>




                                                <tr key={e.id}>
                                                    <td  onClick={() =>
{
    navigate(`/dashboard/payment/${e.id}`)
    dispatch(PaymentDetail(e.id))

}


                                                    }>  <p id="payment_id">{e.id}</p></td>
                                                    <td className='price'>{e.carts.length}</td>
                                                    <td className='price'>{e.total}</td>
                                                    <td className='price'> <p style={{ background: "#c5e1ce", padding: "0.3em 0.9em", width: "6.5em", margin: "0 auto" }}>{e.status}</p> </td>
                                                    <td className='price'>{e.date} <br />{e.time}</td>



                                                    <td style={{ textAlign: "center" }}><button onClick={() => {
                                                        dispatch(DeletePayment(e.id))
                                                    }} className='cart_button' >Remove </button> </td>


                                                </tr>
                                            )

                                        }



                                    </tbody>

                                </table>



                            </div>
                        </>}</div>



                </>}

        </>
    )
}

export default PaymentSection