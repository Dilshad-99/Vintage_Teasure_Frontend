// // export const save=(req,res)=>{
// //  console.log(req.body);
// // }

// import sendMail from "./32_nodeMailer.js";
// import "./32_connection_express.js"; // Yeh line ek external file ko import kar rahi hai jo database connection setup kar rahi hogi (jaise MongoDB se connect hona). Yeh file generally DB connection logic ko handle karti hai, jaise ki mongoose connect karna, etc.

// import url from "url"; //Yeh line URL module ko import kar rahi hai. Iska use hum URL ko manipulate ya parse karne ke liye karte hain, jaise URL ke parts ko extract karna (hostname, pathname, search params, etc.). 

// import jwt from "jsonwebtoken"; // module used tyo generate random token value.which is used to track the user and to apply security at Application level.

// //Yeh line JWT (JSON Web Token) library ko import kar rahi hai. JWT ka use hum user authentication ke liye karte hain, matlab user ko login karne ke baad ek token generate karna, jo secure way mein user ki identity ko validate karta hai.

// import rs from "randomstring"; // Yeh line randomstring library ko import kar rahi hai. Iska use hum random strings generate karne ke liye karte hain. Jaise password, temporary tokens, ya koi unique identifier banane ke liye.

// //to link models to controller
// import UserSchemaModel from './32_User.model_express.js'; // Yeh line User schema model ko import kar rahi hai. Yeh schema database ka structure define karta hai. Matlab, jab hum user ka data store karenge, toh yeh schema decide karega ki kis type ka data store ho sakta hai (name, email, password, etc.).
// // import { send } from "process";

// // import bodyParser from "body-parser";

// export const save=async(req,res)=>{  // SAVE [OO0RRR] REGISTER.   // 
//  // Get the highest _id from database to avoid duplicates
//  const lastUser = await UserSchemaModel.find();
//  const l=lastUser.length;
//  const _id = l == 0?1:lastUser[l-1]._id+1;
// //  const _id=l==0?1:users[l-1]._id+1;
//  const userDetails={...req.body,"_id":_id,"status":0,"role":"user","info":Date()}; // Yeh line ek object bana rahi hai jisme naye user ke saare details honge. req.body se jo data aaya hai, usko spread operator ... ke through add kiya ja raha hai, aur saath mein _id, status, role, aur info bhi set kiya ja raha hai.

//  try{
//     await UserSchemaModel.create(userDetails);//Yeh block data ko database mein create aur save kar raha hai. Agar sab kuch sahi raha toh UserSchemaModel.create(userDetails) ke through user ko database mein save kar diya jayega. Phir, status code 201 ke saath success response diya jayega aur {"status": "OK"} return kiya jayega.
    
//     sendMail(userDetails.email, userDetails.password);

//     res.status(201).json({"status":"OK"});
//  }catch(error){
//     console.log("Registration Error:", error.message);
//     res.status(500).json({"status":false, "error": error.message});       
//  }
// };

// // Summary:

// // Is code ka main purpose naya user register karna hai. Yeh:

// // Pehle saare users ko fetch karta hai.

// // Fir naye user ka _id decide karta hai.

// // Uske baad user details ko ek object mein store karke database mein save karne ki koshish karta hai.

// // Agar save ho jata hai, toh success message send karta hai, aur agar error aata hai, toh error message send karta hai.

// //---------------------------------------------

// // export const save=async(req,res)=>{
// //   const users=await UserSchemaModel.find();
// //   const l=users.length;
// //   const _id=l=0?1:users[l-1]._id+1;
// //   const userDetails={...req.body,"id":_id,"info":Date(),"status":0,"role":"user"}
// //   try {
// //     await UserSchemaModel.create(userDetails);
// //     res.status(201).json({"status":"ok"})
// //   } catch (error) {
// //     res.status(500).json({"status":"false"})
// //   }
// // }

// // export const save1=async(req,res)=>{
// //   const users=await UserSchemaModel.find();
// //   const l=users.length;
// //   const _id=l==0?1:users[l-1]._id+1;
// //   const userDetails={...req.body,"_id":_id,"status":0,"role":"user","info":Date()};
// //   try {
// //     await UserSchemaModel.create(userDetails);
// //     res.status(201).json({"status":"ok"})
// //   } catch (error) {
// //     res.status(500).json({"status":"false"})
// //   }
// // }

// // export const login1=async(req,res)=>{
// //   var condition_obj={...req.body,"status":1};
// //   const userList=await UserSchemaModel.find(condition_obj);
// //   if(userList>0){
// //     const key=rs.generate(50);
// //     const payload=userList[0].email;
// //     const token=jwt.sign(key,payload);
// //     res.status(201).json({"token":token,"userDetails":userList[0]});
// //   }
// //   else{
// //     res.send(404).json({"status":"false"});
// //   }
// // }

// // export const fetch1=async(req,res)=>{
// //   var condition_obj=req.query.condition_obj;
// //   if(condition_obj!=undefined)
// //     condition_obj=JSON.parse(condition_obj);
// //     else
// //       condition_obj={};
// //   const user= await UserSchemaModel.findOne(condition_obj);
// //   if(user.length>0){
// //     res.status(201).json({"status":true,"info":user});
// //   }
// //   else{
// //     res.status(404).json({"status":"not found"});
// //   }
// // }

// // export const delete1=async(req,res)=>{
// //   const user=await UserSchemaModel.findOne(req.body)
// //   if(user){
// //     const userDetails = await UserSchemaModel.deleteOne(req.body);
// //     if(userDetails){
// //       res.status(201).json({"status":"ok"})
// //     }
// //     else{
// //       res.status(500).json({"status":false})
// //     }
// //   }else{
// //       res.status(404).json({"status":"user not found"});
// //   }
// // }



