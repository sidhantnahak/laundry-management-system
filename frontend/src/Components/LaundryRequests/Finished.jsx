import React, { useEffect } from 'react'
import './alllaundry.css'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { clearErrors, delete_laundry_request, get_laundry_details, getall_laundries } from '../../UserAction/LaundryAction';
import { useNavigate } from 'react-router-dom';
import Loder from '../Loder/Loder';
import HomeDashboard from '../Dashboard/HomeDashboard';

const Finished = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate()

    const { laundries, loading, error, iscreated } = useSelector(state => state.laundries)
    var FinishedArray = [];
    if (laundries) {
        FinishedArray = laundries.filter(e => {
            return e.status === "Finished"
        })
    }

    const ReverseDate =(date)=>{

        let split=date.split('-')
        return split[2]+"-"+split[1]+"-"+split[0];
    
    }
    useEffect(() => {
        if (error) {
            alert.success(error);
            dispatch(clearErrors());

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
        


    }, [laundries, loading, error,  dispatch, navigate, alert,window.innerWidth])

    return (
        <>
            <HomeDashboard />
            {loading ? <Loder /> :
                <>


                    <div className='status_container'>
                        <div className="overview_request_container">
                            <p> <b>Dashboard / Overview / Status / Finished </b></p>

                        </div>
                        {FinishedArray.length === 0 ? <h1> No Request Found </h1> : <>
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

                                            FinishedArray.map(e => {

                                                return <tr key={e._id}>
                                                    <td className='price'>{e._id}</td>

                                                    <td style={{ color: "green", font: "bold" }}><strong>{e.status}</strong> </td>

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

export default Finished