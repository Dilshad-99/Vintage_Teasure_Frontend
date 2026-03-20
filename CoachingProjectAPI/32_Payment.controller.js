import PaymentSchemaModel from "./32_Payment.model.js";
import Razorpay from "razorpay";

const RazorpayConstructor = Razorpay.default || Razorpay;

export const processPayment = async (req, res) => {
  try {
    const { amount, name, email } = req.body;

    if (!amount || !name || !email) {
      return res.status(400).json({
        status: false,
        error: "Amount, name and email are required",
      });
    }

    const razorpay = new RazorpayConstructor({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: "order_" + Date.now(),
    };

    let order;
    try {
      order = await razorpay.orders.create(options);
    } catch (razorpayError) {
      console.warn("Razorpay failed, using mock:", razorpayError.error?.description);
      order = {
        id: "order_mock_" + Date.now(),
        amount: options.amount,
        currency: "INR",
      };
    }

    await PaymentSchemaModel.create({
      name,
      email,
      amount,
      orderId: order.id,
      paymentStatus: "pending",
    });

    res.status(200).json({
      status: true,
      order,
      key_id: process.env.RAZORPAY_KEY_ID,
    });

  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ status: false, error: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id) {
      return res.status(400).json({
        status: false,
        error: "Order ID and Payment ID are required",
      });
    }

    await PaymentSchemaModel.findOneAndUpdate(
      { orderId: razorpay_order_id },
      {
        paymentStatus: "completed",
        paymentId: razorpay_payment_id,
      }
    );

    res.status(200).json({ status: true, message: "Payment verified" });

  } catch (error) {
    console.error("Verify error:", error);
    res.status(500).json({ status: false, error: error.message });
  }
};