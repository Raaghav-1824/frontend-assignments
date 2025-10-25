import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import useAuthStore from "./store/app.store";
import "./App.scss";
import { MainLayout } from "./components/MainLayout";
import { useDisclosure } from "@mantine/hooks";

// Pages
import { Homepage } from "./pages/landing/Homepage";
import LoginPage from "./pages/auth/Login";
import ResourceList from "./pages/resources/ResourceList";
import LaunchDetailPage from "./pages/DetailPage/LaunchDetailPage";
import { CompanyInfo } from "./components/CompanyInfo";
import RocketPage from "./pages/RocketPage";
import PayloadDetailCard from "./components/PayloadDetailCard";

// PrivateRoute Component
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default function App() {
  const { pathname } = useLocation();
  const [opened, { toggle }] = useDisclosure(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const isLoginPage = pathname === "/login";

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Main Layout for all other routes */}
        <Route
          path="/"
          element={<MainLayout isNavbarOpen={opened} toggleNavbar={toggle} />}
        >
          <Route index element={<Homepage isNavbarOpen={opened} />} />
          <Route
            path="resources/:endpoint"
            element={
              <PrivateRoute>
                <ResourceList />
              </PrivateRoute>
            }
          />
          <Route
            path="launch-details/:id"
            element={
              <PrivateRoute>
                <LaunchDetailPage />
              </PrivateRoute>
            }
          />
          <Route
            path="company-info"
            element={
              <PrivateRoute>
                <CompanyInfo />
              </PrivateRoute>
            }
          />
          <Route
            path="rocket/:rocketId"
            element={
              <PrivateRoute>
                <RocketPage />
              </PrivateRoute>
            }
          />
          <Route path="payload/:payloadId" element={<PayloadDetailCard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </MantineProvider>
  );
}
