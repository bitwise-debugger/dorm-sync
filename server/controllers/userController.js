import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ name, email, password, role });

  res.status(201).json({
    id: user._id,
    name: user.name,
    role: user.role,
    token: generateToken(user),
  });
};
// Register is useless yet

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    id: user._id,
    name: user.name,
    role: user.role,
    phone: user.phone,
    messOpen: user.messOpen,
    room: user.room,
    profilePicture: user.profilePicture,
    token: generateToken(user),
  });
};

export const me = (req, res) => {
  res.json(req.user);
}