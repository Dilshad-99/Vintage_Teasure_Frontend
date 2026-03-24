// import mongoose from 'mongoose';
// import uniqueValidator from 'mongoose-unique-validator';

// const UserSchema = mongoose.Schema({
//   _id: Number,
//   name: {
//     type: String,
//     required: [true,"Name is required"],
//     lowercase: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: [true,"Email is required"],
//     unique:true,
//     lowercase: true,
//     trim: true
//   },
//   password: {
//     type: String,
//     required: [true,"Password is required"],
//     maxlength: 20,
//     minlength:5,
//     trim: true
//   },
//   mobile: {
//     type: String,
//     required: [true,"Mobile is required"],
//     maxlength: 10,
//     minlength:10,
//     trim: true
//   },
//   address: {
//     type: String,
//     required: [true,"Address is required"],
//     trim: true
//   },
//   city: {
//     type: String,
//     required: [true,"City is required"],
//     trim: true
//   },
//   gender: {
//     type: String,
//     required: [true,"Gender is required"],
//   },
//   role: String,
//   status: Number,
//   info: String
// });

// // Apply the uniqueValidator plugin to UserSchema.
// UserSchema.plugin(uniqueValidator);

// // compile schema to model
// const UserSchemaModel = mongoose.model('user_collection',UserSchema);

// export default UserSchemaModel;



// // UserSchema.plugin(uniqueValidator);

// // Yeh line mongoose-unique-validator plugin ko schema pe apply kar rahi hai,
// // jo ensure karega ki email unique ho, 
// // aur agar koi duplicate email enter kiya gaya toh validation error milega.


// // const UserSchemaModel = mongoose.model('user_collection', UserSchema);
// // Yeh line schema ko model mein convert karti hai, jise MongoDB mein data store karne ke liye use kiya ja sakta hai. user_collection naam se collection MongoDB mein create hoga.


// // export default UserSchemaModel;
// // Yeh model ko export kar raha hai, jise baad mein apne app mein import karke use kiya ja sakta hai.

import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const UserSchema = mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    required: [true, "Name is required"],
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true
  },
  mobile: {
    type: String,
    required: [true, "Mobile is required"],
    maxlength: 10,
    minlength: 10,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    required: [true, "City is required"],
    trim: true
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
  },
  role:   String,
  status: Number,   // 0 = unverified, 1 = verified
  info:   String
});

UserSchema.plugin(uniqueValidator);

const UserSchemaModel = mongoose.model('user_collection', UserSchema);
export default UserSchemaModel;