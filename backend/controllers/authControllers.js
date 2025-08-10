import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body


    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ message: "User already exists" })


    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({ name, email, passwordHash })
    const savedUser = await newUser.save()


    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role, 
      }
    })
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

   
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: "User not found" })

  
    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" })

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    })

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message })
  }
}
