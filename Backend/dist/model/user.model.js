import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    hobby: {
        type: String,
        required: true,
    },
    token: {
        type: String
    }
}, { timestamps: true });
userSchema.pre("save", async function () {
    if (!this.isModified("password"))
        return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateToken = async function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
    }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRY });
};
export const User = mongoose.model("User", userSchema);
