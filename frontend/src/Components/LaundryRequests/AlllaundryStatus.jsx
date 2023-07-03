import React, { useEffect } from 'react'
import './alllaundry.css'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { clearErrors, delete_laundry_request, get_laundry_details, getall_laundries } from '../../UserAction/LaundryAction';
import { useNavigate } from 'react-router-dom';
import Loder from '../Loder/Loder';
import HomeDashboard from '../Dashboard/HomeDashboard';
import { addInCart } from '../../UserAction/UserAction';
import { add_in_cart_reset } from '../../Constants/Constants';

const Status = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate()

    const { laundries, loading, error } = useSelector(state => state.laundries)
    const { isAdded } = useSelector(state => state.carts)




    useEffect(() => {


     
  









        if (error) {
            alert.success(error);
            dispatch(clearErrors());

        }
        if (isAdded) {
            alert.success("Added In Cart")
            dispatch(getall_laundries())
            dispatch({ type: add_in_cart_reset })

            navigate("/dashboard/status")
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







    }, [laundries, loading, error, dispatch, navigate, alert, isAdded,window.innerWidth])

    return (
        <>
            <HomeDashboard />
            {loading ? <Loder /> :
                <>


                    <div className='status_container'>
                        <div className="overview_request_container">
                            <p> <b>Dashboard / Overview / Status </b></p>

                        </div>
                        {laundries.length === undefined || laundries.length === 0 ? <h1> No Request Found </h1> : <>
                            <h1>Your Laundry Request Status</h1>

                            <div className="table_container1">
                                <table style={{ width: "80%" }} >
                                    <tbody>
                                        <tr>
                                            <th className='price'>ID</th>
                                            <th> Price</th>

                                            <th>Status</th>
                                            <th>Payment Status</th>

                                        </tr>

                                        {

                                            laundries.map(e =>




                                                <tr key={e._id}>
                                                    <td className='price'>{e._id}</td>
                                                    <td>{e.price}</td>

                                                    {e.status === "Finished" && <td style={{ color: "green", font: "bold" }}><strong>{e.status}</strong> </td>}
                                                    {e.status === "Inprogress" && <td style={{ color: "blue" }}><strong>{e.status}</strong></td>}
                                                    {e.status === "Accepted" && <td style={{ color: "red" }}><strong>{e.status}</strong></td>}
                                                    {e.status === "Requested" && <td ><strong>{e.status}</strong></td>}
                                                    {e.payment === "Pending" && <td style={{ textAlign: "center" }}> <button onClick={() => dispatch(addInCart(e._id))} className='cart_button' > Add To <i class="fa-solid fa-cart-shopping"></i></button> </td>}

                                                    {e.payment === "AddedToCart" && <td style={{ textAlign: "center" }}>  <p style={{ background: "#c5e1ce", padding: "0.3em 0.9em", width: "6.5em", margin: "0 auto" }}>Added <i class="fa-solid fa-cart-shopping"></i></p>   </td>}

                                                    {e.payment === "Completed" && <td style={{ textAlign: "center", fontSize: "1.1em" }}> <strong style={{ color: "green" }}>Completed</strong> </td>}




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

export default Status