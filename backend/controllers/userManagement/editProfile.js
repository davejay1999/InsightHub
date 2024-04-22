const pool = require("../../config/db");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const convertGender = require("../../utils/convertGender");

const bcrypt = require("bcrypt");
const SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.editProfile = async (req, res) => {
  console.log("Edit Profile of User - " + JSON.stringify(req.body));

  const { fname, lname, password, phone, gender, dob, user_id } = req.body;

  // Check if all required fields are provided
  if (!fname || !lname || !password || !phone || !gender || !dob) {
    return res.status(400).json({
      message:
        "Please provide all required fields: fname, lname, password, phone, gender, dob",
    });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await pool.query(
      "UPDATE users SET fname = ?, lname = ?, password = ?, phone = ?, gender = ?, dob = ? WHERE id = ?",
      [fname, lname, hashedPassword, phone, convertGender(gender), dob, user_id]
    );

    res
      .status(201)
      .json({ message: "User Edited successfully", userId: user_id });

    console.log("Edited Profile Successfully");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error editing user", error: error.message });
  }
};
