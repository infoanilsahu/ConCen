import { CookieOptions, Request, Response } from "express";
import { AsyncHandler } from "../../utils/AsyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { User } from "../../model/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const logout = AsyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
        throw new ApiError(404, "Token not found")
    }

    const {email} = req.user
    const user = await User.findOne({email})
    if (!user) {
        throw new ApiError(404,"User not found")
    }

    user.token = ""
    await user.save({validateBeforeSave: true})

    const option: CookieOptions = {
            httpOnly: true,
            secure: false,     // production - secure: trure
            sameSite: "lax",   // production - sameSite: "none"
    }

    return res.status(200)
                .cookie("token","",option)
                .json(
                    new ApiResponse(200,user,"User logout successfully")
                )
})