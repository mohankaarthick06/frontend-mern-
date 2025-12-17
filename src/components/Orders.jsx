import { useState, useEffect } from "react";

const API_BASE = "http://localhost:3000";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const token = sessionStorage.getItem("token");
      
      if (!token) {
        setError("Please login to view orders");
        return;
      }

      console.log('Fetching orders with token...');
      const res = await fetch(`${API_BASE}/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log('Response status:', res.status);
      const data = await res.json();
      console.log('Response data:', data);
      
      if (res.ok) {
        const list = Array.isArray(data) ? data : (data.orders || []);
        console.log('Setting orders:', list);
        setOrders(list);
      } else {
        setError(data.error || "Failed to load orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Error loading orders: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: "#ffa500",
      Processing: "#3498db",
      Shipped: "#9b59b6",
      Delivered: "#27ae60",
      Cancelled: "#e74c3c"
    };
    return colors[status] || "#95a5a6";
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>My Orders</h1>
        <button
          onClick={fetchOrders}
          style={{
            backgroundColor: "#ff6600",
            color: "white",
            padding: "8px 16px",
            border: "none",
            cursor: "pointer",
            borderRadius: "4px",
            fontSize: "14px"
          }}
        >
          🔄 Refresh
        </button>
      </div>

      {loading && <p>Loading orders...</p>}
      {error && <p style={{ color: "red", backgroundColor: "#ffe6e6", padding: "10px", borderRadius: "4px" }}><strong>Error:</strong> {error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p>You haven't placed any orders yet.</p>
      )}

      <div style={{ marginTop: "30px" }}>
        {orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "8px"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
              <div>
                <p style={{ margin: "5px 0" }}>
                  <strong>Order ID:</strong> {order._id}
                </p>
                <p style={{ margin: "5px 0" }}>
                  <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <span
                  style={{
                    backgroundColor: getStatusColor(order.status),
                    color: "white",
                    padding: "5px 15px",
                    borderRadius: "15px",
                    fontSize: "14px"
                  }}
                >
                  {order.status}
                </span>
              </div>
            </div>

            <div style={{ borderTop: "1px solid #eee", paddingTop: "15px" }}>
              <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>Products:</h3>
              {order.products && order.products.length > 0 ? (
                order.products.map((item, idx) => {
                  // Handle both populated (item.productId is object) and denormalized (item.name) formats
                  const productName = item.productId?.name || item.name || "Unknown Product";
                  const productPrice = item.productId?.price || item.price || 0;
                  const productImage = item.productId?.image || item.image;
                  const quantity = item.quantity || 0;
                  
                  return (
                    <div key={idx} style={{ 
                      display: "flex",
                      gap: "15px",
                      padding: "10px", 
                      backgroundColor: "#f9f9f9", 
                      marginBottom: "8px",
                      borderRadius: "4px",
                      alignItems: "flex-start"
                    }}>
                      {productImage && (
                        <img 
                          src={productImage} 
                          alt={productName}
                          style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "4px" }}
                        />
                      )}
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: "5px 0" }}>
                          <strong>{productName}</strong>
                        </p>
                        <p style={{ margin: "5px 0", color: "#666" }}>
                          Price: ₹{productPrice}
                        </p>
                        <p style={{ margin: "5px 0", color: "#666" }}>
                          Quantity: {quantity}
                        </p>
                        <p style={{ margin: "5px 0", color: "#ff6600", fontWeight: "bold" }}>
                          Subtotal: ₹{productPrice * quantity}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>No products in this order</p>
              )}
            </div>

            <div style={{ borderTop: "1px solid #eee", paddingTop: "15px", marginTop: "15px" }}>
              <p>
                <strong>Shipping Address:</strong> {order.shippingAddress?.street}, {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.zipCode}, {order.shippingAddress?.country}
              </p>
            </div>

            <div style={{ marginTop: "15px", fontSize: "18px", fontWeight: "bold", color: "#ff6600" }}>
              Total: ₹{order.totalAmount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
