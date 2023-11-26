const express = require("express");
const router = express.Router();
const Admin = require("../../Models/admin/Admin");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchAdmin = require("../../middleware/admin/fetchAdmin");

const JWT_SECRET = process.env.PWD_JWT;

router.post(
  "/createAdmin",
  [
    body("email", "Enter Valid Email").isEmail(),
    body("name", "Enter Your Name").isLength({ min: 3 }),
    body("phone", "Enter Your Phone").isLength({ min: 10 }),
    body("password", "PassWord Must be 5 Lenght").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    //Error Msg
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //Check With same Email exist

    try {
      let admin = await Admin.findOne({ email: req.body.email });
      if (admin) {
        return res
          .status(400)
          .json({
            success,
            errors: "Sorry a User with this email already Exist",
          });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //Creating New User

      admin = await Admin.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: secPass,
      });

      //login Token
      const data = {
        admin: {
          id: admin.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      // res.json(user);
      success = true;
      res.json({ success, authtoken });

      //Catch User
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Admin LogIn
  
router.post(
    "/loginAdmin",
    [
      body("email", "Enter Valid Email").isEmail(),
      body("password", "Password Cannot Be blank").exists(),
    ],
    async (req, res) => {
      let success = false
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
      try {
        let admin = await Admin.findOne({ email });
        if (!admin) {
          success = false
          return res
            .status(400)
            .json({ error: "Please Try to Login With Correct Credentials" });
        }
  
        const passwordCompare = await bcrypt.compare(password, admin.password);
        if (!passwordCompare) {
          success=false
          return res
            .status(400)
            .json({ success, error: "Please Try to Login With Correct Details" });
        }
  
        const data = {
          admin: {
            id: admin.id,
          },
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        success=true
        res.json({success, authtoken });
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
    }
  );


  router.post( "/getAdmin", fetchAdmin ,async (req, res) => {
    try {
      const AdminId = req.user.id;
      const admin = await Admin.findById(AdminId).select("-password");
      res.send(admin)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);



module.exports = router;
