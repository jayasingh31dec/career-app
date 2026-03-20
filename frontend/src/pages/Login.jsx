
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true); // ✅ start loading

      // ✅ clear old data
      localStorage.removeItem("token");
      localStorage.removeItem("name");

     const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, {
        email,
        password,
      });

      console.log("RESPONSE:", res.data); // ✅ debug

      // ✅ store token
      localStorage.setItem("token", res.data.token);

      // ✅ store name safely
      if (res.data.user && res.data.user.name) {
        localStorage.setItem("name", res.data.user.name);
      }

      alert("Login successful");

      navigate("/quiz");
    } catch (err) {
      console.log("ERROR:", err);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Welcome Back 👋</h2>

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* ✅ button with loading */}
        <button type="button" onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          New user? <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;