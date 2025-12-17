import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const role = sessionStorage.getItem("role");
  
  if (role === "admin") {
    return children;
  }
  
  return <Navigate to="/" />;
};

export default AdminRoute;
