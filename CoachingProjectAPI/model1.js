import mongoose from "mongoose";
import UniqueValidator from "mongoose-unique-validator"; // make the content unique.

const categorySchema = mongoose.Schema({
  _id: { 
    type: Number,
    required: [true, " category ID is required"]
  },
  catnm: {
    type: String,
    required: [true, "category name is required"],
    lowercase: true,
    trim: true,
  },
  caticonnm: {
    type: String,
    required: [true, "categoryicon_name is required"],
    trim:true,
  },
  
});


categorySchema.plugin(UniqueValidator);

const Category = mongoose.model('category_collection', categorySchema);

export default Category;
