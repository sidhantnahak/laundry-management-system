
import {
  
    laundry_request_request,
    laundry_request_sucess,
    laundry_request_fail,
    clear_errors,
    getall_laundry_request,
    getall_laundry_fail,
    getall_laundry_sucess,
    laundry_delete_request,
    laundry_delete_sucess,
    laundry_delete_fail,
    admin_getall_laundry_request,
    admin_getall_laundry_sucess,
    admin_getall_laundry_fail,
    admin_laundry_delete_request,
    admin_laundry_delete_sucess,
    admin_laundry_delete_fail,
    admin_laundry_update_request,
    admin_laundry_update_sucess,
    admin_laundry_update_fail,
    get_laundry_request,
    get_laundry_sucess,
    get_laundry_fail,
    laundry_update_request,
    laundry_update_sucess,
    laundry_update_fail

} from "../Constants/Constants";
import axios from 'axios'


axios.create({
    baseURL: 'http://localhost:4000',
    withCredentials: true
})






export const add_laundry_request = (data) => async (dispatch) => {
    const top_wear=data.top;
    const bottom_wear=data.bottom;
    const cloth_type=data.cloth_type;
    const service_type=data.service_type;
    const contact=data.contact;
    const description=data.description;
    const required_date=data.date


    try {
        dispatch({ type: laundry_request_request });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(`/api/v1/createrequest`,
            {  top_wear,
                bottom_wear,
                cloth_type,
                service_type,
                contact,
                description,
                required_date
                }, config
        )

        dispatch({ type: laundry_request_sucess, payload: data.requests });

    } catch (error) {

        dispatch({ type:laundry_request_fail, payload: error.response.data.message });

    }
}


export const getall_laundries=()=>async(dispatch)=>{
    try {
        dispatch({ type: getall_laundry_request });
        
        const { data } = await axios.get('/api/v1/fetchallrequests')
        dispatch({ type: getall_laundry_sucess,payload:data.requests});

    } catch (error) {

        dispatch({ type: getall_laundry_fail,payload:error.response.data.message });
        
    }
}


export const get_laundry_details=(id)=>async(dispatch)=>{
    try {
        dispatch({ type: get_laundry_request });
        
        const { data } = await axios.get(`/api/v1/request/${id}`)
        dispatch({ type: get_laundry_sucess,payload:data.laundry});

    } catch (error) {
        dispatch({ type: get_laundry_fail,payload:error.response.data.message });
        
    }
}



export const update_laundry=(data,id)=>async(dispatch)=>{


    const top_wear=data.top;
    const bottom_wear=data.bottom;
    const cloth_type=data.cloth_type;
    const service_type=data.service_type;
    const contact=data.contact;
    const description=data.description;
    const required_date=data.date
    try {
        dispatch({ type:laundry_update_request  });
        const config = { headers: {"Content-Type": "application/json"}};
        const { data } = await axios.put(`/api/v1/updaterequest/${id}`,
        {top_wear,bottom_wear,cloth_type,service_type,contact,description,required_date},config
        )
        dispatch({ type: laundry_update_sucess,payload:data.sucess});

    } catch (error) {
        dispatch({ type: laundry_update_fail, payload:error.response.data.message });
        
    }
}



export const delete_laundry_request=(id)=>async(dispatch)=>{
    try {
        dispatch({ type:laundry_delete_request  });

        const { data } = await axios.delete(`/api/v1/deleterequest/${id}`)
        dispatch({ type: laundry_delete_sucess,payload:data.sucess});

    } catch (error) {
        dispatch({ type: laundry_delete_fail,payload:error.response.data.message });

    }
}

// export const updatenote=(id,title,description)=>async(dispatch)=>{
//     try {

//         dispatch({ type:update_request  });
//         const config = { headers: {"Content-Type": "application/json"}};

//         const { data } = await axios.put(`/api/v1/updatenote/${id}`,
//         {title,description},config
//         )
//         dispatch({ type:update_sucess,payload:data.notes});

//     } catch (error) {
//         dispatch({ type: update_fail,payload:error.response.data.message });

//     }
// }








export const admin_getall_laundries=()=>async(dispatch)=>{
    try {
        dispatch({ type: admin_getall_laundry_request });
        
        const { data } = await axios.get('/api/v1/admin/fetchallrequests')
        dispatch({ type: admin_getall_laundry_sucess,payload:data.requests});

    } catch (error) {

        dispatch({ type: admin_getall_laundry_fail,payload:error.response.data.message });
        
    }
}



export const admin_update_laundry=(id,status)=>async(dispatch)=>{
    try {

        dispatch({ type:admin_laundry_update_request  });
        const config = { headers: {"Content-Type": "application/json"}};

        const { data } = await axios.put(`/api/v1/admin/update/${id}`,
        {status},config
        )
        dispatch({ type:admin_laundry_update_sucess,payload:data.sucess});

    } catch (error) {
        dispatch({ type: admin_laundry_update_fail,payload:error.response.data.message });

    }
}

export const admin_delete_laundry_request=(id)=>async(dispatch)=>{
    try {
        dispatch({ type:admin_laundry_delete_request  });


        const { data } = await axios.delete(`/api/v1/admin/delete/${id}`)

        dispatch({ type: admin_laundry_delete_sucess,payload:data.sucess});

    } catch (error) {
        dispatch({ type: admin_laundry_delete_fail,payload:error.response.data.message });

    }
}






export const clearErrors = () => async (dispatch) => {
    dispatch({ type: clear_errors});
};