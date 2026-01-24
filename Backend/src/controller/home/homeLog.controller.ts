import { Request, Response } from "express";
import { AsyncHandler } from "../../utils/AsyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { User } from "../../model/user.model.js";
import mongoose from "mongoose";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const homeLog = AsyncHandler(async (req:Request, res: Response) => {
    if (!req.user) {
        throw new ApiError(404, "token not found")
    }

    const currentUser = new mongoose.Types.ObjectId(req.user._id)

    const allUser = await User.aggregate([
        {
            $match: {
                _id: { $ne: currentUser }
            }
        },
        {
            $project: {
                password: 0,
                createdAt: 0,
                updatedAt: 0,
                _id: 0,
                __v: 0
            }
        }
    ])

    return res.status(200).json(
        new ApiResponse(200,allUser, "data sended successfully")
    )
})