// import mongoose from "mongoose";


// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URL);
//         console.log("Connected to Mongodb database");
//     } catch (error) {
//         console.log("Error at connecting db @db.js", error)
//     }
// }


// export default connectDB;


// ----------------------------Resolve bjson error ??==--------------------------------
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://ecomyt:passwordecomyt@cluster0.ofrntl3.mongodb.net/ecommerce_yt");
console.log("Data base connected successfully")
