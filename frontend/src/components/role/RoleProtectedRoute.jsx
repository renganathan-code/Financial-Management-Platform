import { Navigate } from "react-router-dom";

const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const token = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");

  // Check whether the user is logged in
  if (!token || !savedUser) {
    return <Navigate to="/login" replace />;
  }

  let user;

  try {
    user = JSON.parse(savedUser);
  } catch {
    return <Navigate to="/login" replace />;
  }

  // Check the user's role
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  // Allow access
  return children;
};

export default RoleProtectedRoute;