// // export const delete2=async(req,res)=>{
// //   try {
// //    const user = await UserSchemaModel.findOne(condition_obj);
// //    if (user) {
// //     const deleteuser=await UserSchemaModel.deleteOne(condition_obj);
// //     if(deleteUser){
// //       res.status(200).json({"status":"ok"});
// //     }
// //     else{
// //       res.status(500).json({"status":false});
// //     }
// //    }
// //    else{
// //     res.status(404).json({"status":"user not found"});
// //    }
// //   } catch (error) {
// //     res.status(500).json({"status":false})
// //   }
// // }

// // export const update2=async(req,res)=>{
// //   try {
// //    const user = await UserSchemaModel.findOne(JSON.parse(req.body.condition_obj));
// //    if (user) {
// //     const update = await UserSchemaModel.updateOne(JSON.parse(req.body.condition_obj),{$set: JSON.parse(req.body.content_obj)});
// //     if(update){
// //       res.status(200).json({"status":"ok"})
// //     }
// //     else{
// //       res.status(500).json({"status":false});
// //     }
// //    }
// //    else{
// //     res.status(404).json({"status":"user not founded"})
// //    }
// //   } catch (error) {
// //     res.status(500).json({"status":false});
// //   }
// // }















// // export const update1=async(req,res)=>{
// //   const user=await UserSchemaModel.find(req.body.condition_obj);
// //   if(user){
// //   const userDetails = await UserSchemaModel.updateMany(req.body.condition_obj,{$set:req.body.content_obj});
// //   if(userDetails){
// //     res.status(201).json({"status":"ok"})
// //   }
// //   else{
// //     res.status(500).json({"status":"false"})
// //   }
// //   }
// //   else{
// //     res.status(404).json({"status":"user not found"})
// //   }
// // }


// // export const save=async(req,res)=>{
// //   const users=await UserSchemaModel.find();
// //   const l=users.length;
// //   const _id=l==0?1:users[l-1]._id+1;
// //   const userDetails={...req.body,"_id":_id,"status":0,"role":"user","info":Date()};
// //   try {
// //     await UserSchemaModel.create(userDetails);
// //     res.status(201).json({"status":"ok"})
// //   } catch (error) {
// //     res.status(500).json({"status":"false"})
// //   }
// // }

// // export const login=async(req,res)=>{
// //   var condition_obj={...req.body,"status":1};
// // var userList=await UserSchemaModel.find(condition_obj);
// // if(userList.length!=0)
// //   {
// //    const payload=userList[0].email;
// //    const key=rs.generate(50);
// //    const token = jwt.sign(payload,key); 
// //  res.status(200).json({"token":token,"userDetails":userList[0]});
// //   }
// //   else
// //    res.status(500).json({"token":"error"});
// // };


// // export const fetch=async(req,res)=>{
// //    var condition_obj=req.query;  
// //    var userList=await UserSchemaModel.find(condition_obj);
// //    if(userList.length!=0)
// //      res.status(200).json(userList);
// //    else
// //      res.status(404).json({"status":"Resource not found"});    
// // };


// // export var deleteUser=async(req,res)=>{
// //    let userDetails = await UserSchemaModel.findOne(req.body);
// //    if(userDetails){
// //        let user=await UserSchemaModel.deleteOne(req.body);   
// //        if(user)
// //          res.status(200).json({"status":"OK"});
// //        else
// //          res.status(500).json({"status": "Server Error"});
// //    }
// //    else
// //      res.status(404).json({"status":"Requested resource not available"});
// // };  


// // export var update=async(req,res)=>{
// //    let userDetails = await UserSchemaModel.findOne(req.body.condition_obj);
// //    if(userDetails){
// //        let user=await UserSchemaModel.updateMany(req.body.condition_obj,{$set:req.body.content_obj});   
// //        if(user)
// //          res.status(200).json({"status":"OK"});
// //        else
// //          res.status(500).json({"status": "Server Error"});
// //    }
// //    else
// //      res.status(404).json({"status":"Requested resource not available"});    
// // };



// export const login=async(req,res)=>{
//   var userDetails={...req.body,"status":1}; // condition_obj ek object hai jo request body (req.body) se aata hai.

// // ...req.body: Yeh spread operator hai, jo request body ke sare fields ko condition_obj mein copy kar deta hai.

// // "status": 1: Isme status field ko manually 1 set kar rahe hain. Yeh condition ko indicate karta hai ki hum sirf un users ko check karenge jinka status 1 hai (matlab active users).

//   var userList=await UserSchemaModel.find(userDetails); // Yeh line UserSchemaModel.find(condition_obj) se database mein query bhej rahi hai, jisme hum active users ko search kar rahe hain. Yani, database mein status: 1 wale users ko find kar rahe hain jo req.body mein diye gaye fields match karte ho.

//   if(userList.length>0)
//   {
//    const payload=userList[0].email; // payload mein hum pehle user ka email le rahe hain (userList[0].email), jo userList ke first element mein store hota hai.

//    const key=rs.generate(20);
//    const token = jwt.sign(payload,key); //jwt.sign(payload, key): Yeh line jsonwebtoken ka signing function call kar rahi hai.

// // payload: Humne jo email extract kiya tha, woh ab payload ban gaya.

// // key: Yeh secret key hai jo humne randomly generate ki thi.
// // sign : sign method is used to generate the token , where it takes to parameter [payload , key]. payload=> user releted info (unique)
// // jwt.sign(): Yeh function ek JWT token generate karta hai, jisme payload (email) ko sign kiya jata hai aur secret key key ke saath token secure hota hai.

//    res.status(200).json({"token":token,"userDetails":userList[0]});
//   }
//   else
//    res.status(500).json({"token":"error"}); // Agar userList empty hai, matlab koi matching user nahi milta (ya status 1 ke saath koi user nahi hai), toh:

// // res.status(500): Server error ka status return ho raha hai (500 ka matlab server error ya invalid login).

// // json({ "token": "error" }): JSON response mein "token": "error" bheja ja raha hai, jo client ko indicate karta hai ki login failed hai.
// };

