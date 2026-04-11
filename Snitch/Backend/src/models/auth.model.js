import mongoose from "mongoose"
import  bcrypt from "bcrypt"

let userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        contact: { type: String, required: true },
        password: { type: String, required: true },
        fullname: { type: String, required: true },
        role: {
            type: String,
            enum: ["buyer", "seller"],
            default: "buyer"
        }
    }
)

userSchema.pre("save", async ()=>{
     if (!this.isModified("password")) return;
     let hash =  bcrypt.hash(this.password , 10)
     this.password = hash
} )

userSchema.methods.comparePassword = async (password)=>{
    return bcrypt.compare(password,this.password)
}

 let userModel = mongoose.model('user', userSchema);

export default userModel;