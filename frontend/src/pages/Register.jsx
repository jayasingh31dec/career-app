
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

//  await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, {
//         name,
//         email,
//         password,
//       });

await axios.post("https://career-app-2-9zzo.onrender.com/api/register", {
  name,
  email,
  password,
});

      alert("Registered successfully");

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Register</h2>

        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p>
          Already have account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;