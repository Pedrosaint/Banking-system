import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';

import AppSidebar from './app-sidebar';
import { FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { User } from '../../../models/type';
import { fetchAllUsers } from '../../../domain/admin/Home/api/admin-endpoints.api';
// import { GiHamburgerMenu } from 'react-icons/gi';

export default function AppLayout() {
  const [showSidebar, setShowSidebar] = useState(false); 
    const [user, setUser] = useState<User | null>(null);
  
    useEffect(() => {
      const userId = localStorage.getItem("userId");
  
      const loadUser = async () => {
        try {
          const response = await fetchAllUsers();
          const foundUser = response.users.find((u) => u.id === userId);
          if (foundUser) {
            setUser(foundUser);
          }
        } catch (error) {
          console.error("Error loading user:", error);
        }
      };
  
      loadUser();
    }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");
    const currentPath = window.location.pathname;

    if (!token) {
      window.location.href = "/index.html";
    }

    // ✅ Only redirect if not already on the correct route
    if (role === "admin" && !currentPath.startsWith("/admin/dashboard/home")) {
      window.location.replace("/admin/dashboard/home");
    } else if (role === "user" && !currentPath.startsWith("/user/dashboard/home")) {
      window.location.replace("/user/dashboard/home");
    }
  }, []);
  

  return (
    <>
      {/* Header stays at the top */}
      <header className="bg-blue-900 text-white sticky top-0 z-20 w-full py-4 px-4 lg:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 lg:gap-4 justify-between whitespace-nowrap">
            <img
              src="/logo.png"
              alt="Banking logo"
              className="bg-white p-2 rounded-full cursor-pointer"
            />
            <h1 className="text-xl font-bold">World Bank</h1>
          </div>

          <div className="flex items-center gap-4 w-full justify-end">
            <div className="rounded-2xl bg-[#0d092944] items-center gap-2 p-2 text-sm w-full max-w-xs hidden md:flex">
              <FaSearch size={20} className="text-gray-200" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-white placeholder-gray-300 w-full"
              />
            </div>
            {user && (
              <img
                src={user?.profileImageUrl}
                alt=""
                className="w-10 h-10 rounded-full hidden md:block"
              />
            )}
          </div>
        </div>

        {/* Search bar on mobile */}
        <div className="rounded-2xl bg-[#0d092944] flex items-center gap-2 p-2 text-sm w-full  mt-5 md:hidden">
          <FaSearch size={20} className="text-gray-200" />
          <input
            type="text"
            placeholder="search"
            className="bg-transparent outline-none text-white placeholder-gray-300 w-full"
          />
        </div>
      </header>

      {/* Main layout with sidebar + page content */}
      <main className="flex min-h-screen bg-[#F5F6FA]">
        {/* Sidebar */}
        <aside className="hidden w-[250px] lg:block">
          <AppSidebar />
        </aside>

        {/* Sidebar on tablet (overlay style) */}
        {showSidebar && (
          <div
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setShowSidebar(false)}
          >
            <div
              className="absolute left-0 top-0 h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <AppSidebar onClose={() => setShowSidebar(false)} />
            </div>
          </div>
        )}

        {/* Page content */}
        <div className="flex flex-col flex-1 w-full md:p-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="flex-1"
          >
            <Outlet />
          </motion.div>

          {/* Footer */}
          <footer className="my-2 flex w-full items-center justify-center text-[10px] text-gray-500">
            &copy; {new Date().getFullYear()} Banking system. All Rights
            Reserved.
          </footer>
        </div>
      </main>

      {/* Mobile Footer Nav - now always rendered */}
      <div className="block lg:hidden">
        <AppSidebar />
      </div>
    </>
  );
}
