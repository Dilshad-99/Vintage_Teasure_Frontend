// import dotenv from 'dotenv';
// dotenv.config();

// import nodemailer from "nodemailer";

// function sendMail(email, password) {

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: "dilshad2307j@gmail.com",
//       pass: process.env.NODEPASS,
//     },
//   });

//   const mailOptions = {
//     from: 'dilshad2307j@gmail.com',
//     to: email,
//     subject: "Hello, verification email for Pawn Shop",
//     html: `<h1>Hello, Welcome to Pawn Shop</h1>
//            <p>You have successfully registered to our site.</p>
//            <h2>Your login credentials are attached below</h2>
//            <h4>User Email: ${email}</h4>
//            <h2>Click below to verify</h2>
//            <a href='http://localhost:3000/vemail/${email}'>Click to Verify Account</a>`,
//   };

//   transporter.sendMail(mailOptions, function(err, info) {
//     if (err)
//       console.log("Mail error:", err);
//     else
//       console.log("Email sent: " + info.response);
//   });
// }

// export default sendMail;

import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

function sendMail(email, name, type = "register") {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "dilshad2307j@gmail.com",
      pass: process.env.NODEPASS,
    },
  });

  let subject, html;

  if (type === "register") {
    subject = "Welcome to Vintage Treasure — Verify Your Email";
    html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background: #8B4513; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">🏺 Vintage Treasure</h1>
        </div>
        <div style="padding: 30px;">
          <h2>Hello, ${name}! 👋</h2>
          <p>Welcome to <strong>Vintage Treasure</strong> — your marketplace for timeless finds.</p>
          <p>Please verify your email to activate your account:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:3000/vemail/${email}" 
               style="background: #8B4513; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-size: 16px;">
              ✅ Verify My Account
            </a>
          </div>
          <p style="color: #888; font-size: 13px;">If you didn't register, please ignore this email.</p>
        </div>
      </div>
    `;
  } else if (type === "login") {
    subject = "New Login Detected — Vintage Treasure";
    html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background: #8B4513; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">🏺 Vintage Treasure</h1>
        </div>
        <div style="padding: 30px;">
          <h2>Hello, ${name}! 🔐</h2>
          <p>A new login was detected on your account.</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          <p>If this was you, no action needed. If not, please change your password immediately.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:3000/changepassword" 
               style="background: #c0392b; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-size: 16px;">
              🔒 Change Password
            </a>
          </div>
        </div>
      </div>
    `;
  }

  const mailOptions = {
    from: '"Vintage Treasure" <dilshad2307j@gmail.com>',
    to: email,
    subject,
    html,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log("Mail error:", err);
    else console.log(`[${type.toUpperCase()}] Email sent to ${email}:`, info.response);
  });
}

export default sendMail;