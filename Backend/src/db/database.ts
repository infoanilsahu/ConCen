import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.DATABASE}/deploy`)
        console.log("connected");
        
        
    } catch (error: any) {
        console.log("data base connection error : ",error);
        process.exit(1)
    }
}

export {connectDB}