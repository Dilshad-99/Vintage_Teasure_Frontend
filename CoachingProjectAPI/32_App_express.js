// import express from 'express';
// import bodyParser from 'body-parser';

// const app = express();   

// //to link routers
// import UserRouter from './routes/user.router.js';

// //configuration to fetch req body content : body parser middleware
// //used to fetch req data from methods like : POST , PUT , PATCH , DELETE
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));

// //config to load routers
// app.use("/user",UserRouter);

// app.listen(3001);
// console.log("server invoked at link http://localhost:3001");

// import express from 'express'; // Yeh line express module ko import kar rahi hai. Express ek framework hai Node.js me Iska use hum server banane ke liye karte hain.
// import bodyParser from "body-parser"; // Yeh line body-parser ko import kar rahi hai. Body-parser ek middleware hai jo HTTP request ke body ko read karne mein help karta hai, jaise form data ya JSON data.

// const app=express(); // Yeh line ek express app bana rahi hai. Jab hum express() call karte hain, yeh ek instance bana deta hai jo humare web server ko handle karega.

// import userRouter from "./32_user.Router_express.js"; // Yeh line ek external file ko import kar rahi hai jisme userRouter defined hai.

// app.use(bodyParser.json());// Yeh line batati hai ki hum body-parser ka use karenge taaki jo bhi data server ko request ke through mile (JSON format mein), woh easily parse ho sake. Matlab, JSON data ko samajhna aur usko use karna asaan ho jayega.
// app.use(bodyParser.urlencoded({extended:true})); // use = middleware  // Yeh line body-parser ko ek aur tareeke se use kar rahi hai, taaki agar koi form se data send kare (URL encoded format mein), toh woh bhi correctly handle ho jaye. extended: true ka matlab hai ki complex data types bhi handle kiye ja sakte hain.

// app.use('/user',userRouter); // Yeh line specify kar rahi hai ki jab bhi koi /user path par request karega, woh request userRouter ke through process hoga. Matlab jo routes aur logic userRouter mein hain, woh /user path ke liye execute honge.

// app.listen(3001); // jab bhi koi client request bhejega, server port 3001 par sunega.
// console.log("server invoked at http://localhost:3001");

import dotenv from 'dotenv';
dotenv.config(); // must be first

import express from 'express';
import './32_connection_express.js'; // Import database connection
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload'

const app = express();

const port = process.env.PORT

import userRouter from "./32_user.Router_express.js"

import ForgetPassword from './32_ForgetPassword.js';

// category files 
import CategoryRouter from './router1.js';

import SubCategoryRouter from './32_SubCategory.Router.js';

import ProductRouter from './32_Add_Product.Router.js';
// aiChat Boat

import aiChat from './aiChat.js';

// payment
import PaymentRouter from './32_Payment.router.js';

//to handle cross origin request
app.use(cors());

// Use built-in Express middleware instead of deprecated body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(fileUpload());

app.use('/user', userRouter);
app.use('/category',CategoryRouter);
app.use('/subcategory',SubCategoryRouter);
app.use('/product',ProductRouter);
app.use('/api/ai',aiChat);

app.use('/payment', PaymentRouter);

app.use('/forgetpassword', ForgetPassword)

app.listen(port);
console.log(`Server invoked at link http://localhost:${port}`);


// ************ FOR BUILDING AN API **************************

//  STEPS => 1] MONGODB CONNECT (CONNECTION FILE),
//  STEPS => 2] MODEL DECIDE (USER MODEL FILE),
//  STEPS => 3] CONTROLLER FILE [LOGIC] (CONTROLLER FILE),
//  STEPS => 4] ROUTER FILE (ROUTER FILE),
//  STEPS => 5] APP FILE [MIDDLEWARE B/W SERVER AND DATABASE] (APP FILE)



// import express from 'express';

// import bodyParser, { urlencoded } from 'body-parser';

// import userRouter from './32_user.Router_express';

// const App=express();

// App.use('/user',userRouter);

// App.use(bodyParser.json());

// App.use(bodyParser.urlencoded({extended:true}));

// App.listen(3001);
// console.log("Server invoked at http://localhost:3001");
export default app;