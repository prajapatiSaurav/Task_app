import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        { email, password }
      );

      alert("Registration successful");
      navigate("/");
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
      <h2>Register</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

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

      <button onClick={handleRegister}>Register</button>

      <p>
        Already have an account?{" "}
        <button onClick={() => navigate("/")}>
          Login
        </button>
      </p>
    </div>
  );
}