import app from "./src/app.js";
import dotenv from "dotenv";
import connectdb from "./src/config/DB.js";

dotenv.config();
let PORT = process.env.PORT || 3000;

let serverstart = async () => {
  try {
    await connectdb();
    app.listen(PORT, () => {
      console.log(`server  is started At Port${PORT} `);
    });

    
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

serverstart();
