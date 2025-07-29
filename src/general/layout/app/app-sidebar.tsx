import { useEffect, useState } from "react";
import { cn } from "../../../lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { adminNavControl, navControl } from "../../../utilis/sidebar-links";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { User } from "../../../models/type";
import { fetchAllUsers } from "../../../domain/admin/Home/api/admin-endpoints.api";

export default function AppSidebar({ onClose }: { onClose?: () => void }) {
  const [dateTime, setDateTime] = useState({
    date: "",
    time: "",
  });

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
    const updateDateTime = () => {
      const now = new Date();

      // Format date
      const dateOptions: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "long",
        year: "numeric",
      };
      const date = now.toLocaleDateString("en-US", dateOptions);

      // Format LOCAL time with AM/PM
      let hours = now.getHours();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const time = `${hours}:${minutes} ${ampm}`;

      setDateTime({ date, time });
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {setCurrentPath(location.pathname);}, [location, currentPath]);
 

  // Function to get responsive name
  const getResponsiveName = (name: string) => {
    if (name === "Local Transfer") return { full: name, short: "L.Transfer" };
    if (name === "International Transfer")
      return { full: name, short: "I.Transfer" };
    return { full: name, short: name };
  };

  // Filter out logout and identify the home icon
  const isAdminPath = location.pathname.startsWith("/admin");
  const role = useSelector((state: RootState) => state.auth.role);
  const isAdmin = role === "admin" || isAdminPath;
  const filteredNav = isAdmin ? adminNavControl : navControl;
  
  const homeNav = filteredNav.find((item) => item.name === "Home");
  const otherNav = filteredNav.filter(
    (item) => item.name !== "Home" && item.name !== "Logout"
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <section
        className={cn(
          "fixed z-20 h-screen bg-[#F5F6FA] px-1 transition-all duration-300 ease-in-out border-r border-gray-200",
          onClose ? "block w-[250px] md:w-[300px]" : "hidden lg:block w-[250px]"
        )}
      >
        <div className="flex h-full w-full flex-col gap-y-5 p-4 lg:w-[240px] relative">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-black hidden md:block"
            >
              <IoClose size={24} />
            </button>
          )}
          {user && (
            <div className="border-b border-gray-200 flex items-center gap-4 py-3">
              <img
                src={user?.profileImageUrl}
                alt=""
                className="rounded-full w-10 h-10"
              />
              <div>
                <h2>
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-[70%]">{user?.accountNumber}</p>
              </div>
            </div>
          )}
          <div className="border-b border-gray-200">
            <div className="px-5 pb-3">
              <h1>
                Date: {dateTime.date} <br />
                Time: {dateTime.time} UTC
              </h1>
            </div>
          </div>
          <ul className="flex flex-col gap-y-3">
            {filteredNav.map((data) => {
              const label = getResponsiveName(data.name);
              return (
                <div key={data.id}>
                  {data.section && (
                    <span className="text-xs font-bold">{data.section}</span>
                  )}
                  <Link to={data.path} className="block">
                    <motion.div
                      initial={false}
                      animate={
                        currentPath === data.path
                          ? { scale: 1.05 }
                          : { scale: 1 }
                      }
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className={cn(
                        "flex items-center gap-2 rounded-md p-2 text-xs",
                        currentPath === data.path
                          ? "bg-gradient-to-br from-blue-500 to-gray-900 text-white shadow-inner backdrop-blur-md"
                          : "hover:bg-gray-100 text-gray-700"
                      )}
                    >
                      {data.icon}
                      <span className="text-xs">
                        <span className="hidden sm:inline">{label.full}</span>
                        <span className="inline sm:hidden">{label.short}</span>
                      </span>
                    </motion.div>
                  </Link>
                </div>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ============Mobile Footer============= */}
      <div className="fixed bottom-0 left-0 z-30 w-screen md:hidden">
        {/* SVG U-curve background */}
        <div className="relative w-full h-15">
          <svg
            className="absolute bottom-0 left-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,100 L0,0 L30,0 C40,0 45,40 50,40 C55,40 60,0 70,0 L100,0 L100,100 Z"
              fill="#7F95D9"
            />
          </svg>

          {/* Home Button (center floating) */}
          {homeNav && (
            <Link
              to={homeNav.path}
              className="absolute left-1/2 transform -translate-x-1/2 -top-9 z-40"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="rounded-full bg-blue-600 p-4 shadow-xl text-white"
              >
                {homeNav.icon}
              </motion.div>
            </Link>
          )}

          {/* Left and Right Icons */}
          <div className="absolute bottom-0 left-0 w-full flex justify-between items-center px-6 pb-3">
            {/* Left Two Icons */}
            <div className="flex gap-5">
              {otherNav.slice(0, 2).map((item) => (
                <Link key={item.id} to={item.path}>
                  <div className="flex flex-col items-center text-gray-900 text-xs">
                    {item.icon}
                    <span className="text-xs">
                      {item.name === "Local Transfer"
                        ? "L.Transfer"
                        : item.name === "International Transfer"
                        ? "I.Transfer"
                        : item.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Right Two Icons */}
            <div className="flex gap-5 ">
              {otherNav.slice(2, 4).map((item) => (
                <Link key={item.id} to={item.path}>
                  <div className="flex flex-col items-center text-gray-900 text-xs">
                    {item.icon}
                    <span className="text-xs">
                      {item.name === "Local Transfer"
                        ? "L.Transfer"
                        : item.name === "International Transfer"
                        ? "I.Transfer"
                        : item.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
