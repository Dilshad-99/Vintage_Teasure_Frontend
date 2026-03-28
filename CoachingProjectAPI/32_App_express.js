import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

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

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://vintage-teasure-fe.onrender.com',
    'https://vintage-treasure-front-e.onrender.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use('/uploads', express.static(
  path.join(__dirname, '../projectcopy/public/assets/uploads')
));

app.use('/user',           userRouter);
app.use('/category',       CategoryRouter);
app.use('/subcategory',    SubCategoryRouter);
app.use('/product',        ProductRouter);
app.use('/api/ai',         aiChat);
app.use('/payment',        PaymentRouter);
app.use('/forgetpassword', ForgetPassword);

app.get("/", (req, res) => {
  res.send("Backend Live");
});

app.listen(port, () => {
  console.log(`Server invoked at link http://localhost:${port}`);
});

export default app;