import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthenticationLayout } from "./components/Authentication/AuthenticationLayout";
import { ForgotPassword } from "./components/Authentication/ForgotPassword";
import { Login } from "./components/Authentication/Login";
import { Logout } from "./components/Authentication/Logout";
import { Register } from "./components/Authentication/Register";
import { RegistrationSuccess } from "./components/Authentication/RegistrationSuccessful";
import { ResetPassword } from "./components/Authentication/ResetPassword";
import { Dashboard } from "./components/Dashboard";
import { CreateOrganization } from "./components/Organizations/CreateOrganization";
import { Organization } from "./components/Organizations/Organization";
import { Organizations } from "./components/Organizations/Organizations";
import { CreateProject } from "./components/Projects/CreateProject";
import { Projects } from "./components/Projects/Projects";
import { useAuth } from "./hooks/useAuth";
import { AuthLayout } from "./layouts/AuthLayout";
import { NoAuthLayout } from "./layouts/NoAuthLayout";

function PrivateRoute({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export function Router() {
  return (
    <Routes>
      <Route element={<NoAuthLayout />}>
        <Route index element={<Navigate to="/login" />} />
        <Route element={<AuthenticationLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-success" element={<RegistrationSuccess />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />
        </Route>
      </Route>

      <Route
        element={
          <PrivateRoute>
            <AuthLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/new" element={<CreateProject />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/organization/create" element={<CreateOrganization />} />
        <Route path="/organization/:organizationId" element={<Organization />} />
      </Route>
    </Routes>
  );
}
