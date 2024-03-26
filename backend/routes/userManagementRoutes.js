const express = require("express");
const router = express.Router();

const loginController = require("../controllers/userManagement/login");
const registerController = require("../controllers/userManagement/register");
const getUserDetailsController = require("../controllers/userManagement/getUserDetails");
const editProfileController = require("../controllers/userManagement/editProfile");
const verifyJwtTokenController = require("../controllers/userManagement/verifyJwtToken");

const authToken = require("../middleware/authToken");

router.post("/register", registerController.register);
router.post("/login", loginController.login);

router.post("/editProfile", authToken, editProfileController.editProfile);

router.post(
  "/getUserDetails",
  authToken,
  getUserDetailsController.getUserDetails
);

router.post("/verifyJWT", authToken, verifyJwtTokenController.verifyJwtToken);

module.exports = router;
