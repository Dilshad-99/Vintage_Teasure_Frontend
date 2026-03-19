import nodemailer from 'nodemailer';

const ForgetPassword=(req,res)=>{
 const email=req.body.email;
 let transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
     user: 'dilshad2307j@gmail.com',
     pass: 'jnusjlrcvxewpwiz'
   }
 });

 let mailOptions = {
   from: 'dilshad2307j@gmail.com',
   to: email,
   subject: 'Link For ForgetPassword PawnShop',
   html: "<h1>Welcome to pawnshop</h1><h2>your link to reset password is attached below</h2><h2>Click on the link below to reset password</h2><a href='http://localhost:3000/resetpassword/"+email+"'>Click to reset password</a>"
 };

transporter.sendMail(mailOptions, function(error, userDetails){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + userDetails.response);
  }
});
}
export default ForgetPassword;