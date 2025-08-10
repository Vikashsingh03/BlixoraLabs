import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

 
  useEffect(() => {
    if (!token || !user) {
      navigate("/login");
    }
  }, [navigate, token, user]);

 
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/enrollments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEnrollments(res.data);
      } catch (err) {
        console.error("❌ Failed to load enrollments", err);
      }
    };

    if (token) fetchEnrollments();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-2">
          Welcome, {user?.name} 👋
        </h2>
        <p className="text-center text-sm text-gray-600 mb-8">
          Here's your enrolled simulations
        </p>

        {enrollments.length === 0 ? (
          <p className="text-center text-gray-500">
            No simulations enrolled yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((enrollment, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-5 border-l-4 border-blue-500"
              >
                <h3 className="font-semibold text-lg text-gray-800 mb-1">
                  {enrollment.simulation?.title || "Simulation Title"}
                </h3>
                <p className="text-sm text-gray-600">
                  Level: {enrollment.simulation?.level || "N/A"}
                </p>
                <p className="mt-2 text-sm font-medium text-blue-600">
                  {enrollment.status || "Enrolled"}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/simulations"
            className="text-blue-600 hover:underline text-sm"
          >
            Browse more simulations →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
