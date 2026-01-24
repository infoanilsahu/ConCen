import { Request, Response } from "express";
import { AsyncHandler } from "../../utils/AsyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const ChecToken = AsyncHandler(async (req:Request, res:Response) => {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer","").trim()
    if (!token) {
        return res.status(401).json(
            new ApiResponse(401, { success: false }, "User is unauthorized")
        )
    }

    return res.status(200).json(
        new ApiResponse(200,{success: true},"User is authoried")
    )
})