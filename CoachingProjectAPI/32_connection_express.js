//database connection file : mongodb + express
//for connection 'mongoose' client is used

import mongoose from 'mongoose';
const url="mongodb+srv://Dilshad:<db_password>@cluster0.twnvvw8.mongodb.net/?appName=Cluster0";
mongoose.connect(url)
	.then(() => {
		console.log("Successfully connected to mongodb database...");
	})
	.catch((error) => {
		console.error("MongoDB connection failed:", error.message);
	});


// Yeh code MongoDB ko connect karne ke liye hai using Mongoose, 

// ek Node.js library jo MongoDB ke saath interact karne mein madad karti hai.


// import mongoose from "mongoose";

// const url='mongodb://127.0.0.1:27017/DilshadDatabase';
// mongoose.connect(url);

// console.log("mongo db url connected successfully");


