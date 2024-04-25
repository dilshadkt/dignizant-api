const { uploader } = require("../config/Coudinary");
const { Product } = require("../model/ProductSchema");
const fs = require("fs");
const addProducts = async (req, res) => {
  if (!req.file) {
    res.status(400).json("image is required");
  }
  const image = await uploader.upload(req.file.path);

  fs.unlink(`./uploads/${image.original_filename}`, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("file removed");
    }
  });
  const newProduct = new Product(req.body);
  newProduct.image = image.url;
  await newProduct.save();
  const allProducts = await Product.find();
  res.send(allProducts);
};
const getProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
};

const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  res.status(200).json(product);
};

module.exports = { addProducts, getProducts, getProduct };
