import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { ROLES } from "./constants/roles";
import { useRole } from "./hooks/useRole";

import AppLayout from "./components/AppLayout";
import PrivateRoute from "./components/PrivateRoute";
import RoleRoute from "./components/RoleRoute";

import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import UserFormPage from "./pages/UserFormPage";
import PaymentsPage from "./pages/PaymentsPage";
import ReportsPage from "./pages/ReportsPage";
import ForbiddenPage from "./pages/ForbiddenPage";
import NotFoundPage from "./pages/NotFoundPage";

const HomeRedirect = () => {
  const { hasRole } = useRole();
  if (hasRole(ROLES.ADMIN)) return <Navigate to="/users" replace />;
  if (hasRole(ROLES.PAYMENT)) return <Navigate to="/payments" replace />;
  if (hasRole(ROLES.REPORTS)) return <Navigate to="/reports" replace />;
  return <Navigate to="/forbidden" replace />;
};

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
          }
        />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<HomeRedirect />} />

          <Route
            path="users"
            element={
              <RoleRoute roles={[ROLES.ADMIN]}>
                <UsersPage />
              </RoleRoute>
            }
          />
          <Route
            path="users/create"
            element={
              <RoleRoute roles={[ROLES.ADMIN]}>
                <UserFormPage />
              </RoleRoute>
            }
          />
          <Route
            path="users/:id/edit"
            element={
              <RoleRoute roles={[ROLES.ADMIN]}>
                <UserFormPage />
              </RoleRoute>
            }
          />

          <Route
            path="payments"
            element={
              <RoleRoute roles={[ROLES.PAYMENT]}>
                <PaymentsPage />
              </RoleRoute>
            }
          />

          <Route
            path="reports"
            element={
              <RoleRoute roles={[ROLES.REPORTS]}>
                <ReportsPage />
              </RoleRoute>
            }
          />

          <Route path="forbidden" element={<ForbiddenPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
