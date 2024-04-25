const router = require("express").Router();
const AsyncFunction = require("../middleware/TryCatch");
const { Signin, Login, AdminLogin } = require("../controller/authController");

router.post("/signin", AsyncFunction(Signin));
router.post("/login", AsyncFunction(Login));
router.post("/admin", AsyncFunction(AdminLogin));

module.exports = router;
