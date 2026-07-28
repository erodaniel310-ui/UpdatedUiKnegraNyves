import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { subscribeAuth } from "../services/authService";

export default function ProtectedRoute({ children, redirectTo = "/login" }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = subscribeAuth((currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  // Loading state while checking authentication
  if (user === undefined) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-12 h-12 rounded-full border-4 border-[#D4AF37] border-t-transparent animate-spin" />
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Logged in
  return children;
}