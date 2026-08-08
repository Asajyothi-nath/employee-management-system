const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middleware/verifyToken");

const { signup, login, refreshToken, logout, resetPassword, forgotPassword} = require("../controllers/authController");

//SignUp
router.post("/signup",signup);

//LOGIN
router.post("/login",login);

//Refresh Token
router.post("/refresh-token",refreshToken);

//Logout
router.post("/logout",logout);

router.post("/reset-password/:token",resetPassword);

router.post("/forgot-password",forgotPassword);

//Profile
//router.get("/profile",verifyToken,getProfile);

module.exports = router;