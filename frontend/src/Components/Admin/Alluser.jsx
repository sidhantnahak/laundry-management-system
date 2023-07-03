import React, { useEffect} from 'react'
// import './alllaundry.css'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { clearErrors } from '../../UserAction/LaundryAction';
import { useNavigate } from 'react-router-dom';
import Loder from '../Loder/Loder';
import HomeDashboard from '../Dashboard/HomeDashboard';
import { delete_user, getAllUser } from '../../UserAction/UserAction';
import { admin_delete_user_reset } from '../../Constants/Constants';

const Alluser = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate()

    const { users, loading, error, isDeleteduser } = useSelector(state => state.admin)

    const ReverseDate =(date)=>{

        let split=date.split('-')
        return split[2]+"-"+split[1]+"-"+split[0];
    
    }
    useEffect(() => {

        if (error) {
            alert.success(error);
            dispatch(clearErrors());

        }

        if (isDeleteduser) {
            alert.success("User Deleted sucessfully")
            dispatch(getAllUser())
            navigate('/admin/dashboard/allusers')
            dispatch({ type: admin_delete_user_reset })
        }


    }, [users, loading, error, isDeleteduser, dispatch, navigate, alert])

    let styles = { padding: '0.5rem 1.2rem', background: "#009ee3", color: "black", fontWeight: "700", cursor: "pointer", border: "none"
 }

    return (
        <>
            <HomeDashboard />
            {loading || !users ? <Loder /> :
                <>


                    <div className='status_container'>
                        <div className="overview_request_container">
                            <p> <b>Dashboard / Overview / Users </b></p>

                        </div>

                        {
                            users.length === 0 ? <h1> No Request Found </h1> : <>
                                <h1>All Laundry Users</h1>

                                <div className="table_container1">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Joined</th>

                                                <th> Delete</th>
                                            </tr>

                                            {

                                                 users.map(e =>




                                                    <tr key={e._id}>
                                                        <td className='price'>{e._id}</td>
                                                        <td>{e.name}</td>

                                                         <td>{ReverseDate((e.date).substr(0,10))}</td>
                                                        <td style={{ textAlign: "center" }}>

                                                            <button style={styles} onClick={() => 
                                                               {  dispatch(delete_user(e._id)) ;
                                                               console.log(e._id) }}
                                                                 >Delete<i style={{ fontSize: "1rem" }} className="fa-solid fa-trash"></i></button>


                                                        </td>

                                                    </tr>
                                                )

                                            }

                                        </tbody>

                                    </table>


                                </div>
                            </>}
                    </div>



                </>
            }

        </>
    )
}

export default Alluser