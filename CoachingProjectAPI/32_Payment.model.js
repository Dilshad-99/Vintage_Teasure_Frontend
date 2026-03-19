import mongoose from "mongoose";

const PaymentSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
  paymentId: {
    type: String,
    default: null,
  },
  orderId: {
    type: String,
    default: null,
  },
}, { timestamps: true }); // handles createdAt and updatedAt automatically

const PaymentModel = mongoose.model("Payment_collection", PaymentSchema);

export default PaymentModel;