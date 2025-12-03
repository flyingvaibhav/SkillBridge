import User from "../model/userModel.js";
import validator from 'validator';
import bcrypt from 'bcryptjs';
import genToken from "../config/token.js";
import sendMail from "../config/sendMail.js";

//sign up  code 

export const signUp =async (req,res)=>{
    try{
        const {name , email,password,role}=req.body;
        let existUser = await User.findOne({email});

        if(existUser){
            return res.status(400).json({message:"User already exists"});
        }
   if(!validator.isEmail(email)){
    return res.status(400).json({message:"enter the valid email"});
   }

    if(password.length<8){
        return res.status(400).json({message:"enter strong password"});
    }
    let hashPassword = await bcrypt.hash(password, 10);
   const  user = await User.create({
    name,
    email,
    password:hashPassword,
    role
   })
let token = await genToken(user._id)
res.cookie("token", token,{
    httpOnly: true,
    secure : false,
    sameSite : "Strict",
    maxAge : 7*24*60*60*1000
})

return res.status(201).json(user)
    }
    catch(error){
        return res.status(500).json({message: `SignUp error ${error}`})

    }
}
// login code 

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    let user = await User.findOne({ email });
    if (!user) {
      console.log("❌ No user found with email:", email);
      return res.status(400).json({ message: "User not found" });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Invalid password for:", email);
      return res.status(400).json({ message: "Invalid password" });
    }

    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

   
    return res.status(200).json(user);
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: `Login error ${error}` });
  }
};

//logout code 
export const logout = async (req,res)=>{
    try{
        await  res.clearCookie("token")
        return res.status(200).json({message:"Logout successful"})
    }
    catch(error){
        return res.status(500).json({message: `Logout error ${error}`})
    }
}
//send otp code
  export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    user.resetOTP = otp,
    user.otpExpiry = Date.now() + 5 * 60 * 1000,// 5 minutes from now
    user.isOtpVerified = false

    await user.save();
    await sendMail(email, otp);
    return res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ message: "Error sending OTP" });
  }
};

//verify otp code
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.resetOTP !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.resetOTP = undefined;
    user.otpExpiry = undefined;
    user.isOtpVerified = true;

    await user.save();
    return res.status(200).json({ message: "OTP verified successfully" });

  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ message: "Error verifying OTP" });
  }
};


//reset password code
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.isOtpVerified) {
      return res.status(400).json({ message: "OTP not verified" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    user.isOtpVerified = false;
    await user.save();
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ message: "Error resetting password" });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      user= await User.create({
        name,
        email,
        role
      })
    }
    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

   
    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({ message: `Google Auth error ${error}` });
  }
};