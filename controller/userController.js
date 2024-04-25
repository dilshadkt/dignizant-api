const { User } = require("../model/UserSchema");

const currentUser = async (req, res) => {
  const userId = req.user._id;
  const currentUser = await User.findOne({ _id: userId });
  if (!currentUser) {
    res.status(400).json({ message: "user not found" });
  }
  res.status(200).json(currentUser);
};

module.exports = { currentUser };
