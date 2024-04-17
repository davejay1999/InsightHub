const express = require("express");
const router = express.Router();
const path = require("path");

router.get("", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/home/homepage.html"));
});

// Serve the login page or other frontend pages
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/login/login.html"));
});

router.get("/user-details", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/userDetails.html"));
});

// Serve the userDetails page
router.get("/summary/upload_with_url", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../frontend/summary/upload_with_url.html")
  );
});

router.get("/edit_profile", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/edit_user.html"));
});

router.get("/user_history", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../frontend/user-management/user_history.html")
  );
});

router.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/index.html"));
});

module.exports = router;
