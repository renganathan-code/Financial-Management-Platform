import { Route, Routes } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import RoleProtectedRoute from "./components/role/RoleProtectedRoute";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/admin"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard/>
            </RoleProtectedRoute>
          }
        ></Route>

        <Route
          path="/dashboard"
          element={
            <RoleProtectedRoute allowedRoles={["admin", "user"]}>
              <Dashboard />
            </RoleProtectedRoute>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
