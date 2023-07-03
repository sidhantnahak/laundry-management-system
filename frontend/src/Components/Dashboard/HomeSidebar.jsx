import React, { useEffect } from 'react'
import './sidebar.css'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { admin_getall_laundries, getall_laundries } from '../../UserAction/LaundryAction';
import { Link } from 'react-router-dom';
import { Logout, getAllCart, getAllNotification, getAllPayment, getAllUser } from '../../UserAction/UserAction';
import { useAlert } from 'react-alert';
import { register_reset } from '../../Constants/Constants';

const HomeSidebar = () => {

    const { user } = useSelector(state => state.user)
    // const { requests } = useSelector(state => state.admin)
    const dispatch=useDispatch();
    const alert=useAlert()
    const logOUt = () => {

        alert.success("Logged out successfully!")

        dispatch(Logout())
        dispatch({ type: register_reset })


    }

    useEffect(() => {
    
    }, [user,dispatch,alert,window.innerWidth])
    

    return (
        <Sidebar style={{ position: "fixed" }} className='sidebar_pro' >
            <Menu className='side_menu'>

                <MenuItem component={<Link to='/dashboard'></Link>} id='dashboard_menu' className='menu_item'> Dashboard </MenuItem>
                {window.innerWidth<=750 &&
<> <MenuItem component={<Link to='/dashboard/Profile'></Link>} className='menu_item'style={{ marginTop: "0.5em" }} > Account</MenuItem>

<MenuItem onClick={logOUt} rootStyles={{position:"absolute",bottom:"0",marginBottom:"1em",fontSize:"1.2em"}}  className='menu_item' >Logout<i  style={{ fontSize: "1.6rem", marginLeft: "0.7rem", cursor: "pointer",position:"relative",top:"2px" }} className="fa-solid fa-right-from-bracket"></i> </MenuItem>
</>
}

                <SubMenu className='sub_menu' style={{ marginTop: "0.5em" }} label="Laundry Request">
                    <MenuItem component={<Link to='/dashboard/request'></Link>} className='menu_item'> Create Request </MenuItem>
                    <MenuItem onClick={()=>dispatch(getall_laundries())} component={<Link to='/dashboard/requests'></Link>} className='menu_item'> All Requests </MenuItem>
                </SubMenu>
                <SubMenu className='sub_menu' style={{ marginTop: "0.5em" }} label="Requset status">
                    <MenuItem onClick={()=>dispatch(getall_laundries())} component={<Link to='/dashboard/status'></Link>} className='menu_item'> All Request Status</MenuItem>
                </SubMenu>

                {user.role === "admin" &&
                    <SubMenu    className='sub_menu' style={{ marginTop: "0.5em" }} label="Admin User">
                        <MenuItem onClick={()=>dispatch(admin_getall_laundries())}component={<Link to='/admin/dashboard/allrequests'></Link>}  className='menu_item'>All Requests </MenuItem>
                        <MenuItem onClick={()=>dispatch(getAllUser())} component={<Link to='/admin/dashboard/allusers'></Link>} className='menu_item'> All Users </MenuItem>
                    </SubMenu>
                }
<MenuItem onClick={()=>dispatch(getAllCart())}  component={<Link to='/dashboard/cart'></Link>}  className='menu_item' style={{ marginTop: "0.5em" }}> My Cart</MenuItem>

<MenuItem onClick={()=>dispatch(getAllPayment())}  component={<Link to='/dashboard/payment/history'></Link>}  className='menu_item' style={{ marginTop: "0.5em" }}>Payment History</MenuItem>
<MenuItem onClick={()=>dispatch(getAllNotification())} component={<Link to='/dashboard/notification'></Link>} id='dashboard_menu' className='menu_item' style={{ marginTop: "0.5em" }}> Notification </MenuItem>



            </Menu>
        </Sidebar>
    )
}

export default HomeSidebar