// //  Summary:

// // Login Flow:

// // Client se email/password ko request body se pick karna.

// // User ko active (status: 1) hone chahiye aur jo details match karti ho, un users ko database se fetch karna.

// // Agar user mil jata hai, toh email ko payload bana ke JWT token generate karna.

// // Secret key ke saath token ko sign karna aur client ko bhejna.

// // Agar user match nahi karta, toh 500 error ke saath response bhejna.

// // Is tarah se JWT ke through user ko authenticate kiya ja raha hai, aur har request ke saath yeh token validate kiya ja sakta hai.

// // -------------------------------------------



// export const fetch=async(req,res)=>{
//   var condition_obj=req.query; // url.parse(req.url, true): Yeh line request URL ko parse kar rahi hai.

// // req.url se humko poora URL milta hai jo client ne request kiya (for example: http://localhost:3000/api?condition_obj=somevalue).

// // url.parse(req.url, true): Second argument true ka matlab hai query parameters ko ek object mein convert karna, jo URL ke ?key=value format mein hote hain.

//   // if(condition_obj!=undefined)
//   //  condition_obj=JSON.parse(condition_obj);
//   // else
//   //  condition_obj={}; 
  
//   var userList=await UserSchemaModel.find(condition_obj); // await UserSchemaModel.find(condition_obj): Yeh line database se query bhej rahi hai.

// // UserSchemaModel.find(condition_obj): Yeh UserSchemaModel (user collection ka model) ko condition_obj ke according query bhejta hai. Agar condition_obj mein kuch fields hain (like {status: 1}), toh woh condition ke saath data fetch karega. Agar empty object {} hai, toh saare users ko fetch karega.

// // await: Yeh ensure karta hai ki hum database se data fetch hone tak wait karein. Jaise hi data aata hai, woh userList mein store ho jata hai.

// // For example, agar condition_obj mein {status: 1} diya gaya ho, toh only active users fetch honge (status 1 wale).


//   if(userList.length!=0)
//     res.status(200).json({"status":"true","userDetails":userList});
//   else
//     res.status(404).json({"status":"Resource not found"});    
//  };



// //  Summary of fetch function:

// // Request URL Parsing: Hum request URL se condition_obj query parameter ko parse kar rahe hain.

// // Handling condition_obj: Agar condition_obj query parameter diya gaya ho, toh usse JSON format mein parse karte hain. Agar na ho, toh empty object {} lete hain.

// // Database Query: UserSchemaModel.find(condition_obj) ke through database se users ko fetch karte hain. Agar koi condition di gayi ho ({status: 1}), toh sirf unhi users ko fetch karenge jo us condition ko match karte hain.

// // Response:

// // Agar users milte hain, toh unhe 200 OK ke saath response bhej dete hain.

// // Agar users nahi milte, toh 404 Not Found error message bhej dete hain.


// export var deleteUser=async(req,res)=>{
//   try {
//     let userDetails=await UserSchemaModel.findOne(req.body);//try { ... }: Hum try-catch block use kar rahe hain, jisme agar koi error hota hai toh usse catch karne ke liye.

// // JSON.parse(req.body.condition_obj): Yeh request body se condition_obj ko parse kar raha hai. condition_obj ek string form mein aata hai, toh hum usse JSON object mein convert kar rahe hain.

// // UserSchemaModel.findOne(...): Yeh query MongoDB mein execute hoti hai. findOne method ek single document ko fetch karne ke liye use hota hai jo diye gaye condition (condition_obj) ke match karta ho. Agar koi user milta hai, toh userDetails mein uska data store hota hai.

// // Example:
// // If the condition_obj is something like:

// // {"_id": 5}


// //The code would search for a user with _id: 5.

//     if(userDetails)//if (userDetails): Yeh check kar raha hai ki userDetails object exist karta hai ya nahi. Agar user found hota hai, toh condition true ho jayegi aur hum usko delete karne ki koshish karenge.

//       {
//       var user=await UserSchemaModel.deleteOne(req.body);// UserSchemaModel.deleteOne(...): Yeh line findOne ke opposite hai. deleteOne ek document ko delete karta hai jo condition_obj se match kare.

// // Agar condition (jaise {_id: 5}) match karta hai, toh woh user record delete ho jayega.

// // await: Yeh deleteOne operation ko asynchronous bana raha hai, matlab hum wait karenge jab tak delete operation complete nahi ho jata.

// // user: Agar delete operation successful hota hai, toh user object contain karega result. Agar delete nahi ho pata (server issue, or any other problem), toh user empty hoga.

//       if(user){
//         res.status(200).json({"status":"ok"})//if (user): Agar user object present hai (i.e., delete operation successful raha), toh hum:

// // res.status(200).json({ "status": "ok" }): 200 OK response return kar rahe hain, jo batata hai ki delete operation successful tha.

// // else: Agar user object empty hai, jo indicate karta hai ki delete operation mein kuch problem aayi, toh:

// // res.status(500).json({ "status": "server issue" }): Hum server error ka response bhej rahe hain, indicating kuch server-side issue hua hai.

//       }
//       else{
//         res.status(500).json({"status":"server issue"})
//       }
//     }
//     else{
//       res.status(400).json({"status":"user not founded"})
//     }
//   } catch (error) {
//     res.status(500).json({"status":false});
//   }
// }

// // Summary of deleteUser Function:

// // Request Parsing:

// // Condition: Request body mein condition_obj diya gaya hota hai, jisme user ko delete karne ke liye conditions define hoti hain.

// // JSON parsing: Is condition ko JSON object mein convert kar ke database mein search kiya jata hai.

// // Finding User:

// // UserSchemaModel.findOne(...) se database mein matching user search karte hain.

// // Deleting User:

// // Agar user milta hai, toh deleteOne method se usko database se delete karte hain.

// // Responses:

