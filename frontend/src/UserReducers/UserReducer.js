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
    logout_request,
    login_reset,
    register_reset,
    otp_resend_request,
    otp_resend_sucess,
    otp_resend_fail,
    otp_resend_reset,
    getall_notification_request,
    getall_notification_sucess,
    getall_notification_fail,
    forget_password_fail,
    delete_notification_request,
    delete_notification_sucess,
    delete_notification_fail,
    delete_notification_reset,
    getall_cart_item_request,
    getall_cart_item_sucess,
    getall_cart_item_fail,
    add_in_cart_request,
    add_in_cart_sucess,
    add_in_cart_fail,
    add_in_cart_reset,
    delete_cart_item_request,
    delete_cart_item_sucess,
    delete_cart_item_fail,
    delete_cart_item_reset,
    payment_sucess_request,
    payment_sucess_sucess,
    payment_sucess_fail,
    payment_sucess_reset,
    add_payment_request,
    delete_payment_request,
    add_payment_sucess,
    delete_payment_sucess,
    add_payment_fail,
    delete_payment_fail,
    add_payment_reset,
    delete_payment_reset,
    getall_payment_request,
    getall_payment_sucess,
    getall_payment_fail,
    payment_detail_request,
    payment_detail_sucess,
    payment_detail_fail,
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
        case logout_request:

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
                user: action.payload,
                sucess: true,
            }

        case logout_sucess:
            return {
                user: null,
                loading: false,
                isAuthenticated: false,
                lout_sucess: true
            }

        case login_reset:
        case register_reset:

            return {
                ...state,
                sucess: false
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


export const notification = (state = { notification: {} }, action) => {

    switch (action.type) {
        case getall_notification_request:
        case delete_notification_request:
            return {
                loading: true,
                isAuthenticated: false
            }
        case getall_notification_sucess:

            return {
                ...state,
                loading: false,
                notifications: action.payload,
            }
        case delete_notification_sucess:
            return {
                ...state,
                loading: false,
                isDeleted: true
            }
        case getall_notification_fail:

            return {
                ...state,
                loading: false,
                notifications: null,
                error: action.payload
            }

        case delete_notification_fail:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case delete_notification_reset:
            return {
                ...state,
                isDeleted: false
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



export const Cart = (state = { cart: {} }, action) => {

    switch (action.type) {
        case getall_cart_item_request:
        case add_in_cart_request:
        case delete_cart_item_request:

            return {
                loading: true,
                isAuthenticated: false
            }
        case getall_cart_item_sucess:

            return {
                ...state,
                loading: false,
                carts: action.payload,
            }
        case add_in_cart_sucess:
        case delete_cart_item_sucess:
            return {
                ...state,
                loading: false,
                isAdded: action.payload
            }
        case getall_cart_item_fail:


            return {
                ...state,
                loading: false,
                carts: null,
                error: action.payload
            }
        case add_in_cart_fail:
        case delete_cart_item_fail:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case add_in_cart_reset:
        case delete_cart_item_reset:
            return {
                ...state,
                isAdded: false
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



export const Payment = (state = { payment: {} }, action) => {

    switch (action.type) {
        case payment_sucess_request:
        case add_payment_request:
        case delete_payment_request:
        case getall_payment_request:


            return {
                loading: true,
                isAuthenticated: false
            }

        case getall_payment_sucess:
            return {
                ...state,
                loading: false,
                payments: action.payload
            }
        case payment_sucess_sucess:
        case add_payment_sucess:
        case delete_payment_sucess:

            return {
                ...state,
                loading: false,
                sucess: action.payload
            }

        case payment_sucess_fail:
        case add_payment_fail:
        case delete_payment_fail:
        case getall_payment_fail:


            return {
                ...state,
                loading: false,
                error: action.payload
            }


        case payment_sucess_reset:
        case add_payment_reset:
        case delete_payment_reset:
            return {
                ...state,
                sucess: false
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
        case otp_resend_request:
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
        case otp_resend_sucess:
            return {

                ...state,
                loading: false,
                otpresent: action.payload
            }
        case update_profile_fail:

        case update_password_fail:
        case otp_fail:
        case otp_resend_fail:
        case reset_password_fail:
        case forget_password_fail:
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

        case otp_resend_reset:
            return {
                ...state,
                otpresent: false
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


export const PaymentDetail = (state = { paymentdetails: {} }, action) => {
    switch (action.type) {
        case payment_detail_request:
            return {
                loading: true,
                ...state,
            };
        case payment_detail_sucess:
            return {
                loading: false,
                payment: action.payload,
            };
        case payment_detail_fail:
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

// export const noteReducer = (state = { notes: {} }, action) => {

//     switch (action.type) {
//         case allnotes_request:
//         case deletenote_request:
//         case addnote_request:
//             case update_request:
//             return {
//                 loading: true,
//                 sucess:false
//             }
//         case allnotes_sucess:
//             return {
//                 ...state,
//                 loading: false,
//                 notes: action.payload,
//             }
//         case deletenote_sucess:
//             case update_sucess:
//             return {
//                 ...state,
//                 loading: false,
//                 sucess: true

//             }
//         case addnote_sucess:
//             return {
//                 ...state,
//                 loading: false,
//                 notes:action.payload,
//                 sucess:true
//             }
//         case allnotes_fail:
//             return {
//                 ...state,
//                 loading: false,
//                 notes: null,
//                 error: action.payload
//             }
//         case deletenote_fail:
//             case update_fail:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload,
//                 sucess:false
//             }
//         case addnote_fail:
//             return {
//                 ...state,
//                 loading: false,
//                 notes:null,
//                 error: action.payload,
//                 sucess:false
//             }
//         default:
//             return state;
//     }
// }