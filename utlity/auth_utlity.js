//middleware
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, "secret", {expiresIn: '1000ms'},(err, decoded) => {

    if (err) {
          console.log(err);

      res.status(403).json({ message: "invalid token" });
    }
    req.userId = decoded.user;
    next();
  });
};

// Nodemailer Transporter
// const transporter = nodemailer.createTransport({
//   service:'Gmail',
//   auth:{
//     user:"anshad.cookee@gmail.com",
//     pass :"anshadcookee4345"
//   }
// });
// Sent reset password to email
// const sendResetEmail = async (email,token) =>{
//   const resultUrl = `http://localhost:5000/reset-password/${token}`
  
//   const mailOptions ={
//     from:"anshad@gmail.com",
//     to:email,
//     subject :"Password reset",
//     text:`You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
//           Please click on the following link, or paste this into your browser to complete the process:\n\n
//           ${resultUrl}\n\n
//           If you did not request this, please ignore this email and your password will remain unchanged.\n`
//   }
//   console.log(sendResetEmail);

//   await transporter.sendMail(mailOptions)

// }





module.exports = { authenticateToken };