// // If user found and deleted: 200 OK response with "status": "ok".

// // If user not found: 400 Bad Request with "status": "user not found".

// // If deletion fails due to server issue: 500 Internal Server Error with "status": "server issue".

// // Catch Block: If there is an error (e.g., invalid data or database issue), 500 is returned.


// // ----------------------------------------------------------------------------------------------------------------

// export var update=async(req,res)=>{
//   try{
//     // console.log("Update request body:", req.body);
//     let userDetails = await UserSchemaModel.findOne(req.body.condition_obj);
//     if(userDetails){
//       let user=await UserSchemaModel.updateMany(req.body.condition_obj, {$set: req.body.content_obj});   
//       if(user)
//         res.status(200).json({"status":"OK"});
//       else
//         res.status(500).json({"status": "Server Error"});
//     }
//     else
//       res.status(404).json({"status":"Requested resource not available"});
//   }catch(error){
//     // console.log("Update error:", error);
//     res.status(500).json({"status":false});        
//   };
// };
// // export const save=(req,res)=>{
// //  console.log(req.body);
// // }

// // import sendMail from "./32_nodeMailer.js";
// // import "./32_connection_express.js"; // Yeh line ek external file ko import kar rahi hai jo database connection setup kar rahi hogi (jaise MongoDB se connect hona). Yeh file generally DB connection logic ko handle karti hai, jaise ki mongoose connect karna, etc.

// // import url from "url"; //Yeh line URL module ko import kar rahi hai. Iska use hum URL ko manipulate ya parse karne ke liye karte hain, jaise URL ke parts ko extract karna (hostname, pathname, search params, etc.). 

// // import jwt from "jsonwebtoken"; // module used tyo generate random token value.which is used to track the user and to apply security at Application level.

// // //Yeh line JWT (JSON Web Token) library ko import kar rahi hai. JWT ka use hum user authentication ke liye karte hain, matlab user ko login karne ke baad ek token generate karna, jo secure way mein user ki identity ko validate karta hai.

// // import rs from "randomstring"; // Yeh line randomstring library ko import kar rahi hai. Iska use hum random strings generate karne ke liye karte hain. Jaise password, temporary tokens, ya koi unique identifier banane ke liye.

// // //to link models to controller
// // import UserSchemaModel from './32_User.model_express.js'; // Yeh line User schema model ko import kar rahi hai. Yeh schema database ka structure define karta hai. Matlab, jab hum user ka data store karenge, toh yeh schema decide karega ki kis type ka data store ho sakta hai (name, email, password, etc.).
// // // import { send } from "process";

// // // import bodyParser from "body-parser";

// // export const save=async(req,res)=>{  // SAVE [OO0RRR] REGISTER.   // 
// //  // Get the highest _id from database to avoid duplicates
// //  const lastUser = await UserSchemaModel.find();
// //  const l=lastUser.length;
// //  const _id = l == 0?1:lastUser[l-1]._id+1;
// // //  const _id=l==0?1:users[l-1]._id+1;
// //  const userDetails={...req.body,"_id":_id,"status":0,"role":"user","info":Date()}; // Yeh line ek object bana rahi hai jisme naye user ke saare details honge. req.body se jo data aaya hai, usko spread operator ... ke through add kiya ja raha hai, aur saath mein _id, status, role, aur info bhi set kiya ja raha hai.

// //  try{
// //     await UserSchemaModel.create(userDetails);//Yeh block data ko database mein create aur save kar raha hai. Agar sab kuch sahi raha toh UserSchemaModel.create(userDetails) ke through user ko database mein save kar diya jayega. Phir, status code 201 ke saath success response diya jayega aur {"status": "OK"} return kiya jayega.
    
// //     sendMail(userDetails.email, userDetails.password);

// //     res.status(201).json({"status":"OK"});
// //  }catch(error){
// //     console.log("Registration Error:", error.message);
// //     res.status(500).json({"status":false, "error": error.message});       
// //  }
// // };

// // // Summary:

// // // Is code ka main purpose naya user register karna hai. Yeh:

// // // Pehle saare users ko fetch karta hai.

// // // Fir naye user ka _id decide karta hai.

// // // Uske baad user details ko ek object mein store karke database mein save karne ki koshish karta hai.

// // // Agar save ho jata hai, toh success message send karta hai, aur agar error aata hai, toh error message send karta hai.

// // //---------------------------------------------

// // // export const save=async(req,res)=>{
// // //   const users=await UserSchemaModel.find();
// // //   const l=users.length;
// // //   const _id=l=0?1:users[l-1]._id+1;
// // //   const userDetails={...req.body,"id":_id,"info":Date(),"status":0,"role":"user"}
// // //   try {
// // //     await UserSchemaModel.create(userDetails);
// // //     res.status(201).json({"status":"ok"})
// // //   } catch (error) {
// // //     res.status(500).json({"status":"false"})
// // //   }
// // // }

// // // export const save1=async(req,res)=>{
// // //   const users=await UserSchemaModel.find();
// // //   const l=users.length;
// // //   const _id=l==0?1:users[l-1]._id+1;
// // //   const userDetails={...req.body,"_id":_id,"status":0,"role":"user","info":Date()};
// // //   try {
// // //     await UserSchemaModel.create(userDetails);
// // //     res.status(201).json({"status":"ok"})
// // //   } catch (error) {
// // //     res.status(500).json({"status":"false"})
// // //   }
// // // }

// // // export const login1=async(req,res)=>{
// // //   var condition_obj={...req.body,"status":1};
// // //   const userList=await UserSchemaModel.find(condition_obj);
// // //   if(userList>0){
// // //     const key=rs.generate(50);
// // //     const payload=userList[0].email;
// // //     const token=jwt.sign(key,payload);
// // //     res.status(201).json({"token":token,"userDetails":userList[0]});
// // //   }
// // //   else{
// // //     res.send(404).json({"status":"false"});
// // //   }
// // // }

