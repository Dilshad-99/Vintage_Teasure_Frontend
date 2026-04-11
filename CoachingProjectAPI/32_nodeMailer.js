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


// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();

// // ✅ Transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.NODEPASS,
//   },
// });

// // ❌ REMOVE verify from production (optional debug only)
// // transporter.verify((error, success) => {
// //   if (error) {
// //     console.log("❌ SMTP ERROR:", error);
// //   } else {
// //     console.log("✅ SMTP READY TO SEND MAIL");
// //   }
// // });



// const sendMail = async (email, name, type = "register") => {
//   try {
//     console.log("🔥 sendMail CALLED");
//     console.log("📧 EMAIL:", email);
//     console.log("🧾 TYPE:", type);

//     const info = await transporter.sendMail({
//       from: `"Vintage Treasure" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject:
//         type === "login"
//           ? "Login Alert - Vintage Treasure"
//           : "Welcome to Vintage Treasure",
//       html:
//         type === "login"
//           ? `<h2>Hello ${name}</h2><p>You just logged in ✔</p>`
//           : `<h2>Welcome ${name}</h2><p>Thanks for registering 🎉</p>`,
//     });

//     console.log("✅ MAIL SENT SUCCESSFULLY");
//     console.log("📩 RESPONSE:", info.response);

//   } catch (err) {
//     console.log("❌ MAIL ERROR:", err.message);
//   }
// };

// export default sendMail;





// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.NODEPASS,
//   },
// });

// transporter.verify((err, success) => {
//   if (err) {
//     console.log("❌ SMTP FAILED:", err.message);
//   } else {
//     console.log("✅ SMTP READY");
//   }
// });

// const sendMail = async (email, name, type = "register") => {
//   try {
//     const info = await transporter.sendMail({
//       from: `"Vintage Treasure" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: type === "login" ? "Login Alert" : "Welcome",
//       html: `<h2>Hello ${name}</h2><p>${type} successful</p>`
//     });

//     console.log("📧 EMAIL SENT:", info.response);

//   } catch (err) {
//     console.log("❌ MAIL ERROR:", err.message);
//   }
// };

// export default sendMail;


import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.NODEPASS,
  },
});

// ✔ check SMTP once at startup
transporter.verify((err) => {
  if (err) {
    console.log("❌ SMTP FAILED:", err.message);
  } else {
    console.log("✅ SMTP READY");
  }
});

/**
 * type:
 * register → welcome mail
 * login → login alert
 * reset → password reset mail
 */
const sendMail = async (email, name, type = "register", newPassword = null) => {
  try {
    let subject = "";
    let html = "";

    // 🔥 REGISTER
    if (type === "register") {
      subject = "Welcome to Vintage Treasure 🎉";
      html = `
        <h2>Hello ${name}</h2>
        <p>Thanks for registering on Vintage Treasure ✔</p>
      `;
    }

    // 🔥 LOGIN
    else if (type === "login") {
      subject = "Login Alert 🔐";
      html = `
        <h2>Hello ${name}</h2>
        <p>You just logged in to your account ✔</p>
      `;
    }

    // 🔥 RESET PASSWORD
    else if (type === "reset") {
      subject = "Password Reset 🔑";
      html = `
        <h2>Hello ${name}</h2>
        <p>Your new password is:</p>
        <h2 style="color:red">${newPassword}</h2>
        <p>Please login and change it immediately.</p>
      `;
    }

    const info = await transporter.sendMail({
      from: `"Vintage Treasure" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html,
    });

    console.log("📧 EMAIL SENT:", info.response);

  } catch (err) {
    console.log("❌ MAIL ERROR:", err.message);
  }
};

export default sendMail;