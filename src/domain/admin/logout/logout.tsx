import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all localStorage (or just user-related keys if preferred)
    localStorage.clear();

    // Optionally also clear sessionStorage or cookies if used
    // sessionStorage.clear();

    // Redirect to login page
    window.location.href = "/landing.html";
  };

  const cancelLogout = () => {
    setShowModal(false);
    navigate(-1); // go back
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;
