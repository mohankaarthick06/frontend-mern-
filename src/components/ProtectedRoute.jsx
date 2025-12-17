import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  
  if (isLoggedIn === "true") {
    return children;
  }
  
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
