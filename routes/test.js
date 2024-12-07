var express = require("express");
var router = express.Router();

const isAuthenticated = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

// Example: Route accessible only by authenticated admin users
router.get(
    "/test",
    isAuthenticated("user"), // Ensure the user is authenticated
    authorization("admin"), // Ensure the user is an admin
    (req, res) => {
        res.status(200).json({ message: "Welcome, admin user!" });
    }
);

module.exports = router;
