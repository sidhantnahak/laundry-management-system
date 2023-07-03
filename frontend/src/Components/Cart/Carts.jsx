import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import './cart.css'
import { clearErrors } from '../../UserAction/LaundryAction';
import { useNavigate } from 'react-router-dom';
import Loder from '../Loder/Loder';
import HomeDashboard from '../Dashboard/HomeDashboard';
import { getAllCart, removeFromCart } from '../../UserAction/UserAction';
import { delete_cart_item_reset } from '../../Constants/Constants';

const Carts = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate()

    const { carts, loading, error, isAdded } = useSelector(state => state.carts)


    const TotalPrice = (myarr) => {
        let sum = 0;
        for (let i = 0; i < myarr.length; i++) {
            sum += myarr[i].price;
        }

        return sum

    }



    const closeMenu = () => {
        let elem = document.querySelector(".sidebar_pro")
        let elem3 = document.querySelector(".footer_div")
        let elem5 = document.querySelector(".status_container")
        let elem6 = document.querySelector(".main")


        const isOpen = elem.classList.contains('active');


        // if (elem2) {
        //     if (isOpen || window.innerWidth <= 750) {
        //         elem2.style.width = "100%"
        //         elem2.style.position = "static"
        //         elem2.transition = '2s ease'
        //     } else {
        //         elem2.style.width = " calc(100% - 250px)";
        //         elem2.style.position = "relative"
        //         elem2.transition = '2s ease'




        //     }
        // }

        // if (elem3) {

        //     if (isOpen || window.innerWidth <= 750) {
        //         elem3.style.width = "100%"
        //         elem3.style.position = "static"
        //     } else {
        //         elem3.style.width = " calc(100% - 250px)";
        //         elem3.style.position = "relative"
        //     }


        // }

        // if (elem4) {

        //     if (isOpen || window.innerWidth <= 750) {
        //         elem4.style.width = "100%"
        //         elem4.style.position = "static"
        //     } else {
        //         elem4.style.width = " calc(100% - 250px)";
        //         elem4.style.position = "relative"
        //     }


        // }
        if (elem5) {
            console.log(isOpen,elem5)

            if (isOpen || window.innerWidth <= 750) {
                elem5.style.color="red"
                console.log("get")
                elem5.style.width = "100%"
                elem5.style.position = "static"
            } else {
                console.log("not")

                elem5.style.width = " calc(100% - 250px)";
                elem5.style.position = "relative"
            }
        }



    }




    const CheckOutHandler = (e) => {
        e.preventDefault()
        navigate("/request/Shipping")
    }

    useEffect(() => {
        if (error) {
            alert.success(error);
            dispatch(clearErrors());

        }
        if (isAdded) {
            alert.success("Removed item successfully")
            dispatch({ type: delete_cart_item_reset })

            dispatch(getAllCart())

            navigate('/dashboard/cart')

        }



        let elem = document.querySelector(".sidebar_pro")
        let elem3 = document.querySelector(".footer_div")
        let elem4 = document.querySelector(".status_container")


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

        if (elem4) {

            if (isOpen || window.innerWidth <= 750) {
                elem4.style.width = "100%"
                elem4.style.position = "static"
            } else {
                elem4.style.width = " calc(100% - 250px)";
                elem4.style.position = "relative"
            }


        }
       
    }, [carts, loading, error, dispatch, navigate, alert, isAdded,window.innerWidth])

    return (
        <>
            <HomeDashboard />
            {loading || !carts ? <Loder /> :
                <>


                    <div className='status_container'>
                        <div className="overview_request_container">
                            <p> <b>Dashboard / Overview / Carts </b></p>

                        </div>
                        {carts.length === undefined || carts.length === 0 ? <h1> No Items Found </h1> : <>
                            <h1>Your Carts</h1>

                            <div className="cart_table_container">
                                <table className='cart_table'>
                                    <tbody >
                                        <tr >
                                            <th className='price'>ID</th>
                                            <th>Status</th>
                                            {/* <th> Delete</th> */}
                                            <th>Price</th>
                                            <th>Remove From Carts</th>

                                        </tr>

                                        {

                                            carts.map(e =>




                                                <tr key={e._id}>
                                                    <td className='price'>{e._id}</td>

                                                    {e.status === "Finished" && <td style={{ color: "green", font: "bold" }}><strong>{e.status}</strong> </td>}
                                                    {e.status === "Inprogress" && <td style={{ color: "blue" }}><strong>{e.status}</strong></td>}
                                                    {e.status === "Accepted" && <td style={{ color: "red" }}><strong>{e.status}</strong></td>}
                                                    {e.status === "Requested" && <td ><strong>{e.status}</strong></td>}
                                                    <th>{e.price}</th>

                                                    <td style={{ textAlign: "center" }}><button onClick={() => {
                                                        dispatch(removeFromCart(e._id))
                                                    }} className='cart_button' >Remove<i style={{marginLeft:"0.2em"}} class="fa-solid fa-cart-shopping"></i> </button> </td>


                                                </tr>
                                            )

                                        }



                                    </tbody>

                                </table>

                                <div style={{ width: "80%", borderTop: "2px solid black", marginTop: "2em", textAlign: "right" }}>

                                    <p style={{ margin: "2em 3.5em 0 0", fontSize: "1.1em" }}><strong>Total : {TotalPrice(carts)}</strong>  <button style={{ marginLeft: "9em" }} className='cart_button' onClick={CheckOutHandler}>Check Out</button></p>

                                </div>


                            </div>
                        </>}</div>



                </>}

        </>
    )
}

export default Carts