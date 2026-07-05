
import mongoose from "mongoose";

    export  const  DB = async () => {

        try {          
        await mongoose.connect(process.env.MONGO_UR!)  // !  not generic value
 
        } catch (error) {
            console.log("error in connective DB " , error)
        }

    }