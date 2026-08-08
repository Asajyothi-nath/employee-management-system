const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const sendEmail = require("../utils/sendEmail");

//Signup
exports.signup = async(req,res) => {
    try{
        const { name, email, password, role, phone_number } = req.body;
        //check required Fields
        if(!name || !email || !password || !role || !phone_number){
            return res.status(400).json({ message : "All fileds required" });
        }

        //Email Validation
        const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message:"Invalid email format"});
        }

        //Password Validation
        if(password.length < 6){
            return res.status(400).json({message:"Password must be at least 6 characters"});
        }

        //Phone number Validation
        if(phone_number.length < 10){
            return res.status(400).json({message:"Phone number must be at least 10 characters"});
        }

        //Check user exists
        const existingUser = await User.findOne({ where : { email } });
        if(existingUser){
            return res.status(400).json({ message: "Email already exists" });
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        //create user
        const user = await User.create({ name, email, password : hashedPassword, role:role, phone_number });
        console.log("userDetails",user);
        res.status(201).json({ message:"User registered successfully ",user });
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

//Login
exports.login = async(req,res) => {
    try{
        const { email , password } = req.body;
        if(!email || !password){
            res.status(400).json({ message : "Email and password required"});
        }

        //Email Validation
        const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message:"Invalid email format"});
        }

        //Find user
        const user = await User.findOne({ where : { email } });
        if(!user){
            return res.status(401).json({message:"User not found" });
        }

        //Check password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({ message:"Invalid password" });
        }

        //Access Token 
        const accessToken = jwt.sign({ id:user.id , role:user.role },process.env.ACCESS_TOKEN_SECRET,{ expiresIn : "15m"});

        //Refresh Token
        const refreshToken = jwt.sign({id:user.id},process.env.REFRESH_TOKEN_SECRET,{ expiresIn:"7d"});

        //Save Refresh Token
        user.refreshToken = refreshToken;
        await user.save();

        // SET COOKIE
        res.cookie( "refreshToken",refreshToken,{ httpOnly: true, secure: false, sameSite: "strict" });

        // RESPONSE
        res.status(200).json({ message: "Login successful", accessToken, user: { id: user.id, name: user.name, email: user.email, role: user.role } });

    }catch(error){
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

//Refresh Token
exports.refreshToken = async(req,res) => {
    try{
       const token = req.cookies.refreshToken;
       if(!token){
            return res.status(401).json({ message:"No refresh token "});
       } 

       //Verify Token
       const decoded = jwt.verify(token,process.env.REFRESH_TOKEN_SECRET );

       //Find user
       const user = await User.findByPk(decoded.id);
       if(!user || user.refreshToken !== token){
            return res.status(403).json({ message:"Invalid refresh token" });
       }

       //Create New Access Token
       const newAccessToken = jwt.sign({ id:user.id, role:user.role },process.env.ACCESS_TOKEN_SECRET,{ expiresIn : "15m" });
       res.status(200).json({ accessToken : newAccessToken });

    }catch(error){
        console.log(error);
        res.status(403).json({ message:"Refresh token expired "});
    }
};

//Logout
exports.logout = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (token) {
            const decoded = jwt.verify(token,process.env.REFRESH_TOKEN_SECRET);
            const user = await User.findByPk(decoded.id);
            if (user) {
                user.refreshToken = null;
                await user.save();
            }
        }

        // CLEAR COOKIE
        res.clearCookie("refreshToken");
        res.status(200).json({message: "Logout successful"});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

//Forgot Password
exports.forgotPassword = async(req,res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ where:{ email } });

        if(!user){
            return res.status(404).json({ message:"User not found" });
        }

        // RESET TOKEN
        const resetToken = jwt.sign(

            { id:user.id },

            process.env.JWT_SECRET,

            { expiresIn:"15m" }
        );

        // TEMPORARY RESET URL
        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

        await sendEmail(

            "ashanath2023@gmail.com",

            "Password Reset",

            `
            <h2>Password Reset Request</h2>

            <p>Click the link below to reset your password:</p>

            <a href="${resetUrl}">
                Reset Password
            </a>

            <p>This link expires in 15 minutes.</p>
            `
        );

        res.status(200).json({
            message:"Password reset email sent successfully"
        });

        //console.log(resetUrl);

        //res.status(200).json({ message: "Reset link generated",resetUrl });

    } catch(error){

        console.log(error);

        res.status(500).json({ message:error.message });
    }
};

//Reset Password
exports.resetPassword = async(req,res) => {

    try {

        const { token } = req.params;

        const { password } = req.body;

        if(!password){
            return res.status(400).json({
                message:"Password is required"
            });
        }

        if(password.length < 6){
            return res.status(400).json({
                message:"Password must be at least 6 characters"
            });
        }

        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET
        );

        const hashedPassword = await bcrypt.hash(password,10);

        await User.update(

            {
              password:hashedPassword,
              refreshToken:null
            },

            {
              where:{ id:decoded.id }
            }
        );

        res.clearCookie("refreshToken");

        res.status(200).json({ message:"Password reset successful" });

    } catch(error){

        console.log("resetPassword Error : ",error);

        if(error.name === "TokenExpiredError"){
            return res.status(400).json({
                message:"Reset link expired. Please request a new one."
            });
        }
        if(error.name === "JsonwebTokenError"){
            return res.status(400).json({message:"Invalid reset token"});
        }
        res.status(500).json({ message:error.message });
    }
};