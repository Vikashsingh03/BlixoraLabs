import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";

const AdminPanel = () => {
  const [simulations, setSimulations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [newSim, setNewSim] = useState({
    title: "",
    category: "",
    level: "",
    status: "Draft",
  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchSimulations();
  }, []);

  const fetchSimulations = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/simulations");
      setSimulations(res.data);
    } catch (err) {
      console.error("Failed to fetch simulations:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/simulations/${id}`);
      setSimulations(simulations.filter((sim) => sim._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEditClick = (sim) => {
    setEditingId(sim._id);
    setEditedData(sim);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`http://localhost:8000/api/simulations/${id}`, editedData);
      const updatedList = simulations.map((sim) =>
        sim._id === id ? { ...editedData, _id: id } : sim
      );
      setSimulations(updatedList);
      setEditingId(null);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewSim({ ...newSim, [name]: value });
  };

  const handleAddSimulation = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/simulations", newSim);
      await fetchSimulations();
      setNewSim({ title: "", category: "", level: "", status: "Draft" });
      setShowAddForm(false);
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
          Admin Panel – Manage Simulations
        </h2>

       
        <div className="w-full overflow-x-auto bg-white shadow-md rounded-xl">
          <table className="min-w-[600px] w-full text-sm">
            <thead className="bg-purple-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Level</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {simulations.map((sim) => (
                <tr key={sim._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    {editingId === sim._id ? (
                      <input
                        type="text"
                        name="title"
                        value={editedData.title}
                        onChange={handleEditChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      <span className="font-medium text-gray-900">{sim.title}</span>
                    )}
                  </td>
                  <td className="p-3">
                    {editingId === sim._id ? (
                      <input
                        type="text"
                        name="category"
                        value={editedData.category}
                        onChange={handleEditChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      sim.category
                    )}
                  </td>
                  <td className="p-3">
                    {editingId === sim._id ? (
                      <input
                        type="text"
                        name="level"
                        value={editedData.level}
                        onChange={handleEditChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      sim.level
                    )}
                  </td>
                  <td className="p-3">
                    {editingId === sim._id ? (
                      <select
                        name="status"
                        value={editedData.status}
                        onChange={handleEditChange}
                        className="border rounded px-2 py-1 w-full"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                      </select>
                    ) : (
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                          sim.status === "Published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {sim.status}
                      </span>
                    )}
                  </td>
                  <td className="p-3 space-x-2">
                    {editingId === sim._id ? (
                      <button
                        onClick={() => handleSave(sim._id)}
                        className="text-green-600 hover:text-green-800 font-semibold text-sm"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditClick(sim)}
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                      >
                        <Pencil size={16} />
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(sim._id)}
                      className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 text-sm"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Add Simulation Button & Form — Now Below the Table */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition duration-200"
          >
            {showAddForm ? "Cancel" : "➕ Add New Simulation"}
          </button>
        </div>

        {showAddForm && (
          <form
            onSubmit={handleAddSimulation}
            className="bg-white mt-6 p-6 rounded-md shadow-md max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="title"
              value={newSim.title}
              onChange={handleAddChange}
              placeholder="Title"
              className="border px-3 py-2 rounded"
              required
            />
            <input
              type="text"
              name="category"
              value={newSim.category}
              onChange={handleAddChange}
              placeholder="Category"
              className="border px-3 py-2 rounded"
              required
            />
            <input
              type="text"
              name="level"
              value={newSim.level}
              onChange={handleAddChange}
              placeholder="Level"
              className="border px-3 py-2 rounded"
              required
            />
            <select
              name="status"
              value={newSim.status}
              onChange={handleAddChange}
              className="border px-3 py-2 rounded"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
            <div className="sm:col-span-2 text-right">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Add Simulation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
