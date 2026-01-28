import { Request, Response } from "express";
import { AsyncHandler } from "../../utils/AsyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import mongoose from "mongoose";
import { User } from "../../model/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const search = AsyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const { search } = req.body;
  if (!search || typeof search !== "string") {
    throw new ApiError(400, "Search term is required");
  }

  const pattern = search.split("").join(".*"); // e.g. "an" => "a.*n"

  const user = await User.aggregate([
    {
      $match: {
        username: { $regex: pattern, $options: "i" }
      }
    },
    {
        $project: {
            email: 1,
            username: 1,
            address: 1,
            hobby: 1,
            _id: 0
        }
    }
  ]);

  return res.status(200).json(
    new ApiResponse(200, user, "search data")
  );
});
