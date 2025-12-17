import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (email && password) {
      try {
        const res = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Login failed");
          return;
        }

        // Persist auth for route guards
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("token", data.token);
        // Navigate all authenticated users to Admin page as requested
        sessionStorage.setItem("role", "admin");

        navigate("/admin");
        setPassword("");
        setError("");
      } catch (err) {
        setError("Network error. Please try again.");
      }
    }
  };

  return (
    <div style={{ padding: "50px 20px" }}>
      <h2 style={{ textAlign: "center" }}>Login</h2>
      
      <form onSubmit={handleLogin} style={{ maxWidth: "400px", margin: "20px auto" }}>
        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            required
          />
        </div>
        
        <div style={{ marginBottom: "15px" }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            required
          />
        </div>
        
        <button type="submit" style={{ width: "100%", backgroundColor: "#ff6600", color: "white", padding: "10px", border: "none", cursor: "pointer" }}>
          Login
        </button>
      </form>
      
      <p style={{ textAlign: "center", fontSize: "12px", marginTop: "10px" }}>
        Login with your registered email and password.
      </p>
    </div>
  );
};

export default Login;
