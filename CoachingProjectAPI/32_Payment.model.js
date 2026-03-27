import mongoose from "mongoose";

const PaymentSchema = mongoose.Schema({
  name: String,
  email: String,
  amount: Number,

  paymentStatus: {
    type: String,
    default: "pending"
  },

  paymentId: String,
  orderId: String,

  monthly: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

export default mongoose.model("Payment_collection", PaymentSchema);