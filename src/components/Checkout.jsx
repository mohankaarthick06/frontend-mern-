import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:3000";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      const res = await fetch(`${API_BASE}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setCart(Array.isArray(data) ? data : (data.cart || []));
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => {
      const price = item.productId?.price || 0;
      return sum + (price * item.quantity);
    }, 0);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    if (!address.street || !address.city || !address.state || !address.zipCode || !address.country) {
      alert("Please fill all address fields");
      return;
    }

    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ shippingAddress: address })
      });

      const data = await res.json();
      if (res.ok) {
        alert("Order placed successfully!");
        navigate("/orders");
      } else {
        alert(data.error || "Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Checkout</h1>

      <div style={{ marginTop: "30px" }}>
        <h2>Order Summary</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item._id} style={{ padding: "10px 0", borderBottom: "1px solid #ddd" }}>
                <p><strong>{item.productId?.name || "Unknown"}</strong></p>
                <p>₹{item.productId?.price || 0} x {item.quantity} = ₹{(item.productId?.price || 0) * item.quantity}</p>
              </div>
            ))}
            <div style={{ marginTop: "15px", fontSize: "20px", fontWeight: "bold" }}>
              Total: ₹{calculateTotal()}
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>Shipping Address</h2>
        <form onSubmit={handlePlaceOrder}>
          <div style={{ marginBottom: "15px" }}>
            <label>Street:</label>
            <input
              type="text"
              value={address.street}
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              required
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>City:</label>
            <input
              type="text"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              required
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>State:</label>
            <input
              type="text"
              value={address.state}
              onChange={(e) => setAddress({ ...address, state: e.target.value })}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              required
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Zip Code:</label>
            <input
              type="text"
              value={address.zipCode}
              onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              required
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Country:</label>
            <input
              type="text"
              value={address.country}
              onChange={(e) => setAddress({ ...address, country: e.target.value })}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || cart.length === 0}
            style={{
              backgroundColor: "#ff6600",
              color: "white",
              padding: "12px 30px",
              border: "none",
              cursor: cart.length === 0 ? "not-allowed" : "pointer",
              fontSize: "16px",
              marginTop: "10px"
            }}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
