const { validationResult } = require('express-validator');
const Laundry = require('../Models/LaundryModel')
const User = require('../Models/Usermodel');
const TimeAndDateFunc = require('../Utils/getDate');



const ReverseDate =(date)=>{

    let split=date.split('-')
    return split[2]+"-"+split[1]+"-"+split[0];

}
exports.getAllLaundryRequest = async (req, res) => {
    try {
        const requests = await Laundry.find({ user: req.id });

        if (requests) {
            return res.status(200).json({ requests, sucess: true })

        }
    } catch (error) {
        return res.status(400).json({ message: error.message, sucess: false });

    }

}

exports.createLaundryRequest = async (req, res) => {
    const { top_wear, bottom_wear, cloth_type, service_type, contact, description, required_date } = req.body;

    if (!top_wear || !bottom_wear || !cloth_type || !service_type || !contact || !required_date) {
        return res.status(404).json({ message: "enter required fields", sucess: false })
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg, sucess: false })
    }


    try {

        const request = await Laundry.create({
            user: req.id,
            top_wear,
            bottom_wear,
            cloth_type,
            service_type,
            contact,
            description,
            required_date:ReverseDate(required_date),


        });
        const user = await User.findById(req.id)
        const notification = { message: `Your request has been confirmed on ID : ${request._id}`, date: TimeAndDateFunc().currentDate, time: TimeAndDateFunc().currentTime, id: TimeAndDateFunc().currentDate + TimeAndDateFunc().currentTime }
        user.notification.push(notification);

        await user.save({ validateBeforeSave: false })

        const requests = await Laundry.find({ user: req.id });



        return res.status(200).json({ requests, sucess: true })
    } catch (error) {
        return res.status(404).json({ message: error.message, sucess: false })
    }
}



exports.getlaundry = async (req, res) => {

    if (!req.params.id) {
        return res.status(404).json({ message: "request not found", sucess: false })

    }
    try {

        const laundry = await Laundry.findById(req.params.id)

        if (!laundry) {

            return res.status(404).json({ message: "request not found", sucess: false })
        }
        return res.status(200).json({
            sucess: true,
            laundry
        })


    } catch (error) {

        return res.status(404).json({ message: error.message, sucess: false })

    }


}

exports.deleterequest = async (req, res) => {

    const request = await Laundry.findById(req.params.id);
    if (!request) {
        return res.status(404).json({ message: "note not found", sucess: false })
    } else if (request.user.toString() != req.id) {
        return res.status(401).json({ message: "not allowed", sucess: false })

    }

    try {
        await Laundry.findByIdAndDelete(req.params.id)
        const user = await User.findById(req.id)
        const notification = { message: `Your request on ID : ${request._id}  has been Deleted`, date: TimeAndDateFunc().currentDate, time: TimeAndDateFunc().currentTime, id: TimeAndDateFunc().currentDate + TimeAndDateFunc().currentTime }
        user.notification.push(notification);

        await user.save({ validateBeforeSave: false })
        return res.status(200).json({ message: "Deleted sucessfully", sucess: true })

    } catch (error) {
        return res.status(404).json({ message: error.message, sucess: false })

    }

}

exports.updaterequest = async (req, res) => {

    const { top_wear, bottom_wear, cloth_type, service_type, contact, description, required_date } = req.body;



    if (!top_wear || !bottom_wear || !cloth_type || !service_type || !contact || !required_date) {
        return res.status(404).json({ message: "enter required fields", sucess: false })
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg, sucess: false })
    }

    try {
        if (!req.params.id) {
            return res.status(404).json({ message: "note not found", sucess: false })

        }
        const request = await Laundry.findById(req.params.id);
        if (!request) {
            return res.status(404).json({ message: "note not found", sucess: false })
        }
        else if (request.user.toString() != req.id) {
            return res.status(401).json({ message: "not allowed", sucess: false })

        }





        let laundry = await Laundry.findByIdAndUpdate(req.params.id, { top_wear, bottom_wear, cloth_type, service_type, contact, description, required_date });
        await laundry.save({
            validateBeforeSave: false
        })

        const user = await User.findById(req.id)
        const notification = { message: `Your request on ID : ${laundry._id}  has been Updated`, date: TimeAndDateFunc().currentDate, time: TimeAndDateFunc().currentTime, id: TimeAndDateFunc().currentDate + TimeAndDateFunc().currentTime }

        user.notification.push(notification);

        await user.save({ validateBeforeSave: false })
        return res.status(200).json({ message: "updated sucessfully", sucess: true })

    } catch (error) {
        return res.status(404).json({ message: error.message, sucess: false })
    }
}




