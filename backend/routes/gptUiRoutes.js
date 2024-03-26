const express = require("express");
const router = express.Router();
const path = require("path");

router.get("", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/homePage.html"));
});

// Serve the login page or other frontend pages
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/login.html"));
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

router.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/index.html"));
});

module.exports = router;
