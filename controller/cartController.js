const { Cart } = require("../model/CartSchema");

const addToCart = async (req, res) => {
  const id = req.user._id;
  const productId = req.body._id;
  const product = await Cart.findOne({ userId: id });
  if (product) {
    product.productId.push(productId);
    await product.save();
  } else {
    const newProductTocart = new Cart({
      userId: id,
      productId: productId,
    });
    await newProductTocart.save();
  }
  res.status(200).json("successfully added");
};

const getCartItems = async (req, res) => {
  const userId = req.user._id;
  const cartItems = await Cart.findOne({ userId }).populate("productId");
  res.status(200).json(cartItems?.productId);
};

const removeItem = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user._id;
  const cartItems = await Cart.findOne({ userId });
  if (!cartItems) {
    return res.status(404).json({ error: "Cart not found" });
  }
  await Cart.updateOne({ userId }, { $pull: { productId: productId } });
  res.status(200).json("item removed");
};
module.exports = { addToCart, getCartItems, removeItem };
