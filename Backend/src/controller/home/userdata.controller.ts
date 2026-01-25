import { Request, Response } from "express";
import { AsyncHandler } from "../../utils/AsyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const userData = AsyncHandler(async (req:Request, res:Response) => {
    if(!req.user) {
        throw new ApiError(401,"User is Unauthorized")
    }

    const {email, username} = req.user

    return res.status(200).json(
        new ApiResponse(200,{email,username},"User found successfully")
    )
})