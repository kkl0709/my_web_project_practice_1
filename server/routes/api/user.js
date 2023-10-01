import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user";
import config from "../../config";

const router = express.Router();
const { JWT_SECRET } = config;

console.log("JWT_SECRET", JWT_SECRET);

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      throw Error("No users");
    }
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.status.apply(200).json({ msg: e.message });
  }
});

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please fill in all field" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        msg: "User already exist",
      });
    }
    const newUser = new User({
      name,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;

    const user = await newUser.save();

    jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    });
  } catch (e) {
    console.error(err);
  }
});

export default router;
