import { Router } from "express";
import { home } from "../controller/home/home.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.middleware.js";
import { homeLog } from "../controller/home/homeLog.controller.js";
const router = Router();
router.route("/home").get(home);
router.route("/home-loginuser").get(verifyJWT, homeLog);
export default router;
