const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  size: {
    type: String,
    enum: ["S", "M", "L"],
    default: "M",
  },
  color: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);
exports.Product = Product;
