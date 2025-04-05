import express from "express";
import {login,logout, updateProfile,checkAuth} from "../controllers/auth.controller.js";
const router = express.Router()
import { protectRoute } from "../middlewares/auth.middleware.js";

router.post('/login',login)
router.post('/logout',logout)

router.post('/update-profile',updateProfile)
router.get("/check",protectRoute,checkAuth)

export default router;
