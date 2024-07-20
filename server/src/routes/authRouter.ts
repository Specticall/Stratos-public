import { Router } from "express";
import { register } from "../functions/auth/register";
import { login } from "../functions/auth/login";

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;
