import {
    login_fail, login_sucess, login_request, register_fail,
    register_request,
    register_sucess,
    getuser_request,
    getuser_sucess,
    getuser_fail,

    logout_fail,
    logout_sucess,
    clear_errors,
    update_profile_request,
    update_profile_sucess,
    update_profile_fail,
    update_profile_reset,
    update_password_request,
    update_password_sucess,
    update_password_fail,
    update_password_reset,
    forget_password_request,
    forget_password_sucess,
    forget_password_reset,
    otp_request,
    otp_sucess,
    otp_fail,
    otp_reset,
    reset_password_request,
    reset_password_sucess,
    reset_password_fail,
    reset_password_reset,
    laundry_request_request,
    laundry_request_sucess,
    laundry_request_fail,
    laundry_request_reset,
    getall_laundry_request,
    getall_laundry_sucess,
    getall_laundry_fail,
    laundry_delete_request,
    laundry_delete_sucess,
    laundry_delete_fail,
    laundry_delete_reset,
    admin_getall_laundry_request,
    admin_laundry_update_request,
    admin_laundry_delete_request,
    admin_laundry_update_sucess,
    admin_laundry_delete_sucess,
    admin_laundry_delete_reset,
    admin_laundry_update_reset,
    admin_getall_laundry_fail,
    admin_laundry_delete_fail,
    admin_laundry_update_fail,
    admin_getall_laundry_sucess,
    admin_getall_user_request,
    admin_getall_user_sucess,
    admin_delete_user_fail,
    admin_getall_user_fail,
    admin_delete_user_request,
    admin_delete_user_sucess,
    admin_delete_user_reset,
    get_laundry_request,
    get_laundry_sucess,
    get_laundry_fail,
    laundry_update_request,
    laundry_update_sucess,
    laundry_update_fail,
    laundry_update_reset,
    getall_laundry_reset,
    // allnotes_request,
    // allnotes_sucess,
    // allnotes_fail,
    // deletenote_request,
    // deletenote_sucess,
    // deletenote_fail,
    // addnote_request,
    // addnote_sucess,
    // addnote_fail,
    // update_request,
    // update_sucess,
    // update_fail
} from '../Constants/Constants'

export const userReducer = (state = { user: {} }, action) => {

    switch (action.type) {
        case login_request:
        case register_request:
        case getuser_request:

            return {
                loading: true,
                isAuthenticated: false
            }
        case login_sucess:
        case register_sucess:
        case getuser_sucess:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case logout_sucess:
            return {
                user: null,
                loading: false,
                isAuthenticated: false,
            }
        case login_fail:
        case register_fail:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case getuser_fail:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case logout_fail:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case clear_errors:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }

}


export const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case update_profile_request:
        case update_password_request:
        case forget_password_request:
        case otp_request:
        case reset_password_request:
            return {
                ...state,
                loading: true,
            };
        case update_profile_sucess:
        case update_password_sucess:
        case forget_password_sucess:
        case otp_sucess:
        case reset_password_sucess:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };


        case update_profile_fail:
        case update_password_fail:
        case otp_fail:
        case reset_password_fail:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case update_profile_reset:
        case update_password_reset:
        case forget_password_reset:
        case otp_reset:
        case reset_password_reset:
            return {
                ...state,
                isUpdated: false
            }
        case clear_errors:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

export const laundryReducer = (state = { laundries: {} }, action) => {

    switch (action.type) {
        case laundry_request_request:
        case getall_laundry_request:
        case laundry_delete_request:
            case laundry_update_request:
            return {
                loading: true,
                sucess: false
            }
        case laundry_request_sucess:
            case laundry_update_sucess:
            return {
                ...state,
                iscreated: true
            }
        case laundry_delete_sucess:{
            return{
                ...state,
                isDeleted:true
            }
        }

        case getall_laundry_sucess:
            return {
                ...state,
                loading: false,
                laundries: action.payload
            }
        case laundry_request_fail:
        case getall_laundry_fail:
        case laundry_delete_fail:
            case laundry_update_fail:
            return {
                ...state,
                loading: false,
                error: action.payload

            }
        case laundry_request_reset:
        case laundry_delete_reset:
            case laundry_update_reset:
            return {
                ...state,
                iscreated: false
            }
            case laundry_delete_reset:{
                return{
                    ...state,
                    loading:false,
                    isDeleted:false
                }
            }
            case getall_laundry_reset:
                return {
                    ...state,
                    loading: false,
                    laundries: null
                }

        case clear_errors:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}



export const adminlaundryReducer = (state = { laundries: {} }, action) => {

    switch (action.type) {

        case admin_getall_laundry_request:
        case admin_laundry_update_request:
        case admin_laundry_delete_request:

        case admin_getall_user_request:
        case admin_delete_user_request:
            return {
                loading: true,
                sucess: false
            }
        case admin_laundry_update_sucess:
            return {
                loading: false,
                ...state,
                isUpdated: true,
            }
        case admin_delete_user_sucess:
            return {
                loading: false,
                ...state,
                isDeleteduser: true
            }
        case admin_getall_user_sucess:
            return {
                ...state,
                loading: false,
                users: action.payload
            }
        case admin_laundry_delete_sucess:
            return {
                loading: false,
                ...state,
                isDeleted: true,
            }



        case admin_getall_laundry_sucess:
            return {
                ...state,
                loading: false,
                requests: action.payload
            }

        case admin_getall_laundry_fail:
        case admin_laundry_delete_fail:
        case admin_laundry_update_fail:
        case admin_getall_user_fail:
        case admin_delete_user_fail:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        case admin_laundry_delete_reset:
        case admin_laundry_update_reset:
        case admin_delete_user_reset:


            return {
                ...state,
                isDeleted: false,
                isUpdated: false,
                isDeleteduser: false
            }


        case clear_errors:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}



//Get request Details
export const RequestDetailsReducer = (state = { request: {} }, action) => {
    switch (action.type) {
        case get_laundry_request:
            return {
                loading: true,
                ...state,
            };
        case get_laundry_sucess:
            return {
                loading: false,
                request: action.payload,
            };
        case get_laundry_fail:
            return {
                loading: false,
                error: action.payload,
            };

        case clear_errors:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};