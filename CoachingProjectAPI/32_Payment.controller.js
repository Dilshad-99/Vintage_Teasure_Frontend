// import PaymentModel from "./32_Payment.model.js";
// import Razorpay from "razorpay";

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export const processPayment = async (req, res) => {
//   try {
//     const { amount, name, email, monthly } = req.body;

//     if (!amount || !name || !email) {
//       return res.status(400).json({ status: false, error: "All fields required" });
//     }

//     const options = {
//       amount: Number(amount) * 100,
//       currency: "INR",
//       receipt: "order_" + Date.now(),
//     };

//     const order = await razorpay.orders.create(options);

//     await PaymentModel.create({
//       name,
//       email,
//       amount,
//       orderId: order.id,
//       paymentStatus: "pending",
//       monthly: monthly || false
//     });

//     res.json({
//       status: true,
//       order,
//       key_id: process.env.RAZORPAY_KEY_ID,
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ status: false, error: "Payment failed" });
//   }
// };

// export const verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id } = req.body;

//     await PaymentModel.findOneAndUpdate(
//       { orderId: razorpay_order_id },
//       { paymentStatus: "completed", paymentId: razorpay_payment_id }
//     );

//     res.json({ status: true });

//   } catch (err) {
//     res.status(500).json({ status: false, error: "Verify failed" });
//   }
// };

// export const getHistory = async (req, res) => {
//   try {
//     const { email } = req.query;
//     const data = await PaymentModel.find({ email }).sort({ createdAt: -1 });
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: "History error" });
//   }
// };

import PaymentModel from "./32_Payment.model.js";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const processPayment = async (req, res) => {
  try {
    const { amount, name, email, monthly } = req.body;

    if (!amount || !name || !email) {
      return res.status(400).json({ status: false, error: "All fields required" });
    }

    const options = {
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: "order_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    await PaymentModel.create({
      name,
      email,
      amount,
      orderId: order.id,
      paymentStatus: "pending",
      monthly: monthly || false
    });

    res.json({
      status: true,
      order,
      key_id: process.env.RAZORPAY_KEY_ID,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, error: "Payment failed" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id } = req.body;

    await PaymentModel.findOneAndUpdate(
      { orderId: razorpay_order_id },
      { paymentStatus: "completed", paymentId: razorpay_payment_id }
    );

    res.json({ status: true });

  } catch (err) {
    res.status(500).json({ status: false, error: "Verify failed" });
  }
};

export const getHistory = async (req, res) => {
  try {
    const { email } = req.query;
    const data = await PaymentModel.find({ email }).sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "History error" });
  }
};