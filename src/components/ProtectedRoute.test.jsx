import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

jest.mock("../services/authService", () => ({
  subscribeAuth: (callback) => {
    callback(null);
    return () => {};
  },
}));

test("redirects unauthenticated admins to the admin login page", () => {
  render(
    <MemoryRouter initialEntries={["/admin"]}>
      <Routes>
        <Route path="/admin/login" element={<div>Admin Login</div>} />
        <Route
          path="*"
          element={
            <ProtectedRoute redirectTo="/admin/login">
              <div>Admin Dashboard</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/admin login/i)).toBeInTheDocument();
});
