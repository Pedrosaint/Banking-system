// // import { useEffect } from "react";

// // const RequireAuth = ({
// //   allowedRole,
// //   children,
// // }: {
// //   allowedRole: string;
// //   children: React.ReactNode;
// // }) => {
// //   const token = localStorage.getItem("authToken");
// //   const role = localStorage.getItem("userRole");

// //   useEffect(() => {
// //     if (!token || role !== allowedRole) {
// //       window.location.href = "/index.html";
// //     }
// //   }, []);

// //   // Show nothing until validation completes
// //   if (!token || role !== allowedRole) {
// //     return null;
// //   }

// //   return <>{children}</>;
// // };

// // export default RequireAuth;



// import { useEffect, useState } from "react";
// import { useLocation, Navigate } from "react-router-dom";

// const RequireAuth = ({
//   allowedRole,
//   children,
// }: {
//   allowedRole: string;
//   children: React.ReactNode;
// }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAllowed, setIsAllowed] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     const role = localStorage.getItem("userRole");

//     if (token && role === allowedRole) {
//       setIsAllowed(true);
//     } else {
//       setIsAllowed(false);
//     }

//     setIsLoading(false);
//   }, []);

//   if (isLoading) return null;

//   if (!isAllowed) {
//     return <Navigate to="/index.html" replace state={{ from: location }} />;
//   }

//   return <>{children}</>;
// };

// export default RequireAuth;
