import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:3000";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const token = sessionStorage.getItem("token");
        const cartRes = await fetch(`${API_BASE}/cart`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        const data = await cartRes.json();
        setCartItems(Array.isArray(data) ? data : (data.cart || []));
      } catch (e) {
        setError("Failed to load cart");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function getProduct(item) {
    // MongoDB populates productId as an object
    if (item.productId && typeof item.productId === 'object') {
      return item.productId;
    }
    return { name: "Product", price: 0, image: "" };
  }

  async function removeItem(id) {
    const token = sessionStorage.getItem("token");
    await fetch(`${API_BASE}/cart/${id}`, {
      method: "DELETE",
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    const res = await fetch(`${API_BASE}/cart`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    const data = await res.json();
    setCartItems(Array.isArray(data) ? data : (data.cart || []));
  }

  async function updateQty(id, quantity) {
    const token = sessionStorage.getItem("token");
    await fetch(`${API_BASE}/cart/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ quantity })
    });
    const res = await fetch(`${API_BASE}/cart`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    const data = await res.json();
    setCartItems(Array.isArray(data) ? data : (data.cart || []));
  }

  async function handlePlaceOrder(e) {
    e.preventDefault();

    if (!address.street || !address.city || !address.state || !address.zipCode || !address.country) {
      alert("Please fill all address fields");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setOrderLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      console.log('Placing order with address:', address);

      const res = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ shippingAddress: address })
      });

      console.log('Order response status:', res.status);
      const data = await res.json();
      console.log('Order response:', data);

      if (res.ok) {
        console.log('✅ Order placed successfully');
        alert("Order placed successfully!");
        setShowCheckout(false);
        setAddress({ street: "", city: "", state: "", zipCode: "", country: "" });
        setTimeout(() => {
          navigate("/orders");
        }, 500);
      } else {
        console.error('Order creation failed:', data.error);
        alert(data.error || "Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order: " + error.message);
    } finally {
      setOrderLoading(false);
    }
  }

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const product = getProduct(item);
      return sum + (product.price || 0) * item.quantity;
    }, 0);
  }, [cartItems]);

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "30px" }}>Shopping Cart</h1>

      {showCheckout ? (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2>Order Summary</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div style={{ marginBottom: "40px" }}>
              {cartItems.map((item) => (
                <div key={item._id} style={{ padding: "10px 0", borderBottom: "1px solid #ddd" }}>
                  <p><strong>{getProduct(item).name}</strong></p>
                  <p>₹{getProduct(item).price} x {item.quantity} = ₹{(getProduct(item).price || 0) * item.quantity}</p>
                </div>
              ))}
              <div style={{ marginTop: "15px", fontSize: "20px", fontWeight: "bold" }}>
                Total: ₹{total}
              </div>
            </div>
          )}

          <h2>Shipping Address</h2>
          <form onSubmit={handlePlaceOrder}>
            <div style={{ marginBottom: "15px" }}>
              <label>Street:</label>
              <input
                type="text"
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing: "border-box" }}
                required
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>City:</label>
              <input
                type="text"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing: "border-box" }}
                required
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>State:</label>
              <input
                type="text"
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing: "border-box" }}
                required
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Zip Code:</label>
              <input
                type="text"
                value={address.zipCode}
                onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing: "border-box" }}
                required
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Country:</label>
              <input
                type="text"
                value={address.country}
                onChange={(e) => setAddress({ ...address, country: e.target.value })}
                style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing: "border-box" }}
                required
              />
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                type="button"
                onClick={() => setShowCheckout(false)}
                style={{
                  backgroundColor: "#ccc",
                  color: "black",
                  padding: "12px 30px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                  flex: 1
                }}
              >
                Back to Cart
              </button>
              <button
                type="submit"
                disabled={orderLoading}
                style={{
                  backgroundColor: "#ff6600",
                  color: "white",
                  padding: "12px 30px",
                  border: "none",
                  cursor: orderLoading ? "not-allowed" : "pointer",
                  fontSize: "16px",
                  flex: 1
                }}
              >
                {orderLoading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
          <div>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {cartItems.length === 0 ? (
              <p style={{ padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
                Your cart is empty. <a href="/products" style={{ color: "#ff6600", cursor: "pointer" }}>Continue shopping</a>
              </p>
            ) : (
              cartItems.map((item) => {
                const itemId = item._id || item.id;
                return (
                  <div key={itemId} style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "15px", display: "flex", gap: "15px" }}>
                    <img src={getProduct(item).image} alt={getProduct(item).name} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: "18px", marginBottom: "5px" }}>{getProduct(item).name}</h3>
                      <p>Price: ₹{getProduct(item).price}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span>Quantity:</span>
                        <button onClick={() => updateQty(itemId, Math.max(0, item.quantity - 1))}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQty(itemId, item.quantity + 1)}>+</button>
                      </div>
                      <p style={{ color: "#ff6600", fontWeight: "bold", marginTop: "5px" }}>Total: ₹{(getProduct(item).price || 0) * item.quantity}</p>
                    </div>
                    <button onClick={() => removeItem(itemId)} style={{ color: "red", border: "none", background: "none", cursor: "pointer" }}>Remove</button>
                  </div>
                );
              })
            )}
          </div>

          <div style={{ border: "1px solid #ccc", padding: "20px", height: "fit-content" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "15px" }}>Order Summary</h2>
            <div style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                <span>Subtotal:</span>
                <span>₹{total}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                <span>Shipping:</span>
                <span>₹50</span>
              </div>
              <hr style={{ margin: "10px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "18px" }}>
                <span>Total:</span>
                <span style={{ color: "#ff6600" }}>₹{total + 50}</span>
              </div>
            </div>
            <button
              onClick={() => setShowCheckout(true)}
              disabled={cartItems.length === 0}
              style={{
                backgroundColor: cartItems.length === 0 ? "#ccc" : "#ff6600",
                color: "white",
                padding: "12px",
                width: "100%",
                border: "none",
                cursor: cartItems.length === 0 ? "not-allowed" : "pointer",
                marginTop: "15px"
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
