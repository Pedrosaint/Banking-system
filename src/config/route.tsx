import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "../general/layout/app/app-layout";
import DashboardLayout from "../general/layout/dashboard/dashboard-layout";
import HomeView from "../domain/user/Home/view/home-view";
import LocalTransferView from "../domain/user/local-transfer/view/local-transfer-view";
import InternationalTransferView from "../domain/user/international-transfer/view/internationl-transfer-view";
import DepositView from "../domain/user/deposit/view/deposit-view";
import ProfileView from "../domain/user/profile/view/profile-view";
import AdminHomeView from "../domain/admin/Home/view/admin-home.view";
// import RequireAuth from "../general/layout/app/protected-route";

 const route = createBrowserRouter([
   {
     path: "/",
     element: <Navigate to="/index.html" replace />,
    },
   {
     path: "user",
     element: (
         <AppLayout />
     ),
     children: [
       {
         path: "dashboard",
         element: (
           
             <DashboardLayout />
        
         ),
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
         ],
       },
     ],
   },
   {
     path: "admin",
     element: (
      
         <AppLayout />
   
     ),
     children: [
       {
         path: "dashboard",
         element: (
          
             <DashboardLayout />
      
         ),
         children: [
           {
             path: "home",
             element: <AdminHomeView />,
           },
           // {
           //     path: "logout",
           //     element: <InternationalTransferView />
           // }
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