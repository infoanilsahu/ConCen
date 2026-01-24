import { Router } from "express";
import { register } from "../controller/auth/register.controller.js";
import { login } from "../controller/auth/login.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.middleware.js";
import { logout } from "../controller/auth/logout.controller.js";
import { ChecToken } from "../controller/auth/checkToken.controller.js";


const router = Router();

router.route("/register").post(register)
router.route("/login").post(login)

router.route("/logout").get(verifyJWT,logout)
router.route("/tokencheck").get(ChecToken)


export default router;