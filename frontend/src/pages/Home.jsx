
const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-6 py-10 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-4">
        Welcome to <span className="text-purple-700">Blixora Labs</span>
      </h1>
      <p className="text-gray-700 text-base sm:text-lg mb-6">
        Simulate. Solve. Succeed. <br />
        Explore tech simulations & build your future.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="/simulations"
          className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
        >
          Browse Simulations
        </a>
        <a
          href="/login"
          className="bg-white border border-blue-600 text-blue-700 px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
        >
          Login
        </a>
      </div>
    </div>
  );
};

export default Home;
