import { useState } from "react";
import { signup } from "../services/AuthService";

const Signup = () => {
  const [credentials, setCredentials] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const data = await signup({
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
      });

      alert("Signup successful! Please log in.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={credentials.confirmPassword}
          onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
