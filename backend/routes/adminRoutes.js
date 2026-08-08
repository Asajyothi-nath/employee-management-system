const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middleware/verifyToken");

const {getAllUsers,updateUser,addUser,deleteUser,getDashboardStats,getUsers} = require("../controllers/adminController");

const isAdmin = require("../middleware/isAdmin");


//getAllUsers
//router.get("/users",verifyToken,isAdmin,getAllUsers);

router.put("/users/:id",verifyToken,isAdmin,updateUser);

router.post("/add/user",verifyToken,isAdmin,addUser);

router.delete("/users/:id",verifyToken,isAdmin,deleteUser);

router.get("/dashboard-stats",verifyToken,isAdmin,getDashboardStats);

router.get("/users",verifyToken,isAdmin,getUsers);

//getUsersCount
//router.get("/getUsersCount",verifyToken,getUsersCount);
module.exports = router;