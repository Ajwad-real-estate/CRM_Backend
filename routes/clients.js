var express = require("express");
const { store } = require("../controllers/client.controller");
var router = express.Router();

router.post("/", store);

module.exports = router;
