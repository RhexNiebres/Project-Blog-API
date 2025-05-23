import { useState } from "react";
import { login } from "../services/Auth";
import NavBar from "../components/NavBar";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(credentials);
      localStorage.setItem("token", data.token);
      localStorage.setItem("authorId", data.id);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="py-15 hide-scrollbar flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-5xl font-bold text-black mb-6">Login</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form
          onSubmit={handleLogin}
          className="bg-white p-7 rounded-lg shadow-lg w-80"
        >
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-500 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
