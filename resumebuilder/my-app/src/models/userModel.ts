import { Iuser } from "@/types/user.types";
import mongoose from "mongoose";
import bcrypt from "bcrypt"


interface UserDocument extends Omit<Iuser, "_id">,Document {
  compairePassword(candidatePassword: string): boolean;
}


let userSchema  = new mongoose.Schema < UserDocument > ({

    name:{
        type: String,
        trim: true,
           required: [true, "Name is required"],
    },
    email:{
        type: String,
        trim:true,
        unique:true,
        requierd: [true , "Email is Requierd"]
    },
        password: {
      type: String,
      required: [true, "Name is required"],
      minlength: [6, "Min 6 characters required"],
    },
    mobile: {
      type: String,
      minlength: [10, "min 10 characters required"],
      maxlength: [10, "max 10 characters required"],
    },

},{
    timestamps: true,
})

userSchema.pre("save" , function (password):void {
    if(!this.isModified("password")) return
    this.password = bcrypt.hashSync(this.password, 10)

})

userSchema.methods.compairePassword = function(candidatePassword:string):boolean  {
    return  bcrypt.compareSync(candidatePassword,this.password)
}

const UserModel =  mongoose.models.User || mongoose.model("User", userSchema);
export default UserModel;