// import nodemailer from 'nodemailer';

// const ForgetPassword=(req,res)=>{
//  const email=req.body.email;
//  let transporter = nodemailer.createTransport({
//    service: 'gmail',
//    auth: {
//      user: 'dilshad2307j@gmail.com',
//      pass: process.env.PASS
//    }
//  });

//  let mailOptions = {
//    from: 'dilshad2307j@gmail.com',
//    to: email,
//    subject: 'Link For ForgetPassword PawnShop',
//    html: "<h1>Welcome to pawnshop</h1><h2>your link to reset password is attached below</h2><h2>Click on the link below to reset password</h2><a href='http://localhost:3000/resetpassword/"+email+"'>Click to reset password</a>"
//  };

// transporter.sendMail(mailOptions, function(error, userDetails){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + userDetails.response);
//   }
// });
// }
// export default ForgetPassword;



// import bcrypt from 'bcryptjs';
// import UserSchemaModel from "./32_User.model_express.js";
// import sendMail from "./32_nodeMailer.js"; 
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
// dotenv.config();

// const ForgetPassword = (req, res) => {
//   const email = req.body.email;

//   let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'dilshad2307j@gmail.com',
//       pass: process.env.NODEPASS   // ✅ Fixed: was PASS, now same as nodeMailer
//     }
//   });

//   let mailOptions = {
//     from: '"Vintage Treasure" <dilshad2307j@gmail.com>',
//     to: email,
//     subject: 'Reset Your Password — Vintage Treasure',
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
//         <div style="background: #8B4513; padding: 20px; text-align: center;">
//           <h1 style="color: white; margin: 0;">🏺 Vintage Treasure</h1>
//         </div>
//         <div style="padding: 30px;">
//           <h2>Password Reset Request 🔑</h2>
//           <p>Click the button below to reset your password:</p>
//           <div style="text-align: center; margin: 30px 0;">
//             <a href="http://localhost:3000/resetpassword/${email}"
//                style="background: #8B4513; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-size: 16px;">
//               Reset Password
//             </a>
//           </div>
//           <p style="color: #888; font-size: 13px;">If you didn't request this, ignore this email.</p>
//         </div>
//       </div>
//     `
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//       res.status(500).json({ "status": false });
//     } else {
//       console.log('Email sent: ' + info.response);
//       res.status(200).json({ "status": true });
//     }
//   });
// };

// export default ForgetPassword;


import bcrypt from "bcryptjs";
import UserSchemaModel from "./32_User.model_express.js";
import sendMail from "./32_nodeMailer.js";
import dotenv from "dotenv";
dotenv.config();

const ForgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // 1️⃣ check user exists
    const user = await UserSchemaModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found"
      });
    }

    // 2️⃣ generate new password
    const newPassword = Math.random().toString(36).slice(-8);

    // 3️⃣ hash password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 4️⃣ update in DB
    await UserSchemaModel.updateOne(
      { email: email.toLowerCase() },
      { $set: { password: hashedPassword } }
    );

    // 5️⃣ send email using your mailer
    await sendMail(email, user.name, "reset", newPassword);

    console.log("📧 Reset password email sent");

    res.status(200).json({
      status: true,
      message: "New password sent to your email"
    });

  } catch (error) {
    console.log("ForgetPassword Error:", error.message);
    res.status(500).json({
      status: false,
      message: "Server error"
    });
  }
};

export default ForgetPassword;