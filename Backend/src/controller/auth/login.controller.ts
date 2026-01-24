import { CookieOptions, Request, Response } from "express";
import { AsyncHandler } from "../../utils/AsyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { User } from "../../model/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { TokenExpiredError } from "jsonwebtoken";

export const login = AsyncHandler(async (req:Request, res:Response) => {
    
    const {email, password} = req.body
    if (!email || !password) {
        throw new ApiError(404, "email and password not found")
    }

    const user = await User.findOne({email})
    if (!user) {
        throw new ApiError(404,"User not exists")
    }

    const isUserOK = await user.isPasswordCorrect(password)
    if (!isUserOK) {
        throw new ApiError(402,"Incorrect password")
    }


    const token = await user.generateToken()

    user.token = token
    await user.save({validateBeforeSave: true})

    const loginUser = await User.findById(user._id).select("-password")

    const option: CookieOptions = {
        httpOnly: true,
        secure: true,     // production - secure: trure
        sameSite: "none",   // production - sameSite: "none"
    }

    return res.status(200)
        .cookie("token",token,option)
        .json(
            new ApiResponse(200, loginUser,"User successfully login")
        )

})