import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from 'jsonwebtoken';
import { User } from "../model/user.model.js";
export const verifyJWT = AsyncHandler(async (req, res, next) => {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer", "").trim();
    if (!token) {
        throw new ApiError(400, "Unauthorized");
    }
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findById(decodedToken._id);
        if (!user) {
            throw new ApiError(404, "Invalid token");
        }
        req.user = user;
        next();
    }
    catch (error) {
        throw new ApiError(401, error?.message, error);
    }
});
