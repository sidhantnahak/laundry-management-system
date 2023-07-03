import React, { useEffect, useState } from 'react'
import './alllaundry.css'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { delete_laundry_request, get_laundry_details, getall_laundries, update_laundry } from '../../UserAction/LaundryAction';
import { useNavigate, useParams } from 'react-router-dom';
import Loder from '../Loder/Loder';
import HomeDashboard from '../Dashboard/HomeDashboard';
import { clear_errors, laundry_update_reset } from '../../Constants/Constants';

const Requests = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate()
    const params = useParams()
    const { error, loading, laundries, iscreated, isDeleted } = useSelector(state => state.laundries)
    const { request } = useSelector(state => state.requestdetail)


    const [data, setdata] = useState({ date: "", top: "", bottom: "", service_type: "", contact: "", description: "", cloth_type: "" })

    const onchange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })



    }

    var modal = document.getElementById("myModal");

    var span = document.getElementsByClassName("close")[0];



    window.onclick = function (event) {
        modal = document.getElementById("myModal");
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    const closehandler = () => {
        modal = document.getElementById("myModal");
        modal.style.display = "none";
        navigate('/dashboard/requests')
    }


    const ReverseDate =(date)=>{

        let split=date.split('-')
        return split[2]+"-"+split[1]+"-"+split[0];
    
    }


    useEffect(() => {
        if (error) {
            alert.error(error);
            navigate('/dashboard/requests')
            dispatch({ type: clear_errors });

            dispatch(getall_laundries())


        }
        if (iscreated) {
            alert.success("Laundry updated successfully")
            navigate('/dashboard/requests')
            dispatch(getall_laundries())

            dispatch({ type: laundry_update_reset })
        }
        if (isDeleted) {
            alert.success("Request Deleted sucessfully")
            dispatch(getall_laundries())
            navigate('/dashboard/requests')
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
    }, [laundries, loading, error, iscreated, dispatch, navigate, alert, params.id, request, isDeleted,window.innerWidth])

    return (
        <>
            <HomeDashboard />
            {loading || !laundries ? <Loder /> :
                <>


                    <div className='status_container'>
                        <div className="overview_request_container">
                            <p> <b>Dashboard / Overview / Requests </b></p>

                        </div>
                        {laundries.length === undefined || laundries.length === 0 ? <h1> No Request Found </h1> : <>
                            <h1>Your Laundry Requests</h1>

                            <div className="table_container1">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>ID</th>
                                            <th>Request Date</th>

                                            <th>Pick Date</th>
                                            <th>View / Update / Delete</th>
                                        </tr>

                                        {

                                            laundries.map(e =>




                                                <tr key={e._id}>
                                                    <td className='price'>{e._id}</td>

                                        

                                                    <td>{ReverseDate(`${e.request_date}`.substr(0, 10)) }</td>

                                                    <td>{ `${e.required_date}`.substr(0, 10)}</td>
                                                    <td>
                                                        <div className="delete_and_update">
                                                            <i onClick={() => {

                                                                navigate(`/dashboard/requests/${e._id}`)

                                                                dispatch(get_laundry_details(e._id));

                                                            }} className="fa-solid fa-eye"></i>
                                                            {e.status === "Requested" ? <i onClick={() => {
                                                                dispatch(get_laundry_details(e._id))

                                                                navigate(`/dashboard/requests/update/${e._id}`)
                                                                modal = document.getElementById("myModal")
                                                                modal.style.display = "block";



                                                            }} className="fa-solid fa-file-pen" style={{ padding: "0.4em 0.3em 0.4em 0.5em" }}></i> : <i style={{ color: "#9e9e9e" }} className='fa-solid fa-file-pen' />}
                                                            {(e.status === "Finished" && e.payment === "Completed" )? <i onClick={() => { dispatch(delete_laundry_request(e._id)) }} className="fa-solid fa-trash"></i> : <i style={{ color: "#9e9e9e" }} className='fa-solid fa-trash' />}






                                                        </div>
                                                    </td>


                                                </tr>
                                            )

                                        }

                                    </tbody>

                                </table>


                            </div>
                        </>}
                    </div>


                    <div id="myModal" style={{ paddingTop: "80px" }} className="modal">

                        <div style={{ width: "40%", marginBottom: "3em" }} className="modal-content" >

                            <span onClick={closehandler} className="close">&times;</span>
                            <h3>Update Your Laundry Request</h3>
                            <div className="modal_detail">

                                <label> Pick up / Drop date : </label>
                                <input style={{ border: "1px solid black" }} type="date" name="date" placeholder="Pick a Date" onChange={onchange} size="15" required />
                                <label> Topwear : </label>
                                <input style={{ border: "1px solid black" }} type="text" name="top" placeholder="shirt,top,Tshirt" size="15" onChange={onchange} required />
                                <label> Bottomwear : </label>
                                <input style={{ border: "1px solid black" }} type="text" name="bottom" placeholder="Lower,jeans,leggins" onChange={onchange} size="15" required />
                                <label> Cloth Type : </label>
                                <input style={{ border: "1px solid black" }} type="text" name="cloth_type" placeholder="woolen cloth / others" onChange={onchange} size="15" required />

                                <label>
                                    Service Type :
                                </label>
                                <br />

                                <select name='service_type' onChange={onchange}>
                                    <option value="none">None</option>
                                    <option value="pickup laundry services">Pickup laundry services</option>
                                    <option value="Dry cleaning">Dry cleaning</option>
                                    <option value="fluff and fold laundry services">Fluff and fold laundry services</option>

                                </select>

                                <label> Phone :

                                </label>
                                <input style={{ border: "1px solid black" }} type="text" name="contact" placeholder="Phone Number" onChange={onchange} size="2" />
                                <strong>Description (if any) :</strong>
                                <textarea style={{ border: "1px solid black" }} cols="80" name='description' rows="5" placeholder="message" onChange={onchange}>
                                </textarea>
                            </div>
                            <div className='modal_button_div'>

                                <button onClick={() => {
                                    modal.style.display = "none"
                                    navigate('/dashboard/requests')

                                }}>Back</button>
                                <button onClick={() => {


                                    modal.style.display = "none";

                                    dispatch(update_laundry(data, params.id))



                                }

                                }>Save</button>
                            </div>
                        </div>


                    </div>

                </>}

        </>
    )
}

export default Requests