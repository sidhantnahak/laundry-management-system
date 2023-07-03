import { createStore,combineReducers,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools}from 'redux-devtools-extension'

import {  Cart, Payment, PaymentDetail, notification, profileReducer, userReducer } from "./UserReducers/UserReducer";
import { RequestDetailsReducer, adminlaundryReducer, laundryReducer } from "./UserReducers/LaundryReducer";


const reducer=combineReducers({
    user:userReducer,
    profile:profileReducer,
    laundries:laundryReducer,
    admin:adminlaundryReducer,
    requestdetail:RequestDetailsReducer,
    notifications:notification,
    carts:Cart,
    payments:Payment,
    paymentdetails:PaymentDetail
})
const middleware=[thunk]

// const store=createStore(reducer);


const initialState={}
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;