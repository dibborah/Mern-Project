const express = require("express");
const {
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
} = require("../controllers/userController");

const { isAuthenticatedUser,
     authorizeRoles
 } = require("../middleware/auth");

const router = express.Router();

router.route('/register').post(registerUser);

router.route("/login").post(loginUser);

// This route not working
router.route("/password/forgot").post(forgotPassword);

// // this route not working
// router.route("/password/reset/:token").put(resetPassword );

// router.route("/logout").get(logout);

// router.route("/me").get(isAuthenticatedUser, getUserDetails);

// // this route not working
// router.route("/password/update").put(isAuthenticatedUser, updatePassword);

// // this route not working
// router.route("/me/update").put(isAuthenticatedUser, updateProfile);

module.exports = router;

// regarding password all the functionalities are not working
// Forgot , reset and update password not working
