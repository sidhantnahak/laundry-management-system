import React, { useEffect, useState } from 'react'
// import './alllaundry.css'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { admin_delete_laundry_request, admin_getall_laundries, admin_update_laundry, clearErrors, getall_laundries } from '../../UserAction/LaundryAction';
import { useNavigate, useParams } from 'react-router-dom';
import Loder from '../Loder/Loder';
import HomeDashboard from '../Dashboard/HomeDashboard';
import { admin_laundry_delete_reset, admin_laundry_update_reset } from '../../Constants/Constants';

const AllRequests = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate()
    const params = useParams()
    const [status, setStatus] = useState("")



    var modal = document.getElementById("myModal");

    // var span = document.getElementsByClassName("close")[0];



    window.onclick = function (event) {
        modal = document.getElementById("myModal");
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    const closehandler = () => {
        modal = document.getElementById("myModal");
        modal.style.display = "none";
        navigate('/admin/dashboard/allrequests')
    }


    const update = () => {
        modal.style.display = "none";

        const id = params.id
        dispatch(admin_update_laundry(id, status))


    }

    const { requests, loading, error, isDeleted, isUpdated } = useSelector(state => state.admin)
    const ReverseDate =(date)=>{

        let split=date.split('-')
        return split[2]+"-"+split[1]+"-"+split[0];
    
    }

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(admin_getall_laundries())

            navigate("/admin/dashboard/allrequests")

            dispatch(clearErrors());


        }

        if (isUpdated) {
            alert.success("request updated sucessfully")
            dispatch(admin_getall_laundries())
            dispatch(getall_laundries())
            navigate("/admin/dashboard/allrequests")
            dispatch({ type: admin_laundry_update_reset })
        }
        if (isDeleted) {
            alert.success("Request Deleted sucessfully")
            dispatch(admin_getall_laundries())
            dispatch(getall_laundries())

            navigate('/admin/dashboard/allrequests')
            dispatch({ type: admin_laundry_delete_reset })
        }


    }, [requests, loading, error, isDeleted, isUpdated, dispatch, navigate, alert])

    return (
        <>
            <HomeDashboard />
            {loading|| !requests ? <Loder /> :
                <>


                    <div className='status_container'>
                        <div className="overview_request_container">
                            <p> <b>Dashboard / Overview / Requests </b></p>

                        </div>

                        {

                            requests.length === 0 ? <h1> No Request Found </h1> : <>
                                <h1>All Laundry Requests</h1>

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

                                                requests.map(e =>




                                                    <tr key={e._id}>
                                                        <td className='price'>{e._id}</td>

                                                        {e.status === "Finished" && <td style={{ color: "green", font: "bold" }}><strong>{e.status}</strong> </td>}
                                                        {e.status === "Inprogress" && <td style={{ color: "blue" }}><strong>{e.status}</strong></td>}
                                                        {e.status === "Accepted" && <td style={{ color: "red" }}><strong>{e.status}</strong></td>}
                                                        {e.status === "Requested" && <td ><strong>{e.status}</strong></td>}

                                                        <td>{ReverseDate((e.request_date).substr(0,10))}</td>
                                                        <td>{`${e.required_date}`.substr(0, 10)}</td>
                                                        <td>
                                                            <div className="delete_and_update">

                                                                <i onClick={() => {


                                                                    navigate(`/admin/dashboard/allrequests/update/${e._id}`)
                                                                    modal = document.getElementById("myModal")
                                                                    modal.style.display = "block";




                                                                }} className="fa-solid fa-file-pen" />
                                                                <i onClick={() => (dispatch(admin_delete_laundry_request(e._id)))} className="fa-solid fa-trash"></i>

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

                    <div id="myModal" className="modal">

                        <div style={{height:"35%"}} className="modal-content">

                            <span onClick={closehandler} className="close">&times;</span>
                            <h3>Change Request Status</h3>
                            <div className="modal_detail">


                                <select name='request_update' onChange={(e) => setStatus(e.target.value)}>
                                    <option>None</option>
                                    <option value="Requested">Requested</option>
                                    <option value="Accepted">Accepted</option>
                                    <option value="Inprogress">Inprogress</option>
                                    <option value="Finished">Finished</option>

                                </select>
                            </div>
                            <div>

                                <button onClick={() => modal.style.display = "none"}>Back</button>
                                <button onClick={update}>Save</button>
                            </div>
                        </div>


                    </div>

                </>
            }

        </>
    )
}

export default AllRequests