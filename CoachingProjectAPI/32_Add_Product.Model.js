import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  reviewer: { type: String, trim: true },
  comment:  { type: String, trim: true },
  rating:   { type: Number, min: 0, max: 5 },
  info:     { type: String, trim: true },
});

const ProductSchema = mongoose.Schema({
  _id: Number,

  title: {
    type: String,
    lowercase: true,
    required: [true, "Title is required"],
    trim: true,
  },

  catnm: {
    type: String,
    lowercase: true,
    required: [true, "Category is required"],
    trim: true,
  },

  subcatnm: {
    type: String,
    lowercase: true,
    required: [true, "Subcategory is required"],
    trim: true,
  },

  description: {
    type: String,
    lowercase: true,
  },

  producticonnm: {
    type: String,
    required: [true, "Product icon is required"],
    trim: true,
  },

  price: {
    type: String,
    required: [true, "Price is required"],
  },

  ratings: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },

  // ✅ FIX: reviews is now an ARRAY of ReviewSchema objects
  // Previously it was a plain object — $push and .length were broken
  reviews: [ReviewSchema],

  addedby: {
    type: String,
    default: null,
    lowercase: true,
    trim: true,
  },

  role: {
    type: String,
    default: "user",
  },
});

const ProductModel = mongoose.model("Product_collection", ProductSchema);
export default ProductModel;