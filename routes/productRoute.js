const router = require("express").Router();
const {
  addProducts,
  getProducts,
  getProduct,
} = require("../controller/productController");
const AsyncFunction = require("../middleware/TryCatch");
const verifyToken = require("../middleware/verifyToken");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
router.post(
  "/add-product",
  verifyToken,
  upload.single("image"),
  AsyncFunction(addProducts)
);
router.get("/products", AsyncFunction(getProducts));
router.get("/:productId", AsyncFunction(getProduct));

module.exports = router;
