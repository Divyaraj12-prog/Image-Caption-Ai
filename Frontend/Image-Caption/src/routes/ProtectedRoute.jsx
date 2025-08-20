import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, ready } = useAuth();
  if (!ready) return <div className="p-8 text-center">Loading…</div>;
  if (!user)  return <Navigate to="/login" replace />;
  return children;
}
