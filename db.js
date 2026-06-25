const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const DB_URL = process.env.DB_URL;

const connectDB = async ()=>{
if (!DB_URL) {
console.log("DB_URL is missing in .env !");
process.exit(1);
}
try {
 await mongoose.connect(DB_URL);
 console.log("DB connected")
} catch (err) {
console.error('DB connection failed!', err.message);
process.exit(1);
}
}

module.exports = connectDB;