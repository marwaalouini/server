const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc register role: user
//@method post path: register
//@access: public
const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const newUser = await User.findOne({ email });
    if (newUser) res.status(400).json({ msg: "User exists, try to connect" });
    else {
      const hashedPw = await bcrypt.hash(password, 10);
      const createUser = await User.create({
        email,
        name,
        password: hashedPw,
      });
      const token = jwt.sign(
        { id: createUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "10d" }
      );
      console.log(token);
      res.status(201).json({ msg: "User created", token: token, user: createUser });
    }
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", error: err.message });
  }
};

//@desc register role: user
//@method post path: login
//@access: public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) res.status(400).json({ msg: "User does not exist, try to register" });
    else {
      const checkPW = await bcrypt.compare(password, user.password);
      if (!checkPW) res.status(400).json({ msg: "Wrong password, try again" });
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "10d" });
      console.log(token);
      res.status(200).json({ msg: "Login success!", token: token, user: user });
    }
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", error: err });
  }
};

//@desc get user data
//@method get path: user-data
//@access: private
const getUserData = async (req, res) => {
    try{
        const user = await User.findOne({_id:req.body.userId})
        if(!user) res.status(400).json({msg:"user doest exist , try to register"})
        res.status(200).json({msg:"user info success", user:user})
    }
    catch(error){
        res.status(500).json({msg:"something went wrong", error: error.message})
    }
};

module.exports = { register, login, getUserData };
