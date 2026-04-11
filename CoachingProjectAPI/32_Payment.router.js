// import express from "express";
// import * as PaymentController from "./32_Payment.controller.js";

// const router = express.Router();

// router.post("/processPayment", PaymentController.processPayment);
// router.post("/verifyPayment", PaymentController.verifyPayment);

// // ✅ NEW
// router.get("/history", PaymentController.getHistory);

// export default router;


import express from 'express'

import *as ProductController from './32_Add_Product.Controller.js'

const router=express.Router();

router.post('/save',ProductController.SaveProduct);
router.get("/fetch",ProductController.FetchProduct);
router.delete("/delete",ProductController.DeleteProduct);
router.patch("/update",ProductController.UpdateProduct);

export default router;