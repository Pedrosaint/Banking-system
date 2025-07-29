import { IoIosAddCircleOutline } from "react-icons/io";
import { Button } from "../../../../general/components/common/button";
import React, { useEffect, useState } from "react";
import { fetchAllUsers } from "../../../admin/Home/api/admin-endpoints.api";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  accountType: string;
  accountNumber: string;
  balance: number;
}

const AccountDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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
        console.error("Failed to fetch user:", error);
      }
    };

    loadUser();
  }, []);

  if (!user) return <div>Loading account details...</div>;

  const maskedAccountNumber = user.accountNumber.replace(
    /^(\d{5})(\d+)(\d{2})$/,
    "$1******$3"
  );

  return (
    <div className="bg-white p-4 rounded w-full shadow-md">
      <h2 className="text-xl font-semibold w-full mb-4">Account Details</h2>
      <div className="space-y-2 text-sm w-full">
        <div className="flex justify-between">
          <span>Account Name :</span>
          <span>
            {user.firstName} {user.lastName}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Balance :</span>
          <span>${user.balance.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Account Type :</span>
          <span>{user.accountType}</span>
        </div>
        <div className="flex justify-between">
          <span>Account Number :</span>
          <span>{maskedAccountNumber}</span>
        </div>
        <div className="flex justify-between">
          <span>Swift Code :</span>
          <span>0TFB2724502</span>
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <Button
          variant="secondary"
          size="default"
          className="flex items-center gap-2"
        >
          <IoIosAddCircleOutline size={15} className="font-bold" />
          <span className="uppercase text-[75%]">Delete Card</span>
        </Button>
        <Button onClick={handleSubmit} variant="primary" size="default">
          <span className="uppercase text-[75%]">Fund Card</span>
        </Button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Deposit Request</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-700">
                Please contact customer care to initiate your deposit
              </p>
              <p className="mt-4 text-gray-600 text-sm">
                Customer care: support@yourbank.com | +1 (234) 567-8900
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDetails;
