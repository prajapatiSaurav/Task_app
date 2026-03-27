import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return;
    }

    try {
      const res = await axios.post(
        "https://task-app-4rb8.onrender.com/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);

      setSuccess("Login successful! Redirecting...");

      setTimeout(() => {
        navigate("/tasks");
      }, 2000);

    } catch (err) {
      if (err.response) {
        setError(err.response.data.msg);
      } else if (err.request) {
        setError("Unable to connect to server. Please try again later.");
      } else {
        setError("Unexpected error occurred");
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p>
        Don’t have an account?{" "}
        <button onClick={() => navigate("/register")}>
          Register
        </button>
      </p>
    </div>
  );
}
