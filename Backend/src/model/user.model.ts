
import mongoose, {Document, type HydratedDocument} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt, {type SignOptions} from 'jsonwebtoken';

interface IUser {
    email: string;
    username: string;
    password: string;
    address: string;
    hobby: string;
    token?: string;
    isPasswordCorrect(password: string): Promise<boolean>;
    generateToken(): Promise<string>;
}

const userSchema = new  mongoose.Schema<IUser>({
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
},{timestamps: true})

userSchema.pre("save", async function () {
    if(!this.isModified("password")) return ;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.isPasswordCorrect = async function (this: IUser, password: string) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = async function (this: HydratedDocument<IUser>) {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
    },
    process.env.TOKEN_SECRET!,
    {expiresIn: process.env.TOKEN_EXPIRY as jwt.SignOptions["expiresIn"]})
}

export type UserDocument = HydratedDocument<IUser>;
export const User = mongoose.model<IUser>("User",userSchema);