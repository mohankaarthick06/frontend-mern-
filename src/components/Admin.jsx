import { useEffect, useState } from "react";

const API_BASE = "http://localhost:3000";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: ""
  });

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/products`);
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.name && formData.price) {
      try {
        console.log('Submitting product:', { name: formData.name, price: formData.price });
        const res = await fetch(`${API_BASE}/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: formData.name, price: parseFloat(formData.price), image: formData.image })
        });
        console.log('Response status:', res.status);
        if (!res.ok) {
          const errorData = await res.json();
          console.error('Error response:', errorData);
          throw new Error(errorData.error || "Failed to create product");
        }
        const result = await res.json();
        console.log('Product created:', result);
        const refreshed = await fetch(`${API_BASE}/products`);
        setProducts(await refreshed.json());
        setFormData({ name: "", price: "", image: "" });
        alert("Product added successfully!");
      } catch (e) {
        console.error('Error adding product:', e);
        alert("Error adding product: " + e.message);
      }
    } else {
      alert("Please fill in both name and price");
    }
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Admin Dashboard</h1>
      
      <div style={{ marginTop: "30px" }}>
        <h2>Add Product</h2>
        
        <form onSubmit={handleSubmit} style={{ marginTop: "15px" }}>
          <div style={{ marginBottom: "10px" }}>
            <label>Product Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              required
            />
          </div>
          
          <div style={{ marginBottom: "15px" }}>
            <label>Price:</label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              required
            />
          </div>
          
          <div style={{ marginBottom: "15px" }}>
            <label>Image URL:</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://example.com/image.jpg"
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          
          <button
            type="submit"
            style={{ backgroundColor: "#ff6600", color: "white", padding: "10px 20px", border: "none", cursor: "pointer" }}
          >
            Add Product
          </button>
        </form>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>All Products</h2>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div style={{ marginTop: "15px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
          {products.map((product) => {
            const productId = product._id || product.id;
            return (
              <div key={productId} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
                {product.image && <img src={product.image} alt={product.name} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "5px" }} />}
                <p style={{ marginTop: "10px" }}><strong>{product.name}</strong></p>
                <p>₹{product.price}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Admin;
