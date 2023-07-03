const mongoose = require('mongoose')
const date=new Date()

const LaundryRequest = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    top_wear: {
        type: String,
        required: true
    },
    bottom_wear: {
        type: String,
        required: true
    },
    cloth_type: {
        type: String,
        required: true
    },
    status:{
        type:String,
        default:"Requested"
    },
        
    service_type: {
        type: String,
        required: true
    },

    contact: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: "None"
    },
   request_date: {
        type: Date,
        default:Date.now  
        
    },
    price:{
        type:Number,
        default:54
    },
    required_date:{
        type:String,
        default:new Date(Date.now()+3*24*60*60*1000)
    },
    payment:{
        type:String,
        default:"Pending"
    }

})





module.exports = mongoose.model("LaundryRequest", LaundryRequest)