import { AsyncHandler } from "../../utils/AsyncHandler.js";
import { User } from "../../model/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
export const home = AsyncHandler(async (req, res) => {
    const allUser = await User.find({}).select("-password -token -createdAt -updatedAt -_id -__v");
    return res.status(200).json(new ApiResponse(200, allUser, "data sended successfully"));
});
