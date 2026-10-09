import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Temporary dashboard route */}
      <Route
        path="/dashboard"
        element={
          <div className="flex min-h-screen items-center justify-center">
            <h1 className="text-3xl font-bold text-primary">
              Dashboard
            </h1>
          </div>
        }
      />

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;