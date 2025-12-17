import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const role = sessionStorage.getItem("role");

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav style={{ backgroundColor: "#333", color: "white", padding: "15px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "0 auto" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          <h1 style={{ fontSize: "24px", margin: 0 }}>E-commerce</h1>
        </Link>

        <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
          <Link to="/products" style={{ color: "white", textDecoration: "none" }}>Products</Link>
          <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>Cart</Link>
          {isLoggedIn && <Link to="/orders" style={{ color: "white", textDecoration: "none" }}>Orders</Link>}
          {role === "admin" && <Link to="/admin" style={{ color: "white", textDecoration: "none" }}>Admin</Link>}
          {!isLoggedIn ? (
            <Link to="/login" style={{  color: "white", padding: "8px 15px", textDecoration: "none" }}>Login</Link>
          ) : (
            <button onClick={handleLogout} style={{  color: "white", padding: "8px 15px", border: "none", cursor: "pointer" }}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
