const pool = require("../../config/db");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.getUserDetails = async (req, res) => {
  try {
    const user_id = req.body.user_id;

    if (!user_id) {
      return res.status(400).json({
        message: "No User ID Provided. Internal Server Error",
        reqBody: req.body,
      });
    }

    const [users] = await pool.query("SELECT * FROM users WHERE id = ?", [
      user_id,
    ]);

    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "User not found " + user_id, error_code: "75432" });
    }

    const userData = users[0];

    res.json({ ...userData });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user details",
      error: error.message,
      reqBody: req.body,
    });
  }
};
