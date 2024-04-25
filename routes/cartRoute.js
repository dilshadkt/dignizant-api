const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const {
  addToCart,
  getCartItems,
  removeItem,
} = require("../controller/cartController");
const AsynnFunction = require("../middleware/TryCatch");
router.post("/product", verifyToken, AsynnFunction(addToCart));
router.get("/products", verifyToken, AsynnFunction(getCartItems));
router.delete("/:productId", verifyToken, AsynnFunction(removeItem));
module.exports = router;
