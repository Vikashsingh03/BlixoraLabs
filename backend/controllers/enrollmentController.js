import Enrollment from "../models/Enrollment.js"


export const enrollSimulation = async (req, res) => {
  try {
    const userId = req.userId
    const { simulationId } = req.body

    const existing = await Enrollment.findOne({ user: userId, simulation: simulationId })
    if (existing) {
      return res.status(200).json({ enrolled: true })
    }

    const newEnroll = new Enrollment({ user: userId, simulation: simulationId })
    await newEnroll.save()

    res.status(201).json({ enrolled: true })
  } catch (err) {
    res.status(500).json({ enrolled: false, error: "Enrollment failed" })
  }
}


export const getUserEnrollments = async (req, res) => {
  try {
    const userId = req.userId
    const enrollments = await Enrollment.find({ user: userId }).populate("simulation")
    res.json(enrollments)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch enrollments" })
  }
}
