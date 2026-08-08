const User = require("../models/User");

exports.getProfile = async(req,res) => {
    try{
        const userDetails = await User.findByPk(req.user.id,{
            attributes:["id","name","email","role","phone_number"]
        });
        if(!userDetails){
            res.status(404).json({ message:"Record not Found!" });
        }else{
            console.log(userDetails);
            res.status(200).json({userDetails})
        }
    }catch(error){
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

exports.updateProfile = async(req,res) => {
    try{
        const { name, phone_number } = req.body;
        const user = await User.findByPk(req.user.id);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        await user.update({ name,phone_number });
        res.status(200).json({ message:"Profile updated successfully"});
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};