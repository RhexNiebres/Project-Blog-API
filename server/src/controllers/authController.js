const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { generateToken } = require("../middlewares/auth"); 
require("dotenv").config({path:"../../.env"});


exports.getLogin = (req, res) => {
  res.json({message: "Login page"});
};

exports.getSignUp = (req, res) => {
  res.json({message: "Signup page"});
};          

exports.postSignUp = async (req, res, next) => {
  try {
    const { username, email, password, } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).send("Username already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const token = generateToken(newUser);

    res.status(201).json({message:"User registered successfully", token})
  } catch (err) {
    return next(err);
  }
};

exports.postLogin = async(req,res, next) =>{
  try{
    const {username, password}= req.body;

    const user = await prisma.user.findUnique({where: {username}})
    if(!user)return res.status(400).json({message:"Invalid username or password."})

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch)return res.status(400).json({message: "Invalid username or password"})
      
      const token = generateToken(user);

      res.json({message: "Login successful", token})
  }catch(err){
    next(err);
  }
};

exports.logout = (req, res) => {
 res.json({message:"Logout successful"})
};
