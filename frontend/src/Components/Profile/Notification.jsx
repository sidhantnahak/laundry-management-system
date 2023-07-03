import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import './notification.css'

import Loder from '../Loder/Loder';
import HomeDashboard from '../Dashboard/HomeDashboard';
import { clearErrors, delete_notification, getAllNotification } from '../../UserAction/UserAction';
import { useNavigate } from 'react-router-dom';
import { delete_notification_reset } from '../../Constants/Constants';

const Notification = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate()

    const { loading, error, notifications, isDeleted } = useSelector(state => state.notifications)

    useEffect(() => {
        if (error) {
            alert.success(error);
            dispatch(clearErrors());

        }

        if (isDeleted) {
            alert.success("Message Deleted successfully")
            dispatch(getAllNotification())
            dispatch({ type: delete_notification_reset })
            navigate("/dashboard/notification")

        }

        let elemm = document.querySelector(".sidebar_pro")
        let elem3 = document.querySelector(".status_container")
        let elem4 = document.querySelector(".footer_div")
    
    
    
        const isOpen = elemm.classList.contains('active');
    
        if (elem4) {

            if (isOpen || window.innerWidth <= 750) {
                elem4.style.width = "100%"
                elem4.style.position = "static"
            } else {
                elem4.style.width = " calc(100% - 250px)";
                elem4.style.position = "relative"
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
    }, [loading, error, dispatch, notifications, alert,window.innerWidth,isDeleted])
    let i = 0;

    return (
        <>
            <HomeDashboard />
            {loading  || !notifications? <Loder /> :
                <>


                    <div className='status_container'>
                        <div className="overview_request_container">
                            <p> <b>Dashboard / Overview / Notifications </b></p>

                        </div>
                        {notifications.length === 0 ? <h1> No Notification Found </h1> : <>
                            <h1>Your Laundry Notifications</h1>

                            <div className="table_container1">
                                <table >
                                    <tbody >
                                        <tr>
                                            <th>SL No.</th>
                                            <th>Message</th>
                                            <th>Date / Time</th>
                                            <th>Delete</th>

                                        </tr>

                                        {
                                            notifications.map(e =>




                                                <tr key={i}>
                                                    <td className='price'>{++i}</td>

                                                    <td ><strong>{e.message}</strong></td>


                                                    <td>{e.date} <br /> {e.time}</td>
                                                    <td style={{textAlign:"center",fontSize:"1.9em",cursor:"pointer"}}><i  onClick={() => { dispatch(delete_notification(e.id)) }} className="fa-solid fa-trash" /></td>


                                                </tr>
                                            )

                                        }

                                    </tbody>

                                </table>


                            </div>
                        </>}
                    </div>




                </>}

        </>
    )
}

export default Notification