const User = require("../models/User");

const bcrypt = require("bcryptjs");

const { Op } = require("sequelize");//This is written for search functionality

exports.getAllUsers = async(req,res) => {
    try{
        const users = await User.findAll();
        res.status(200).json(users);
        
    }catch(error){
        console.log(error);
        res.status(500).json({message:message.error})
    }
}

exports.updateUser = async(req,res) => {
    try{
        const user = await User.findByPk(req.params.id);
        if(!user){
            return res.status(404).json({message:"User Not Found"});
        }
        await user.update(req.body);
        res.status(200).json({message:"User Updated"});

    }catch(error){
        console.log(error);
        res.status(500).json({message: error.message});
    }
}

exports.addUser = async(req,res) => {
    try{
        console.log(req.body);
        const {name,email,password,role,phone_number} = req.body;
        //check required fields are empty or not
        if(!name || !email || !password || !role || !phone_number){
            return res.status(400).json({ message : "All fileds required" });
        }

        //Email Validation
        const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message:"Invalid email format"});
        }

        //Phone Number Validation
        if(password.length < 6){
            return res.status(400).json({message:"Password must be at least 6 characters"});
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
        res.status(201).json({ message:"User added successfully ",user });

    }catch(error){
        console.log(error.message);
        res.status(404).json({message:error.message});
    }
}

exports.deleteUser = async(req,res) => {
    try{
        const user = await User.destroy({ where: {id: req.params.id} });
        res.status(200).json({message:"User Deleted Successfully"});
    }catch(error){
        console.log(error);
        res.status(400).json({message:error.message});
    }
}

exports.getDashboardStats = async(req,res) => {
    try {

        const totalUsers = await User.count();

        const totalAdmins = await User.count({ where:{ role:"admin" } });

        const totalEmployees = await User.count({ where:{ role:"employee" } });

        res.status(200).json({ totalUsers, totalAdmins, totalEmployees });

    } catch(error){

        console.log(error);

        res.status(500).json({ message:error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const search = req.query.search || "";
      const role = req.query.role || "";
      const offset = (page - 1) * limit;
      const whereCondition = {};
      //Search by name OR email
      if(search){
        whereCondition[Op.or] = [
            {
                name:{
                    [Op.like]:`%${search}%`
                }
            },{
                email:{
                    [Op.like]:`%${search}%`
                }
            }
        ];
      }

      //Filter by role
      if(role){
        whereCondition.role = role;
      }

      const { count, rows } = await User.findAndCountAll({
         where:whereCondition,
         limit,
         offset,
         order: [["id", "DESC"]]
      });

      res.status(200).json({
         users: rows,
         totalUsers: count,
         totalPages: Math.ceil(count / limit),
         currentPage: page
      });
      
   } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
   }
};
