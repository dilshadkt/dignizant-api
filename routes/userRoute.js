const router = require("express").Router();
const { currentUser } = require("../controller/userController");
const verifyToken = require("../middleware/verifyToken");
const AsyncFunction = require("../middleware/TryCatch");
router.get("/me", verifyToken, AsyncFunction(currentUser));
module.exports = router;
