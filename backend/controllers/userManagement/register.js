const pool = require("../../config/db");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const convertGender = require("../../utils/convertGender");

const bcrypt = require("bcrypt");
const SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.register = async (req, res) => {
  console.log("Registering User - " + JSON.stringify(req.body));
  try {
    const { fname, lname, email, password, phone, gender, dob } = req.body;

    // Check if all required fields are provided
    if (!fname || !lname || !email || !password || !phone || !gender || !dob) {
      return res.status(400).json({
        message:
          "Please provide all required fields: fname, lname, email, password, phone, gender, dob",
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await pool.query(
      "INSERT INTO users (fname, lname, email, password, phone, gender, dob) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [fname, lname, email, hashedPassword, phone, convertGender(gender), dob]
    );

    res
      .status(201)
      .json({ message: "User added successfully", userId: result.insertId });
    console.log("User Registered Successfully");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding user", error: error.message });
  }
};
