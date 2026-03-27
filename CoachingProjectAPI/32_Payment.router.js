import express from "express";
import * as PaymentController from "./32_Payment.controller.js";

const router = express.Router();

router.post("/processPayment", PaymentController.processPayment);
router.post("/verifyPayment", PaymentController.verifyPayment);

// ✅ NEW
router.get("/history", PaymentController.getHistory);

export default router;