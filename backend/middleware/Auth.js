const jwt = require('jsonwebtoken');
const User = require('../Models/Usermodel')

exports.isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        return res.status(401).json({ sucess: false, message: "please login to access detail" })
    }
    const data = jwt.verify(token, process.env.JWT_KEY)
    req.id = data.id;

    next()


}


exports.authorizedRoles = async (req, res, next) => {

    const user = await User.findById(req.id);

    if (user.role != "admin") {
        return res.status(401).json({ message: `Role:${user.role} is not allowed to access this resource`, sucess: false })

    }
    
    next()

    // return (req,res,next)=>{
    //     if(roles==="admin"){
    //         next()

    //     }else{
    //        return res.status(401).json({message:`Role:${req.user.role} is not allowed to access this resource`,sucess:false})

    //     }
    // }
}
