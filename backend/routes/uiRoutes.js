const express = require("express");
const router = express.Router();
const path = require("path");

router.get("", (req, res) => {
  res.sendFile(path.join(__dirname, "../../jay_frontend/homePage.html"));
});

// Serve the login page or other frontend pages
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../../jay_frontend/login.html"));
});

// Serve the userDetails page
router.get("/user-details", (req, res) => {
  res.sendFile(path.join(__dirname, "../../jay_frontend/userDetails.html"));
});

router.get("/summarize", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../jay_frontend/generateQuestions.html")
  );
});

router.get("/edit_profile", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../jay_frontend/edit_user/edit_user.html")
  );
});

router.get("/mcq_screen", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../jay_frontend/edit_wuser/edit_user.html")
  );
});

module.exports = router;