exports.DeleteNotification = async (req, res) => {


    try {
        const user = await User.findById(req.id)

        let index = user.notification.findIndex(e => e.id == req.params.id)

        if (index > -1) {
            user.notification.splice(index, 1);
        }
        else {
            return res.status(400).json({ message: "message not found", sucess: false })
        }

        await user.save({ validateBeforeSave: false })
        return res.status(200).json({ message: "message deleted sucessfully", sucess: true })

    } catch (error) {
        return res.status(200).json({ message: error.message, sucess: true })


    }

}



exports.getAllCarts = async (req, res) => {


    try {
        const user = await User.findById(req.id)


        if (!user) {
            return res.status(400).json({ message: "user not found", sucess: false })

        }

        return res.status(200).json({ carts: user.addtocart, sucess: true })


    } catch (error) {
        return res.status(200).json({ message: error.message, sucess: true })


    }

}

exports.AddToCart = async (req, res) => {


    try {
        const user = await User.findById(req.id)

        let laundry = await Laundry.findById(req.params.id)

        if (laundry) {
            user.addtocart.push(laundry);
        }
        else {
            return res.status(400).json({ message: "request not found", sucess: false })
        }
        if (laundry.payment === "Pending") {
            laundry.payment = "AddedToCart"

        } else if (laundry.payment === "AddedToCart") {
            return res.status(403).json({ message: "request already has been added in cart", sucess: false })

        }
        await laundry.save({ validateBeforeSave: false })

        await user.save({ validateBeforeSave: false })
        return res.status(200).json({ message: "added to cart sucessfully", sucess: true })

    } catch (error) {
        return res.status(200).json({ message: error.message, sucess: true })


    }

}




exports.DeleteFromCart = async (req, res) => {

    try {
        let user = await User.findById(req.id)


        let laundry = await Laundry.findById(req.params.id)

        let index = user.addtocart.findIndex(e => e._id == req.params.id)

        if (index > -1) {
            user.addtocart.splice(index, 1);
            await user.save({ validateBeforeSave: false })

        }
        else {
            return res.status(400).json({ message: "item not found in cart", sucess: false })
        }
        if (laundry.payment === "AddedToCart") {
            laundry.payment = "Pending"
            await laundry.save({ validateBeforeSave: false })

        } else if (laundry.payment === "Pending") {
            return res.status(400).json({ message: "request is not found on cart", sucess: false })

        }

        return res.status(200).json({ message: "removed from cart sucessfully", sucess: true })

    } catch (error) {
        return res.status(200).json({ message: error.message, sucess: false })


    }

}



exports.SucessPayment = async (req, res) => {


    try {
        let user = await User.findById(req.id)

        carts = user.addtocart

        if (carts.length === 0) {
            return res.status(400).json({ message: "request not found on cart", sucess: false })

        }
        let laundry;
        for (let i = 0; i < carts.length; i++) {

            laundry = await Laundry.findById(carts[i]._id);
            laundry.payment = "Completed"

  

            let notification = { message: `Your request on ID : ${laundry._id} payment has been done`, date: TimeAndDateFunc().currentDate, time: TimeAndDateFunc().currentTime, id: TimeAndDateFunc().currentDate + TimeAndDateFunc().currentTime }

            user.notification.push(notification);

            await laundry.save({ validateBeforeSave: false })
            await user.save({ validateBeforeSave: false })

        }


       let user2=await User.findById(req.id)
       user2.addtocart=[]

        await user2.save({ validateBeforeSave: false })


        return res.status(200).json({ message: "payment done sucessfully", sucess: true })

    } catch (error) {
        return res.status(200).json({ message: error.message, sucess: false })


    }

}




