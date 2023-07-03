import React, { useEffect } from 'react'
import './dashboard.css'
import { useDispatch, useSelector } from 'react-redux'
import Loder from '../Loder/Loder'
import { useNavigate } from 'react-router-dom'
import HomeDashboard from './HomeDashboard'

const Dashboard = () => {

    const { laundries, loading } = useSelector(state => state.laundries)
    const { isAuthenticated } = useSelector(state => state.user)
    const navigate = useNavigate()
    // const dispatch=useDispatch();

    let request = 0, process = 0, accept = 0, finish = 0;

    if (laundries) {


        laundries.forEach(element => {

            if (element.status === "Requested") request++;
            else if (element.status === "Inprogress") process++;
            else if (element.status === "Accepted") accept++;
            else finish++;
        });
    }

    const handler1 = () => {
        navigate("/dashboard/status/requested")
    }
    const handler4 = () => {
        navigate("/dashboard/status/finished")
    }

    const handler3 = () => {
        navigate("/dashboard/status/progress")
    }
    const handler2 = () => {
        navigate("/dashboard/status/accepted")
    }

    useEffect(() => {
        let elem = document.querySelector(".sidebar_pro")


        const isOpen = elem.classList.contains('active');

        let elem3 = document.querySelector(".footer_div")
        if (elem3) {

            if (isOpen || window.innerWidth <= 750) {
                elem3.style.width = "100%"
                elem3.style.position = "static"
            } else {
                elem3.style.width = " calc(100% - 250px)";
                elem3.style.position = "relative"
            }


        }

    }, [loading, laundries, navigate,isAuthenticated,window.innerWidth])

    return (
        <> 
        <HomeDashboard />
            {loading ? <Loder /> :
               
                    <div className="dashboard_container">
                        <div className="overview_container">
                            <p> <b>Dashboard / Overview </b></p>

                        </div>

                        <div className="detail_container">

                            <div className="items_container">
                                <div className="item" style={{ background: "rgb(237, 237, 40)" }}>
                                    <div className="items1">{request} New request</div>
                                    <div onClick={handler1} className="items1"><p>view Details</p><i style={{border:"none"}} className="fa-solid fa-light fa-chevron-right"></i></div>
                                </div>
                                <div className="item" style={{ background: "rgb(60, 281,132)" }}>
                                    <div className="items1" style={{ alignItems: "start" }}>{accept} Accepted!</div>
                                    <div className="items1" onClick={handler2}><p>View Details</p><i style={{border:"none"}} class="fa-solid fa-light fa-chevron-right"></i></div>
                                </div>
                                <div className="item" style={{ background: "rgb(91, 211, 238)" }}>
                                    <div className="items1">{process} Inprogress!</div>
                                    <div className="items1" onClick={handler3}><p>View Details</p><i style={{border:"none"}} className="fa-solid fa-light fa-chevron-right"></i></div>
                                </div>
                                <div className="item" style={{ background: "rgb(230, 94, 94)" }}>

                                    <div className="items1">{finish} Finish!</div>
                                    <div onClick={handler4} className="items1"><p>View Details</p><i style={{border:"none"}} className="fa-solid fa-light fa-chevron-right"></i></div>
                                </div>
                            </div>
                            <h1>Laundry Price ( Per Unit )</h1>

                            <div className="table_container">
                                <table>
                                    <tbody>


                                        <tr>
                                            <td className='price'>Top Wear Laundry Price</td>
                                            <td>12</td>
                                        </tr>
                                        <tr>
                                            <td className='price'>Bottom Wear Laundry Price</td>
                                            <td>22</td>
                                        </tr>
                                        <tr>
                                            <td className='price'>Woolen Cloth Laundry Price</td>
                                            <td>20</td>
                                        </tr>
                                        <tr>
                                            <td className='price'>Other Price</td>
                                            <td>Other price depends upon cloth variety(other than above three category)</td>
                                        </tr>
                                    </tbody>
                                </table>


                            </div>



                        </div>

                        {/* <Footer/> */}

                    </div>

            }



        </>
    )
}

export default Dashboard