// import dotenv from 'dotenv';
// dotenv.config();

// import express from 'express';
// import cors from 'cors';
// import fileUpload from 'express-fileupload';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname  = path.dirname(__filename);

// import userRouter        from "./32_user.Router_express.js";
// import ForgetPassword    from './32_ForgetPassword.js';
// import CategoryRouter    from './router1.js';
// import SubCategoryRouter from './32_SubCategory.Router.js';
// import ProductRouter     from './32_Add_Product.Router.js';
// import aiChat            from './aiChat.js';
// import PaymentRouter     from './32_Payment.router.js';

// import './32_connection_express.js';

// const app  = express();
// const port = process.env.PORT || 3001;

// app.use(cors({
//   origin: [
//     'http://localhost:3000',
//     'https://vintage-teasure-fe.onrender.com',
//     'https://vintage-treasure-front-e.onrender.com'
//   ],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(fileUpload());


// app.use('/uploads', express.static(
//   path.join(__dirname, 'uploads')
// ));

// app.use('/uploads', express.static(
//   path.join(__dirname, '../projectcopy/public/assets/uploads')
// ));

// app.use('/user',           userRouter);
// app.use('/category',       CategoryRouter);
// app.use('/subcategory',    SubCategoryRouter);
// app.use('/product',        ProductRouter);
// app.use('/api/ai',         aiChat);
// app.use('/payment',        PaymentRouter);
// app.use('/forgetpassword', ForgetPassword);

// app.get("/", (req, res) => {
//   res.send("Backend Live");
// });

// app.listen(port, () => {
//   console.log(`Server invoked at link http://localhost:${port}`);
// });

// export default app;


import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

// ✅ __dirname setup FIRST
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// ✅ dotenv ONLY ONCE + correct path
dotenv.config({
  path: path.join(__dirname, ".env")
});

import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import sendMail from './32_nodeMailer.js';
import userRouter        from "./32_user.Router_express.js";
import ForgetPassword    from './32_ForgetPassword.js';
import CategoryRouter    from './router1.js';
import SubCategoryRouter from './32_SubCategory.Router.js';
import ProductRouter     from './32_Add_Product.Router.js';
import aiChat            from './aiChat.js';
import PaymentRouter     from './32_Payment.router.js';

import './32_connection_express.js';

const app  = express();
const port = process.env.PORT || 3001;

// ✅ DEBUG (important)
console.log("ENV CHECK:");
console.log("EMAIL:", process.env.EMAIL_USER);
console.log("PASS:", process.env.NODEPASS);

// middlewares
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://vintage-teasure-fe.onrender.com',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.use('/user',           userRouter);
app.use('/category',       CategoryRouter);
app.use('/subcategory',    SubCategoryRouter);
app.use('/product',        ProductRouter);
app.use('/api/ai',         aiChat);
app.use('/payment',        PaymentRouter);
app.post('/forgetpassword', ForgetPassword);


// test route
app.get("/", (req, res) => {
  res.send("Backend Live");
});

// server start
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

export default app;