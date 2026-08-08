const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middleware/verifyToken");

const { getProfile,updateProfile } = require("../controllers/userController")

//getUserDetails
router.get("/profile",verifyToken,getProfile);

router.put("/profile",verifyToken,updateProfile);

module.exports = router;