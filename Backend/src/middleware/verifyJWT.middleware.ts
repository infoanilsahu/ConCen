import { NextFunction, Request, Response } from "express";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from 'jsonwebtoken'
import { User } from "../model/user.model.js";

interface TokenPayload {
    _id: string;
}

export const verifyJWT = AsyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer","").trim()
    if (!token) {
        throw new ApiError(400,"Unauthorized")
    }

    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as TokenPayload
        const user = await User.findById(decodedToken._id) 
        if (!user) {
            throw new ApiError(404, "Invalid token")
        }

        req.user = user

        next();
    } catch (error: any) {
        throw new ApiError(401, error?.message,error)
    }
})