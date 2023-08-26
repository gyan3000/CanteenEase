const express = require("express");
const User = require("./../models/User");
const Admin = require("./../models/Admin");

const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("./../middleware/fetchuser");
const fetchadmin = require("../middleware/fetchadmin");
const JWT_SECRET = "SaurabhGenius";
const JWT_SECRET_ADMIN = "SaurabhAdmin";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sakushwaha697@gmail.com',
        pass: 'your_password',
    },
});


router.post("/signup", [body('email', 'Enter a valid email').isEmail(),
body("name", "enter a valid name").isLength({ min: 3 }),
body('password', "Password must be atleast 5 length").isLength({ min: 5 })],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ "success": success, errors: errors.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(200).json({ "success": success, error: "Email already registered" });
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false });
            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email,
                phone: req.body.phone,
                otp: otp
            });
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            const mailOptions = {
                from: 'sakushwaha697@gmail.com',
                to: email,
                subject: 'Email Verification OTP',
                text: `Your OTP: ${otp}`,
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Error sending OTP.');
                } else {
                    console.log('Email sent: ' + info.response);
                    res.send('OTP sent successfully.');
                }
            });
            res.json({ "success": success, "authtoken": authToken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
    });
router.post("/login", [body('email', 'Enter a valid email').isEmail(),
body('password', "Password can not be blank").exists()],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            return res.status(400).json({ "success": success, errors: errors.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ "success": success, error: "Please login with correct credentials" });
            }
            const passwordCompare = await bcrypt.compare(req.body.password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ "success": success, error: "Please login with correct credentials" });
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            success = true;
            const authToken = jwt.sign(data, JWT_SECRET);
            return res.json({ "success": success, "authtoken": authToken });
        } catch (error) {
            console.error(error.message);
            return res.status(500).send("Internal server error");
        }
    });
router.post("/getuser", fetchuser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

router.post('/verify-otp',fetchuser, async (req, res) => {
    const { otp } = req.body;
    try{
        const user = await User.findById(req.user.id);
        if(otp===user?.otp){
            user.isEmailVerified = true;
            res.status(200).send("Email verification successful");
        }else{
            res.status(400).send("Invalid OTP");
        }
    }catch(error){
        console.log(error);
        res.status(500).json("Message: Error in verifying otp");
    }
  });
  

router.post("/admin/signup", [body('email', 'Enter a valid email').isEmail(),
body("name", "enter a valid name").isLength({ min: 3 }),
body('password', "Password must be atleast 5 length").isLength({ min: 5 })],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ "success": success, errors: errors.array() });
        }
        try {
            let admin = await Admin.findOne({ email: req.body.email });
            if (admin) {
                return res.status(200).json({ "success": success, error: "Email already registered" });
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            admin = await Admin.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email,
                lastLogin: Date.now()
            });
            const data = {
                admin: {
                    id: admin.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET_ADMIN);
            success = true;
            res.json({ "success": success, "authtoken": authToken });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
    });

router.post("/admin/login", [body('email', 'Enter a valid email').isEmail(),
body('password', "Password can not be blank").exists()],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            return res.status(400).json({ "success": success, errors: errors.array() });
        }
        try {
            let admin = await Admin.findOne({ email: req.body.email });
            if (!admin) {
                return res.status(400).json({ "success": success, error: "Please login with correct credentials" });
            }
            const passwordCompare = await bcrypt.compare(req.body.password, admin.password);
            if (!passwordCompare) {
                return res.status(400).json({ "success": success, error: "Please login with correct credentials" });
            }
            const data = {
                admin: {
                    id: admin.id
                }
            }
            success = true;
            const authToken = jwt.sign(data, JWT_SECRET_ADMIN);
            return res.json({ "success": success, "authtoken": authToken });
        } catch (error) {
            console.error(error.message);
            return res.status(500).send("Internal server error");
        }
    });

router.post("/getadmin", fetchadmin, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const adminId = req.admin.id;
        const admin = await Admin.findById(adminId).select("-password");
        res.send(admin);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});


module.exports = router;
