import User from "../mongodb/users.js";
import OTP from "../mongodb/OTP.js";
import generateOTP from "../utils/generateOTP.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";

export const signup = async (req, res) => {
  try {
    let { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    name = name.trim();
    email = email.trim().toLowerCase();
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "This Email already registered.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    await OTP.deleteMany({ email });
    await OTP.create({
      name,
      email,
      password: hashedPassword,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });
    await sendEmail(
      email,
      "PaperCraft Email Verification",
      `
    <h2>Welcome to PaperCraft!</h2>

    <p>Your verification code is:</p>

    <h1 style="letter-spacing:5px;">${otp}</h1>

    <p>This code will expire in <strong>5 minutes</strong>.</p>

    <p>If you didn't request this, you can safely ignore this email.</p>
  `,
    );
    return res.status(200).json({
      success: true,
      message: "OTP is Created and Sent Successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifySignupOTP = async (req, res) => {
  try {
    let { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }
    email = email.trim().toLowerCase();
    otp = otp.trim();
    const otpDoc = await OTP.findOne({ email });

    if (!otpDoc) {
      return res.status(404).json({
        success: false,
        message: "OTP not found or expired.",
      });
    }
    if (new Date() > otpDoc.expiresAt) {
      await OTP.deleteOne({ _id: otpDoc._id });

      return res.status(400).json({
        success: false,
        message: "OTP has expired.",
      });
    }
    if (otpDoc.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "This email is already registered.",
      });
    }

    const newUser = new User({
      name: otpDoc.name,
      email: otpDoc.email,
      password: otpDoc.password,
      isVerified: true,
    });

    await newUser.save();
    await OTP.deleteOne({ _id: otpDoc._id });

    return res.status(201).json({
      success: true,
      message: "New User Created.",
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    email = email.trim().toLowerCase();
    
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    } 
      return res.status(200).json({
        success: true,
        message: "Login successful.",
      });
    
  } catch (error) {
    console.error(error);
  }
};

export const forgotPassword = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
  }
};

export const verifyForgotOTP = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
  }
};

export const resetPassword = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
  }
};

export const logout = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
  }
};

export const getCurrentUser = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
  }
};