// // // export const fetch1=async(req,res)=>{
// // //   var condition_obj=req.query.condition_obj;
// // //   if(condition_obj!=undefined)
// // //     condition_obj=JSON.parse(condition_obj);
// // //     else
// // //       condition_obj={};
// // //   const user= await UserSchemaModel.findOne(condition_obj);
// // //   if(user.length>0){
// // //     res.status(201).json({"status":true,"info":user});
// // //   }
// // //   else{
// // //     res.status(404).json({"status":"not found"});
// // //   }
// // // }

// // // export const delete1=async(req,res)=>{
// // //   const user=await UserSchemaModel.findOne(req.body)
// // //   if(user){
// // //     const userDetails = await UserSchemaModel.deleteOne(req.body);
// // //     if(userDetails){
// // //       res.status(201).json({"status":"ok"})
// // //     }
// // //     else{
// // //       res.status(500).json({"status":false})
// // //     }
// // //   }else{
// // //       res.status(404).json({"status":"user not found"});
// // //   }
// // // }



// // // export const delete2=async(req,res)=>{
// // //   try {
// // //    const user = await UserSchemaModel.findOne(condition_obj);
// // //    if (user) {
// // //     const deleteuser=await UserSchemaModel.deleteOne(condition_obj);
// // //     if(deleteUser){
// // //       res.status(200).json({"status":"ok"});
// // //     }
// // //     else{
// // //       res.status(500).json({"status":false});
// // //     }
// // //    }
// // //    else{
// // //     res.status(404).json({"status":"user not found"});
// // //    }
// // //   } catch (error) {
// // //     res.status(500).json({"status":false})
// // //   }
// // // }

// // // export const update2=async(req,res)=>{
// // //   try {
// // //    const user = await UserSchemaModel.findOne(JSON.parse(req.body.condition_obj));
// // //    if (user) {
// // //     const update = await UserSchemaModel.updateOne(JSON.parse(req.body.condition_obj),{$set: JSON.parse(req.body.content_obj)});
// // //     if(update){
// // //       res.status(200).json({"status":"ok"})
// // //     }
// // //     else{
// // //       res.status(500).json({"status":false});
// // //     }
// // //    }
// // //    else{
// // //     res.status(404).json({"status":"user not founded"})
// // //    }
// // //   } catch (error) {
// // //     res.status(500).json({"status":false});
// // //   }
// // // }















// // // export const update1=async(req,res)=>{
// // //   const user=await UserSchemaModel.find(req.body.condition_obj);
// // //   if(user){
// // //   const userDetails = await UserSchemaModel.updateMany(req.body.condition_obj,{$set:req.body.content_obj});
// // //   if(userDetails){
// // //     res.status(201).json({"status":"ok"})
// // //   }
// // //   else{
// // //     res.status(500).json({"status":"false"})
// // //   }
// // //   }
// // //   else{
// // //     res.status(404).json({"status":"user not found"})
// // //   }
// // // }


// // // export const save=async(req,res)=>{
// // //   const users=await UserSchemaModel.find();
// // //   const l=users.length;
// // //   const _id=l==0?1:users[l-1]._id+1;
// // //   const userDetails={...req.body,"_id":_id,"status":0,"role":"user","info":Date()};
// // //   try {
// // //     await UserSchemaModel.create(userDetails);
// // //     res.status(201).json({"status":"ok"})
// // //   } catch (error) {
// // //     res.status(500).json({"status":"false"})
// // //   }
// // // }

// // // export const login=async(req,res)=>{
// // //   var condition_obj={...req.body,"status":1};
// // // var userList=await UserSchemaModel.find(condition_obj);
// // // if(userList.length!=0)
// // //   {
// // //    const payload=userList[0].email;
// // //    const key=rs.generate(50);
// // //    const token = jwt.sign(payload,key); 
// // //  res.status(200).json({"token":token,"userDetails":userList[0]});
// // //   }
// // //   else
// // //    res.status(500).json({"token":"error"});
// // // };


// // // export const fetch=async(req,res)=>{
// // //    var condition_obj=req.query;  
// // //    var userList=await UserSchemaModel.find(condition_obj);
// // //    if(userList.length!=0)
// // //      res.status(200).json(userList);
// // //    else
// // //      res.status(404).json({"status":"Resource not found"});    
// // // };


// // // export var deleteUser=async(req,res)=>{
// // //    let userDetails = await UserSchemaModel.findOne(req.body);
// // //    if(userDetails){
// // //        let user=await UserSchemaModel.deleteOne(req.body);   
// // //        if(user)
// // //          res.status(200).json({"status":"OK"});
// // //        else
// // //          res.status(500).json({"status": "Server Error"});
// // //    }
// // //    else
// // //      res.status(404).json({"status":"Requested resource not available"});
// // // };  


// // // export var update=async(req,res)=>{
// // //    let userDetails = await UserSchemaModel.findOne(req.body.condition_obj);
// // //    if(userDetails){
// // //        let user=await UserSchemaModel.updateMany(req.body.condition_obj,{$set:req.body.content_obj});   
// // //        if(user)
// // //          res.status(200).json({"status":"OK"});
// // //        else
// // //          res.status(500).json({"status": "Server Error"});
// // //    }
// // //    else
// // //      res.status(404).json({"status":"Requested resource not available"});    
// // // };



// // export const login=async(req,res)=>{
// //   var userDetails={...req.body,"status":1}; // condition_obj ek object hai jo request body (req.body) se aata hai.

// // // ...req.body: Yeh spread operator hai, jo request body ke sare fields ko condition_obj mein copy kar deta hai.

// // // "status": 1: Isme status field ko manually 1 set kar rahe hain. Yeh condition ko indicate karta hai ki hum sirf un users ko check karenge jinka status 1 hai (matlab active users).

