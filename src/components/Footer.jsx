const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#222", color: "#ccc", padding: "30px 20px", marginTop: "40px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px" }}>

        <div>
          <h3 style={{ color: "white", fontSize: "18px", marginBottom: "10px" }}>E-commerce</h3>
          <p style={{ fontSize: "14px" }}>Best online shop for electronics</p>
        </div>

        <div>
          <h3 style={{ color: "white", fontSize: "18px", marginBottom: "10px" }}>Links</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>Home</li>
            <li>Products</li>
            <li>Cart</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 style={{ color: "white", fontSize: "18px", marginBottom: "10px" }}>Contact</h3>
          <p style={{ fontSize: "14px" }}>Email: support@ecommerce.com</p>
          <p style={{ fontSize: "14px" }}>Phone: +91 9234567890</p>
        </div>

      </div>

      <p style={{ textAlign: "center", fontSize: "12px", marginTop: "20px", color: "#888" }}>
        © 2025 E-commerce. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
