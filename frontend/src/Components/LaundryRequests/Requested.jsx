import React, { useEffect } from 'react'
import './alllaundry.css'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { clearErrors, delete_laundry_request, get_laundry_details, getall_laundries } from '../../UserAction/LaundryAction';
import { useNavigate } from 'react-router-dom';
import Loder from '../Loder/Loder';
import HomeDashboard from '../Dashboard/HomeDashboard';

const Requested = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate()

    let elem = document.querySelector(".sidebar_pro")
    console.log(elem)
    // let elem3 = document.querySelector(".footer_div")
    // let elem5 = document.querySelector(".status_container")
    if(elem){
        const isOpen = elem.classList.contains('active');
            console.log(isOpen)
    }

    const { laundries, loading, error, isDeleted } = useSelector(state => state.laundries)
    var RequestedArray = [];

    if (laundries) {
        RequestedArray = laundries.filter(e => {
            return e.status === "Requested"
        })
    }
    const ReverseDate =(date)=>{

        let split=date.split('-')
        return split[2]+"-"+split[1]+"-"+split[0];
    
    }
    console.log("requested")
    useEffect(() => {




        let elem = document.querySelector(".sidebar_pro")
        let elem3 = document.querySelector(".footer_div")
        let elem5 = document.querySelector(".status_container")


        const isOpen = elem.classList.contains('active');
        console.log(isOpen)


 

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


        
        if (error) {
            alert.success(error);
            dispatch(clearErrors());

        }
       





    }, [laundries, loading, error, dispatch, navigate, alert,window.innerWidth])


  


        




    return (
        <>
            <HomeDashboard />
            {loading ? <Loder /> :
                <>


                    <div className='status_container'>
                        <div className="overview_request_container">
                            <p> <b>Dashboard / Overview / Status / Requested </b></p>

                        </div>
                        {RequestedArray.length === 0 ? <h1> No Request Found </h1> : <>
                            <h1>Your Laundry Requests</h1>

                            <div className="table_container1">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>ID</th>
                                            <th>Status</th>
                                            <th>Request Date</th>

                                            <th>Pick Date</th>
                                            <th> Delete</th>
                                        </tr>

                                        {

                                            RequestedArray.map(e => {

                                                return <tr key={e._id}>
                                                    <td className='price'>{e._id}</td>

                                                    <td><strong>{e.status}</strong> </td>

                                                    <td>{ReverseDate((e.request_date).substr(0,10))}</td>

                                                    <td>{`${e.required_date}`.substr(0, 10)}</td>
                                                    <td>
                                                        <div className="delete_and_update">

                                                            <i onClick={() => {

                                                                navigate(`/dashboard/requests/${e._id}`)

                                                                dispatch(get_laundry_details(e._id));

                                                            }} className="fa-solid fa-eye"></i>
                                                        </div>

                                                    </td>

                                                </tr>
                                            }
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

export default Requested