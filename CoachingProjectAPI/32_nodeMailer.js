import nodemailer from "nodemailer";

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.

function sendMail(email,password)
{
const transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
  user: "dilshad2307j@gmail.com",
  pass: "jnusjlrcvxewpwiz",  // Your 16-char app password here
},
});

const mailOptions = {
  from: 'dilshad2307j@gmail.com',
  to: email,
  subject: "Hello , verification email for Pawn Shop",
  html: "<h1>Hello, Welcome to Pawn Shop</h1><p>You have successfully registered to our site.</p><h2>Your login credentials are attached below</h2><h4>User Email: "+email+"</h4><h2>Click below to verify</h2><a href='http://localhost:3000/vemail/"+email+"'>Click to Verify Account</a>",
};

transporter.sendMail(mailOptions, function(err,info){
  if(err){
    console.log(err);
  }
  else{
    console.log("Email sent : " + info.response);
    
  }
})
};

export default sendMail;