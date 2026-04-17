import mongoose from "mongoose"
import bcrypt from "bcrypt"

let userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        contact: { type: String, required: false },

        password: {
            type: String,
            required: function () {
                return !this.googleId;
            }
        },

        fullname: { type: String, required: true },
        role: {
            type: String,
            enum: ["buyer", "seller"],
            default: "buyer"
        },
        googleId: {
            type: String,
        }
    }
)

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


userSchema.methods.comparePassword = async function (password) {
    return  bcrypt.compare(password, this.password)
}

let userModel = mongoose.model('user', userSchema);

export default userModel;