import express from "express";

import {
  signup,
  verifySignupOTP,
  login,
  forgotPassword,
  verifyForgotOTP,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verify-signup", verifySignupOTP);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-forgot-password", verifyForgotOTP);
router.post("/reset-password", resetPassword);

export default router;
