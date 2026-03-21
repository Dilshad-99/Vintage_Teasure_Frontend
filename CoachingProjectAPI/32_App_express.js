import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';

// Routers
import userRouter from "./32_user.Router_express.js";
import ForgetPassword from './32_ForgetPassword.js';
import CategoryRouter from './router1.js';
import SubCategoryRouter from './32_SubCategory.Router.js';
import ProductRouter from './32_Add_Product.Router.js';
import aiChat from './aiChat.js';
import PaymentRouter from './32_Payment.router.js';

// DB Connection
import './32_connection_express.js';

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());                         // ✅ express built-in
app.use(express.urlencoded({ extended: true })); // ✅ express built-in
app.use(fileUpload());

// Routes
app.use('/user', userRouter);
app.use('/category', CategoryRouter);
app.use('/subcategory', SubCategoryRouter);
app.use('/product', ProductRouter);
app.use('/api/ai', aiChat);
app.use('/payment', PaymentRouter);
app.use('/forgetpassword', ForgetPassword);

app.listen(port, () => {
  console.log(`Server invoked at link http://localhost:${port}`);
});

export default app;
// ```

// ---

// Ab **MongoDB error** ke baare mein — yeh error ab alag hai:
// ```
// querySrv ECONNREFUSED _mongodb._tcp.vintage-treasure.ltnsitv.mongodb.net