// //   var userList=await UserSchemaModel.find(userDetails); // Yeh line UserSchemaModel.find(condition_obj) se database mein query bhej rahi hai, jisme hum active users ko search kar rahe hain. Yani, database mein status: 1 wale users ko find kar rahe hain jo req.body mein diye gaye fields match karte ho.

// //   if(userList.length>0)
// //   {
// //    const payload=userList[0].email; // payload mein hum pehle user ka email le rahe hain (userList[0].email), jo userList ke first element mein store hota hai.

// //    const key=rs.generate(20);
// //    const token = jwt.sign(payload,key); //jwt.sign(payload, key): Yeh line jsonwebtoken ka signing function call kar rahi hai.

// // // payload: Humne jo email extract kiya tha, woh ab payload ban gaya.

// // // key: Yeh secret key hai jo humne randomly generate ki thi.
// // // sign : sign method is used to generate the token , where it takes to parameter [payload , key]. payload=> user releted info (unique)
// // // jwt.sign(): Yeh function ek JWT token generate karta hai, jisme payload (email) ko sign kiya jata hai aur secret key key ke saath token secure hota hai.

// //    res.status(200).json({"token":token,"userDetails":userList[0]});
// //   }
// //   else
// //    res.status(500).json({"token":"error"}); // Agar userList empty hai, matlab koi matching user nahi milta (ya status 1 ke saath koi user nahi hai), toh:

// // // res.status(500): Server error ka status return ho raha hai (500 ka matlab server error ya invalid login).

// // // json({ "token": "error" }): JSON response mein "token": "error" bheja ja raha hai, jo client ko indicate karta hai ki login failed hai.
// // };

// // //  Summary:

// // // Login Flow:

// // // Client se email/password ko request body se pick karna.

// // // User ko active (status: 1) hone chahiye aur jo details match karti ho, un users ko database se fetch karna.

// // // Agar user mil jata hai, toh email ko payload bana ke JWT token generate karna.

// // // Secret key ke saath token ko sign karna aur client ko bhejna.

// // // Agar user match nahi karta, toh 500 error ke saath response bhejna.

// // // Is tarah se JWT ke through user ko authenticate kiya ja raha hai, aur har request ke saath yeh token validate kiya ja sakta hai.

// // // -------------------------------------------



// // export const fetch=async(req,res)=>{
// //   var condition_obj=req.query; // url.parse(req.url, true): Yeh line request URL ko parse kar rahi hai.

// // // req.url se humko poora URL milta hai jo client ne request kiya (for example: http://localhost:3000/api?condition_obj=somevalue).

// // // url.parse(req.url, true): Second argument true ka matlab hai query parameters ko ek object mein convert karna, jo URL ke ?key=value format mein hote hain.

// //   // if(condition_obj!=undefined)
// //   //  condition_obj=JSON.parse(condition_obj);
// //   // else
// //   //  condition_obj={}; 
  
// //   var userList=await UserSchemaModel.find(condition_obj); // await UserSchemaModel.find(condition_obj): Yeh line database se query bhej rahi hai.

// // // UserSchemaModel.find(condition_obj): Yeh UserSchemaModel (user collection ka model) ko condition_obj ke according query bhejta hai. Agar condition_obj mein kuch fields hain (like {status: 1}), toh woh condition ke saath data fetch karega. Agar empty object {} hai, toh saare users ko fetch karega.

// // // await: Yeh ensure karta hai ki hum database se data fetch hone tak wait karein. Jaise hi data aata hai, woh userList mein store ho jata hai.

// // // For example, agar condition_obj mein {status: 1} diya gaya ho, toh only active users fetch honge (status 1 wale).


// //   if(userList.length!=0)
// //     res.status(200).json({"status":"true","userDetails":userList});
// //   else
// //     res.status(404).json({"status":"Resource not found"});    
// //  };



// // //  Summary of fetch function:

// // // Request URL Parsing: Hum request URL se condition_obj query parameter ko parse kar rahe hain.

// // // Handling condition_obj: Agar condition_obj query parameter diya gaya ho, toh usse JSON format mein parse karte hain. Agar na ho, toh empty object {} lete hain.

// // // Database Query: UserSchemaModel.find(condition_obj) ke through database se users ko fetch karte hain. Agar koi condition di gayi ho ({status: 1}), toh sirf unhi users ko fetch karenge jo us condition ko match karte hain.

// // // Response:

// // // Agar users milte hain, toh unhe 200 OK ke saath response bhej dete hain.

// // // Agar users nahi milte, toh 404 Not Found error message bhej dete hain.


// // export var deleteUser=async(req,res)=>{
// //   try {
// //     let userDetails=await UserSchemaModel.findOne(req.body);//try { ... }: Hum try-catch block use kar rahe hain, jisme agar koi error hota hai toh usse catch karne ke liye.

// // // JSON.parse(req.body.condition_obj): Yeh request body se condition_obj ko parse kar raha hai. condition_obj ek string form mein aata hai, toh hum usse JSON object mein convert kar rahe hain.

// // // UserSchemaModel.findOne(...): Yeh query MongoDB mein execute hoti hai. findOne method ek single document ko fetch karne ke liye use hota hai jo diye gaye condition (condition_obj) ke match karta ho. Agar koi user milta hai, toh userDetails mein uska data store hota hai.

// // // Example:
// // // If the condition_obj is something like:

// // // {"_id": 5}


// // //The code would search for a user with _id: 5.

// //     if(userDetails)//if (userDetails): Yeh check kar raha hai ki userDetails object exist karta hai ya nahi. Agar user found hota hai, toh condition true ho jayegi aur hum usko delete karne ki koshish karenge.

// //       {
// //       var user=await UserSchemaModel.deleteOne(req.body);// UserSchemaModel.deleteOne(...): Yeh line findOne ke opposite hai. deleteOne ek document ko delete karta hai jo condition_obj se match kare.

// // // Agar condition (jaise {_id: 5}) match karta hai, toh woh user record delete ho jayega.

