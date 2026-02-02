import { Navigate } from "react-router-dom";

function isAuthed() {
  return localStorage.getItem("lendsqr_auth") === "true";
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!isAuthed()) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
