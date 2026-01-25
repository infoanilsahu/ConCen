import { Router } from "express";
import { home } from "../controller/home/home.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.middleware.js";
import { homeLog } from "../controller/home/homeLog.controller.js";
import { userData } from "../controller/home/userdata.controller.js";

const router = Router()

router.route("/home").get(home)
router.route("/home-loginuser").get(verifyJWT,homeLog)
router.route("/user").get(verifyJWT,userData)

export default router;