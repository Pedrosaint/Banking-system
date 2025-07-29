import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "../general/layout/app/app-layout";
import DashboardLayout from "../general/layout/dashboard/dashboard-layout";
import HomeView from "../domain/user/Home/view/home-view";
import LocalTransferView from "../domain/user/local-transfer/view/local-transfer-view";
import InternationalTransferView from "../domain/user/international-transfer/view/internationl-transfer-view";
import DepositView from "../domain/user/deposit/view/deposit-view";
import ProfileView from "../domain/user/profile/view/profile-view";
import AdminHomeView from "../domain/admin/Home/view/admin-home.view";
import { useEffect } from "react";
import Logout from "../domain/user/logout/logout";

// Create a component to handle the redirect
const RootRedirect = () => {
  useEffect(() => {
    // Check if we're already on index.html to prevent infinite loop
    if (!window.location.pathname.endsWith("landing.html")) {
      window.location.href = "/landing.html";
    }
  }, []);

  return <div className="text-center text-4xl text-red-700">Loading...</div>;
};

const route = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />,
  },
  {
    path: "user",
    element: <AppLayout />,
    children: [
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "home",
            element: <HomeView />,
          },
          {
            path: "transfer",
            element: <LocalTransferView />,
          },
          {
            path: "international-transfer",
            element: <InternationalTransferView />,
          },
          {
            path: "deposit",
            element: <DepositView />,
          },
          {
            path: "profile",
            element: <ProfileView />,
          },
          {
            path: "logout",
            element: <Logout />
          },
        ],
      },
    ],
  },
  {
    path: "admin",
    element: <AppLayout />,
    children: [
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "home",
            element: <AdminHomeView />,
          },
          {
            path: "logout",
            element: <Logout />
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/index.html" replace />,
  },
]);

export default route;