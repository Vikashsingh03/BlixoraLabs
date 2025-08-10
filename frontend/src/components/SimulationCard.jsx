import { useState, useEffect } from "react";
import axios from "axios";

const Simulations = () => {
  const [simulations, setSimulations] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSimulations = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/simulations");
        setSimulations(res.data);
      } catch (err) {
        console.error("Simulation fetch error", err);
      }
    };

    const fetchEnrollments = async () => {
      try {
        if (!token) return;
        const res = await axios.get("http://localhost:8000/api/enrollments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEnrolledIds(res.data.map((e) => e.simulation._id));
      } catch (err) {
        console.error("Enrollment fetch error", err);
      }
    };

    fetchSimulations();
    fetchEnrollments();
  }, [token]);

  const handleEnroll = async (simId) => {
    if (!token) return;

    try {
      await axios.post(
        "http://localhost:8000/api/enrollments",
        { simulationId: simId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEnrolledIds((prev) => [...prev, simId]);
    } catch (err) {
      console.error("Enroll failed", err);
    }
  };

  const filteredSimulations = simulations.filter((sim) => {
    const matchCategory = filterCategory === "All" || sim.category === filterCategory;
    const matchSearch = sim.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
          Browse Simulations
        </h2>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Search simulations..."
            className="w-full sm:w-1/2 px-4 py-2 rounded-md border border-gray-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="w-full sm:w-1/3 px-4 py-2 rounded-md border border-gray-300"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option>All</option>
            <option>Cybersecurity</option>
            <option>AI</option>
            <option>Cloud</option>
          </select>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSimulations.map((sim) => (
            <div
              key={sim._id}
              className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{sim.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{sim.description}</p>
              <p className="text-xs text-gray-600">
                <strong>Category:</strong> {sim.category}
              </p>
              <p className="text-xs text-gray-600">
                <strong>Level:</strong> {sim.level}
              </p>
              <p className="text-xs text-gray-600">
                <strong>Duration:</strong> {sim.duration}
              </p>

              <button
                onClick={() => handleEnroll(sim._id)}
                disabled={enrolledIds.includes(sim._id)}
                className={`mt-4 px-4 py-1.5 rounded text-sm text-white transition ${
                  enrolledIds.includes(sim._id)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {enrolledIds.includes(sim._id) ? "Enrolled" : "Enroll"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Simulations;
