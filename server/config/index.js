// CommonJS require ES6 import 
import dotenv from "dotenv";
dotenv.config();

//console.log(process.env.MONGO_URI, process.env.JWT_SECRET);

// 이렇게 default로 export하면 config로 import해서 쓰면 됨
export default {
  MONGO_URL: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};
