const User = require('../Models/Usermodel');
const jwt = require('jsonwebtoken');

const sendToken = (user, statusCode, res) => {
  try {
    const token = user.getJwtToken();

    const options = {
      expires: new Date(Date.now() + process.env.COOKIEEXPIRE_HOUR* 60 * 60 * 1000),
      httpOnly: true
    }
    return res.status(statusCode).cookie("token",token,options).json({ sucess: true, user, token })
  } catch (error) {

    return res.status(401).json({ sucess: false, message: error })
  }
}

module.exports = sendToken