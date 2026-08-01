const crypto = require("crypto");
const transporter = require("../config/email");
const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
let success = false;
const JWT_SECRETE = process.env.JWT_SECRET;
// ROUTE 1: Create a User // No Auth Required..
router.post(
  "/signuser",
  [
    body("name", "Enter a Valid Name").isLength({ min: 4 }),
    body("mobileNo", "Enter a Valid Mobile Number").isLength({ min: 11 }),
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Enter a atleast 5 character password ").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //if there any user exists with the email
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          errors: "Sorry a User with this email already exsits",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const securepass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        mobileNo: req.body.mobileNo,
        email: req.body.email,
        password: securepass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRETE);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  },
);

// ROUTE 2: Authenticate a User
router.post(
  "/loginuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be a balnk").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Try login with correct crendentails" });
      }
      const comparepass = await bcrypt.compare(password, user.password);
      if (!comparepass) {
        return res
          .status(400)
          .json({ success, error: "Try Login with correct Credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRETE);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  },
);

//ROUTE:3-Get logged in users details , login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// ROUTE 4: Forget Pasword
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email is required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "No account found with this email",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    await user.save();
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const mailOptions = {
      from: `"Resume Assistant" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Resume Assistant - Password Reset",
      html: `
                <div style="
                    font-family: Arial, sans-serif;
                    max-width: 600px;
                    margin: auto;
                    padding: 30px;
                    background: #f8fafc;
                ">

                    <div style="
                        background: white;
                        padding: 35px;
                        border-radius: 12px;
                    ">

                        <h2 style="
                            color: #0f172a;
                            margin-bottom: 10px;
                        ">
                            Reset Your Password
                        </h2>

                        <p style="
                            color: #64748b;
                            line-height: 1.6;
                        ">
                            We received a request to reset the password
                            for your Resume Assistant account.
                        </p>

                        <p style="
                            color: #64748b;
                            line-height: 1.6;
                        ">
                            Click the button below to create a new password.
                        </p>

                        <div style="margin: 30px 0;">

                            <a
                                href="${resetUrl}"
                                style="
                                    display: inline-block;
                                    background: #2563eb;
                                    color: white;
                                    text-decoration: none;
                                    padding: 13px 25px;
                                    border-radius: 8px;
                                    font-weight: bold;
                                "
                            >
                                Reset Password
                            </a>

                        </div>

                        <p style="
                            color: #64748b;
                            font-size: 13px;
                            line-height: 1.6;
                        ">
                            This link will expire in 15 minutes.
                        </p>

                        <p style="
                            color: #94a3b8;
                            font-size: 12px;
                        ">
                            If you did not request a password reset,
                            you can safely ignore this email.
                        </p>

                    </div>

                </div>
            `,
    };

    await transporter.sendMail(mailOptions);
    res.json({
      success: true,
      message: "Password reset link sent successfully",
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    res.status(500).json({
      success: false,
      error: "Unable to send password reset email",
    });
  }
});
// ROUTE 5: Reset Password:
router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({
        success: false,
        error: "Token and password are required",
      });
    }
    if (password.length < 5) {
      return res.status(400).json({
        success: false,
        error: "Password must contain at least 5 characters",
      });
    }
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Reset link is invalid or has expired",
      });
    }

    const bcrypt = require("bcryptjs");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;
    await user.save();
    res.json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({
      success: false,
      error: "Unable to reset password",
    });
  }
});
module.exports = router;