// // // await: Yeh deleteOne operation ko asynchronous bana raha hai, matlab hum wait karenge jab tak delete operation complete nahi ho jata.

// // // user: Agar delete operation successful hota hai, toh user object contain karega result. Agar delete nahi ho pata (server issue, or any other problem), toh user empty hoga.

// //       if(user){
// //         res.status(200).json({"status":"ok"})//if (user): Agar user object present hai (i.e., delete operation successful raha), toh hum:

// // // res.status(200).json({ "status": "ok" }): 200 OK response return kar rahe hain, jo batata hai ki delete operation successful tha.

// // // else: Agar user object empty hai, jo indicate karta hai ki delete operation mein kuch problem aayi, toh:

// // // res.status(500).json({ "status": "server issue" }): Hum server error ka response bhej rahe hain, indicating kuch server-side issue hua hai.

// //       }
// //       else{
// //         res.status(500).json({"status":"server issue"})
// //       }
// //     }
// //     else{
// //       res.status(400).json({"status":"user not founded"})
// //     }
// //   } catch (error) {
// //     res.status(500).json({"status":false});
// //   }
// // }

// // // Summary of deleteUser Function:

// // // Request Parsing:

// // // Condition: Request body mein condition_obj diya gaya hota hai, jisme user ko delete karne ke liye conditions define hoti hain.

// // // JSON parsing: Is condition ko JSON object mein convert kar ke database mein search kiya jata hai.

// // // Finding User:

// // // UserSchemaModel.findOne(...) se database mein matching user search karte hain.

// // // Deleting User:

// // // Agar user milta hai, toh deleteOne method se usko database se delete karte hain.

// // // Responses:

// // // If user found and deleted: 200 OK response with "status": "ok".

// // // If user not found: 400 Bad Request with "status": "user not found".

// // // If deletion fails due to server issue: 500 Internal Server Error with "status": "server issue".

// // // Catch Block: If there is an error (e.g., invalid data or database issue), 500 is returned.


// // // ----------------------------------------------------------------------------------------------------------------

// // export var update=async(req,res)=>{
// //   try{
// //     // console.log("Update request body:", req.body);
// //     let userDetails = await UserSchemaModel.findOne(req.body.condition_obj);
// //     if(userDetails){
// //       let user=await UserSchemaModel.updateMany(req.body.condition_obj, {$set: req.body.content_obj});   
// //       if(user)
// //         res.status(200).json({"status":"OK"});
// //       else
// //         res.status(500).json({"status": "Server Error"});
// //     }
// //     else
// //       res.status(404).json({"status":"Requested resource not available"});
// //   }catch(error){
// //     // console.log("Update error:", error);
// //     res.status(500).json({"status":false});        
// //   };
// // };

// import dotenv from 'dotenv';
// dotenv.config();

// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import sendMail from "./32_nodeMailer.js";
// import "./32_connection_express.js";
// import UserSchemaModel from './32_User.model_express.js';

// const JWT_SECRET = process.env.JWT_SECRET || "vintage_treasure_secret";

// // ─────────────────────────────────────────
// // REGISTER
// // ─────────────────────────────────────────
// export const save = async (req, res) => {
//   try {
//     const lastUser = await UserSchemaModel.find().sort({ _id: -1 }).limit(1);
//     const _id = lastUser.length === 0 ? 1 : lastUser[0]._id + 1;

//     const hashedPassword = await bcrypt.hash(req.body.password, 10);

//     const userDetails = {
//       ...req.body,
//       _id,
//       password: hashedPassword,
//       status: 0,
//       role: "user",
//       info: Date()
//     };

//     await UserSchemaModel.create(userDetails);
//     sendMail(userDetails.email, userDetails.name, "register");

//     res.status(201).json({ status: "OK", message: "Registered! Please verify your email." });

//   } catch (error) {
//     console.log("Registration Error:", error.message);
//     res.status(500).json({ status: false, error: error.message });
//   }
// };

// // ─────────────────────────────────────────
// // LOGIN (with captcha verify)
// // ─────────────────────────────────────────
// export const login = async (req, res) => {
//   try {
//     const { email, password, captcha } = req.body;

//     // 1. Verify captcha
//     const captchaRes = await fetch(
//       `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.REACT_RECAPTCHA_SECRET_KEY}&response=${captcha}`,
//       { method: 'POST' }
//     );
//     const captchaData = await captchaRes.json();

//     if (!captchaData.success) {
//       return res.status(400).json({ token: "error", message: "Captcha verification failed" });
//     }

//     // 2. Find user
//     const user = await UserSchemaModel.findOne({ email: email.toLowerCase() });

//     if (!user) {
//       return res.status(404).json({ token: "error", message: "User not found" });
//     }

//     if (user.status !== 1) {
//       return res.status(403).json({ token: "error", message: "Please verify your email first" });
//     }

//     // 3. Check password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ token: "error", message: "Invalid credentials" });
//     }

//     // 4. Generate token
//     const token = jwt.sign(
//       { _id: user._id, email: user.email, role: user.role },
//       JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     sendMail(user.email, user.name, "login");

//     res.status(200).json({ token, userDetails: user });

//   } catch (error) {
//     console.log("Login Error:", error.message);
//     res.status(500).json({ token: "error", message: "Server error" });
//   }
// };

// // ─────────────────────────────────────────
// // VERIFY EMAIL
// // ─────────────────────────────────────────
// export const verifyEmail = async (req, res) => {
//   try {
//     const { email } = req.params;

//     const user = await UserSchemaModel.findOne({ email: email.toLowerCase() });

//     if (!user) {
//       return res.status(404).json({ status: false, message: "User not found" });
//     }

//     if (user.status === 1) {
//       return res.status(200).json({ status: true, message: "Already verified" });
//     }

//     await UserSchemaModel.updateOne(
//       { email: email.toLowerCase() },
//       { $set: { status: 1 } }
//     );

