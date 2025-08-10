import User from "../models/User.js"


export const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId

    const user = await User.findById(userId).select("-passwordHash")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
