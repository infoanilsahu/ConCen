import { User } from "../../model/user.model.js";
import { AsyncHandler } from "../../utils/AsyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
export const register = AsyncHandler(async (req, res) => {
    const { email, username, password, address, hobby } = req.body;
    const existsUser = await User.findOne({
        $or: [{ email }, { username }]
    });
    if (existsUser) {
        throw new ApiError(500, "User already exist");
    }
    const user = await User.create({
        email,
        username,
        password,
        address,
        hobby
    });
    await user.save({ validateBeforeSave: true });
    const newUser = await User.findById(user._id).select("-password");
    if (!newUser) {
        throw new ApiError(407, "some went wrong on register user");
    }
    return res.json(new ApiResponse(200, newUser, "User is registered successfully"));
});
