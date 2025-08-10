import Simulation from "../models/simulation.js"

export const getAllSimulations = async (req, res) => {
  try {
    const data = await Simulation.find().sort({ createdAt: -1 })
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
};

export const createSimulation = async (req, res) => {
  try {
    const newSim = new Simulation(req.body)
    await newSim.save()
    res.status(201).json({ message: "Simulation added successfully" })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
};

export const updateSimulation = async (req, res) => {
  try {
    await Simulation.findByIdAndUpdate(req.params.id, req.body)
    res.json({ message: "Simulation updated" })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const deleteSimulation = async (req, res) => {
  try {
    await Simulation.findByIdAndDelete(req.params.id)
    res.json({ message: "Simulation deleted" })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
