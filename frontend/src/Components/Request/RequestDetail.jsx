import React, { useEffect } from 'react'
import './requestdetail.css'
import { useDispatch, useSelector } from 'react-redux'
import Loder from '../Loder/Loder';
import HomeDashboard from '../Dashboard/HomeDashboard';
import { useParams } from 'react-router-dom';
import {  get_laundry_details } from '../../UserAction/LaundryAction';
import { useAlert } from 'react-alert';
import { clear_errors } from '../../Constants/Constants';

const RequestDetail = () => {

    const { loading, request,error } = useSelector(state => state.requestdetail);
    const { user } = useSelector(state => state.user);
    const params=useParams()
    const dispatch=useDispatch()
    const alert=useAlert()
    
    
       

    
    useEffect(() => { 
        if(error){
            alert.error(error)
            dispatch({type:clear_errors})
        }




        let elem = document.querySelector(".sidebar_pro")
        let elem3 = document.querySelector(".footer_div")


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
        dispatch(get_laundry_details(params.id))

        
    }, [dispatch,params.id, error,alert])

    return (
        <>

            <HomeDashboard />
            <>

                {loading || !request? <Loder /> :

                    <div className='status_container'>
                        <div className="overview_request_container">
                            <p> <b>Dashboard / Overview / Requests / Request </b></p>

                        </div>

                        <h1>Request Details</h1>

                        <div className="request_item_detail_container">
                            <ul>
                            <li>User Name : </li>

                                <li>Request Id : </li>
                                <li>Request Date :</li>
                                <li>Status : </li>
                                <li>Top : </li>
                                <li>Bottom : </li>
                                <li>service_type : </li>
                                <li>Contact : </li>
                                <li>Cloth_Type : </li>

                                <li>Description : </li>
                            </ul>

                            <ul style={{fontWeight:"700"}}>
                                <li>{user.name}</li>
                                <li>{request._id}</li>

                                <li>{`${request.request_date}`.substring(0,10)}</li>
                               <li>{request.status}</li>

                                
                                <li>{request.top_wear}</li>
                                <li>{request.bottom_wear}</li>
                                <li>{request.service_type}</li>
                                <li>{request.contact}</li>
                                <li>{request.cloth_type}</li>

                                {/* <li>{request&& request.description.length===0?"Not":request.description}</li> */}
                            </ul>
                        </div>

                    </div>
                }
            </>
        </>
    )
}

export default RequestDetail