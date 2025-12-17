import { useEffect, useState } from "react";

const API_BASE = "http://localhost:3000";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        console.log('Fetching products from', `${API_BASE}/products`);
        const res = await fetch(`${API_BASE}/products`);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        const data = await res.json();
        console.log('Products loaded:', data);
        setProducts(data);
      } catch (e) {
        console.error('Error loading products:', e);
        setError(`Failed to load products: ${e.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function addToCart(productId) {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("Please login to add items to your cart");
        return;
      }

      const res = await fetch(`${API_BASE}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Failed (HTTP ${res.status})`);
      }
      alert("Added to cart");
    } catch {
      alert("Failed to add to cart");
    }
  }

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", textAlign: "center", marginBottom: "30px" }}>All Products</h1>
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
        {products.map((product) => {
          const productId = product._id || product.id;
          return (
          <div key={productId} style={{ border: "1px solid #ccc", padding: "15px" }}>
            <img src={product.image} alt={product.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
            <h3 style={{ marginTop: "10px", fontSize: "18px" }}>{product.name}</h3>
            <p style={{ color: "#ff6600", fontSize: "20px", fontWeight: "bold", margin: "10px 0" }}>₹{product.price}</p>
            <button onClick={() => addToCart(productId)} style={{ backgroundColor: "#ff6600", color: "white", padding: "8px", width: "100%", border: "none", cursor: "pointer" }}>
              Add to Cart
            </button>
          </div>
        );
        })}
      </div>
    </div>
  );
};

export default Products;