//     res.status(200).json({ status: true, message: "Email verified successfully!" });

//   } catch (error) {
//     res.status(500).json({ status: false, error: error.message });
//   }
// };

// // ─────────────────────────────────────────
// // FETCH
// // ─────────────────────────────────────────
// export const fetch = async (req, res) => {
//   try {
//     const userList = await UserSchemaModel.find(req.query);
//     if (userList.length !== 0)
//       res.status(200).json({ status: true, userDetails: userList });
//     else
//       res.status(404).json({ status: false, message: "Resource not found" });
//   } catch (error) {
//     res.status(500).json({ status: false });
//   }
// };

// // ─────────────────────────────────────────
// // DELETE
// // ─────────────────────────────────────────
// export var deleteUser = async (req, res) => {
//   try {
//     const userDetails = await UserSchemaModel.findOne(req.body);
//     if (userDetails) {
//       await UserSchemaModel.deleteOne(req.body);
//       res.status(200).json({ status: "ok" });
//     } else {
//       res.status(400).json({ status: "user not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ status: false });
//   }
// };

// // ─────────────────────────────────────────
// // UPDATE
// // ─────────────────────────────────────────
// export var update = async (req, res) => {
//   try {
//     const userDetails = await UserSchemaModel.findOne(req.body.condition_obj);
//     if (userDetails) {
//       await UserSchemaModel.updateMany(
//         req.body.condition_obj,
//         { $set: req.body.content_obj }
//       );
//       res.status(200).json({ status: "OK" });
//     } else {
//       res.status(404).json({ status: "Requested resource not available" });
//     }
//   } catch (error) {
//     res.status(500).json({ status: false });
//   }
// };

// // ─────────────────────────────────────────
// // CHANGE PASSWORD
// // ─────────────────────────────────────────
// export const changePassword = async (req, res) => {
//   try {
//     const { email, oldPassword, newPassword } = req.body;

//     const user = await UserSchemaModel.findOne({ email: email.toLowerCase() });

//     if (!user) {
//       return res.status(404).json({ status: false, message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(oldPassword, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ status: false, message: "Current password is incorrect" });
//     }

//     const hashedNew = await bcrypt.hash(newPassword, 10);

//     await UserSchemaModel.updateOne(
//       { email: email.toLowerCase() },
//       { $set: { password: hashedNew } }
//     );

//     res.status(200).json({ status: true, message: "Password changed successfully" });

//   } catch (error) {
//     console.log("ChangePassword Error:", error.message);
//     res.status(500).json({ status: false, error: error.message });
//   }
// };




import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendMail from "./32_nodeMailer.js";
import "./32_connection_express.js";
import UserSchemaModel from './32_User.model_express.js';

const JWT_SECRET = process.env.JWT_SECRET || "vintage_treasure_secret";

export const save = async (req, res) => {
  try {
    const lastUser = await UserSchemaModel.find().sort({ _id: -1 }).limit(1);
    const _id = lastUser.length === 0 ? 1 : lastUser[0]._id + 1;

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const userDetails = {
      ...req.body,
      _id,
      password: hashedPassword,
      status: 0,
      role: "user",
      info: Date()
    };

    await UserSchemaModel.create(userDetails);

    console.log("✅ USER CREATED");

    await sendMail(userDetails.email, userDetails.name, "register");
    console.log("📧 REGISTER MAIL SENT");
    res.status(201).json({ status: "OK", message: "Registered! Please verify your email." });
const result = await UserSchemaModel.create(userDetails);
console.log("✅ USER SAVED:", result);
  } catch (error) {
    console.log("Registration Error:", error.message);
    res.status(500).json({ status: false, error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserSchemaModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("✅ LOGIN SUCCESS");

    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    console.log("STEP 1");
    // ✅ MAIL ONLY AFTER SUCCESS LOGIN
    await sendMail(user.email, user.name, "login");
console.log("STEP 2");
    console.log("📧 LOGIN MAIL SENT");

    res.status(200).json({ token, userDetails: user });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await UserSchemaModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }
    if (user.status === 1) {
      return res.status(200).json({ status: true, message: "Already verified" });
    }

    await UserSchemaModel.updateOne(
      { email: email.toLowerCase() },
      { $set: { status: 1 } }
    );

    res.status(200).json({ status: true, message: "Email verified successfully!" });

  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

export const fetch = async (req, res) => {
  try {
    const userList = await UserSchemaModel.find(req.query);
    if (userList.length !== 0)
      res.status(200).json({ status: true, userDetails: userList });
    else
      res.status(404).json({ status: false, message: "Resource not found" });
  } catch (error) {
    res.status(500).json({ status: false });
  }
};

export var deleteUser = async (req, res) => {
  try {
    const userDetails = await UserSchemaModel.findOne(req.body);
    if (userDetails) {
      await UserSchemaModel.deleteOne(req.body);
      res.status(200).json({ status: "ok" });
    } else {
      res.status(400).json({ status: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ status: false });
  }
};

export var update = async (req, res) => {
  try {
    const userDetails = await UserSchemaModel.findOne(req.body.condition_obj);
    if (userDetails) {
      await UserSchemaModel.updateMany(
        req.body.condition_obj,
        { $set: req.body.content_obj }
      );
      res.status(200).json({ status: "OK" });
    } else {
      res.status(404).json({ status: "Requested resource not available" });
    }
  } catch (error) {
    res.status(500).json({ status: false });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const user = await UserSchemaModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: false, message: "Current password is incorrect" });
    }

    const hashedNew = await bcrypt.hash(newPassword, 10);
    await UserSchemaModel.updateOne(
      { email: email.toLowerCase() },
      { $set: { password: hashedNew } }
    );

    res.status(200).json({ status: true, message: "Password changed successfully" });

  } catch (error) {
    console.log("ChangePassword Error:", error.message);
    res.status(500).json({ status: false, error: error.message });
  }
};