exports.AddToPayment = async (req, res) => {


    try {
        const user = await User.findById(req.id)

        if (!req.body.dataobj) {
            return res.status(400).json({ message: "Payment data not found", sucess: false })

        }
        let dateAndtime = {
            date: TimeAndDateFunc().currentDate,
            time: TimeAndDateFunc().currentTime
        }
        user.Payments.push({ ...req.body.dataobj, ...dateAndtime })


        await user.save({ validateBeforeSave: false })
        return res.status(200).json({ message: "payment added sucessfully", sucess: true })

    } catch (error) {
        return res.status(200).json({ message: error.message, sucess: false })


    }

}


exports.getAllPayment = async (req, res) => {


    try {
        const user = await User.findById(req.id)

        if (!user) {
            return res.status(400).json({ message: "user not found", sucess: false })

        }


        return res.status(200).json({ payments: user.Payments, sucess: true })

    } catch (error) {
        return res.status(200).json({ message: error.message, sucess: false })


    }

}






exports.DeletePayment = async (req, res) => {


    try {
        const user = await User.findById(req.id)

        if (!req.params.id) {
            return res.status(400).json({ message: "Payment not found", sucess: false })

        }

        let index = user.Payments.findIndex(e => e.id === req.params.id)

        if (index > -1) {
            user.Payments.splice(index, 1);
        }
        await user.save({ validateBeforeSave: false })
        return res.status(200).json({ message: "payment deleted sucessfully", sucess: true })

    } catch (error) {
        return res.status(200).json({ message: error.message, sucess: false })


    }

}


exports.PaymentDetail = async (req, res) => {

    try {
        const user = await User.findById(req.id)

        if (!user) {
            return res.status(400).json({ message: "user not found", sucess: false })

        }

        let payment = user.Payments.find(e => e.id == req.params.id)


        return res.status(200).json({ payment: payment, sucess: true })

    } catch (error) {
        return res.status(200).json({ message: error.message, sucess: false })


    }

}













//Admin user

exports.getalllaudries = async (req, res) => {
    try {
        const requests = await Laundry.find();

        if (requests) {
            return res.status(200).json({ requests, sucess: true })

        }
    } catch (error) {
        return res.status(400).json({ message: error.message, sucess: false });

    }

}



//Update order status - Admin
exports.UpdatlaundryStatus = async (req, res) => {

    try {


        const laundry = await Laundry.findById(req.params.id)

        if (!laundry) {
            return res.status(404).json({ message: "request not found", sucess: false })

        }
        if (req.body.status === "Finished" && laundry.status === "Finished") {
            return res.status(404).json({ message: "laundry status already has been finished", sucess: false })

        }

        if (req.body.status === "Accepted") {
            laundry.status = "Accepted"
        } else if (req.body.status === "Inprogress")
            laundry.status = "Inprogress"

        else if (req.body.status === "Finished") {
            laundry.status = "Finished"

        }
        else if (req.body.status === "Requested") {
            laundry.status = "Requested"

        }

        const user = await User.findById(laundry.user)
        const notification = { message: `Your request on ID : ${laundry._id} status has been Changed`, date: TimeAndDateFunc().currentDate, time: TimeAndDateFunc().currentTime, id: TimeAndDateFunc().currentDate + TimeAndDateFunc().currentTime }

        user.notification.push(notification);

        await user.save({ validateBeforeSave: false })
        await laundry.save({
            validateBeforeSave: false
        })

        res.status(200).json({
            sucess: true,
            laundry
        })
    }
    catch (error) {
        return res.status(404).json({ message: error.message, sucess: false })

    }
}


//delete a laundry -- admin
exports.deletelaundry = async (req, res) => {

    try {
        const laundry = await Laundry.findById(req.params.id)

        if (!laundry) {
            return res.status(404).json({ message: "request not found", sucess: false })
        }
        let id = req.params.id;
        let userId = laundry.user;
        await Laundry.findByIdAndDelete(req.params.id)

        const user = await User.findById(userId)
        const notification = { message: `Your request on ID : ${id}  has been Deleted`, date: TimeAndDateFunc().currentDate, time: TimeAndDateFunc().currentTime, id: TimeAndDateFunc().currentDate + TimeAndDateFunc().currentTime }

        user.notification.push(notification);

        await user.save({ validateBeforeSave: false })

        res.status(200).json({
            sucess: true,
            message: `Order on ${req.params.id} id deleted sucessfully `
        })

    } catch (error) {
        return res.status(404).json({ message: error.message, sucess: false })

    }

}



