const Home = () => {
  const topProducts = [
    {
      id: 1,
      name: "Laptop",
      price: 50000,
      image: "https://picsum.photos/id/1/300/300"
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 4999,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuyVTZcYWzbQSd7zNNqHf-vIb6PU65_O_pvQ&s"
    },
    {
      id: 3,
      name: "Laptop Stand",
      price: 1499,
      image: "https://bestor.in/cdn/shop/files/Artboard_2_bc78dec9-766f-40d7-a7cc-2f40394b1c77.jpg?v=1719316028&width=1500"
    }
  ];

  return (
    <div>
      <div style={{ backgroundColor: "#ff6600", color: "white", padding: "60px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>Welcome to E-commerce</h1>
        <p style={{ fontSize: "18px", marginBottom: "20px" }}>Best products at best prices</p>
        <button style={{ backgroundColor: "white", color: "#ff6600", padding: "10px 30px", border: "none", cursor: "pointer", fontSize: "16px" }}>
          Shop Now
        </button>
      </div>

      <div style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "28px", textAlign: "center", marginBottom: "30px" }}>Top 3 Products</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
          {topProducts.map((product) => (
            <div key={product.id} style={{ border: "1px solid #ddd", padding: "15px" }}>
              <img src={product.image} alt={product.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              <h3 style={{ marginTop: "10px", fontSize: "18px" }}>{product.name}</h3>
              <p style={{ color: "#ff6600", fontSize: "20px", fontWeight: "bold", margin: "10px 0" }}>₹{product.price}</p>
              <button style={{ backgroundColor: "#ff6600", color: "white", padding: "8px", width: "100%", border: "none", cursor: "pointer" }}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
