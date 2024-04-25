const { User, userValidation } = require("../model/UserSchema");
const bcrypt = require("bcrypt");

/////////////  SIGN IN ////////////////////

const Signin = async (req, res) => {
  const { error } = userValidation.validate(req.body);
  if (error) {
    res.status(400).json(error.details[0].message);
  }
  const isUserExist = await User.findOne({ email: req.body.email });

  if (isUserExist) {
    res.status(400).json({ message: "This email is already registered" });
  }
  const salt = await bcrypt.genSalt(10);
  const CurrentUser = new User(req.body);
  CurrentUser.password = await bcrypt.hash(
    CurrentUser.password.toString(),
    salt
  );
  const token = CurrentUser.generateToken();
  await CurrentUser.save();
  res.status(200).json({ CurrentUser, token });
};

///////////////// LOG IN ///////////////////

const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "email and password are requierd" });
  }
  const CurrentUser = await User.findOne({ email: email });
  if (!CurrentUser) {
    res.status(400).json("User not fount");
  }

  if (CurrentUser) {
    const validatePassword = await bcrypt.compare(
      req.body.password.toString(),
      CurrentUser.password
    );
    if (!validatePassword)
      return res.status(400).json({ message: "password is not correct" });
    const token = CurrentUser.generateToken();
    res.status(200).json({ CurrentUser, token });
  }
};

////////////// ADMIN LOGIN //////////////////
const AdminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "email and password are requierd" });
  }
  const CurrentUser = await User.findOne({ email: email });
  if (!CurrentUser) {
    res.status(400).json("User not fount");
  }
  if (CurrentUser) {
    const validatePassword = await bcrypt.compare(
      req.body.password.toString(),
      CurrentUser.password
    );
    if (!validatePassword)
      return res.status(400).json({ message: "password is not correct" });
    if (CurrentUser.isAdmin == false) {
      return res.status(400).json({ message: "you have no permission" });
    }
    const token = CurrentUser.generateToken();
    res.status(203).json({ CurrentUser, token });
  }
};
module.exports = { Signin, Login, AdminLogin };
