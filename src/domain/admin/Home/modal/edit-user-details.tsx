import { useState, useEffect } from "react";
import { toast } from "sonner";

interface EditUserDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: {
    id: string;
    firstName: string;
    lastName: string;
    country: string;
    accountType: string;
    phoneNumber: string;
    dateOfBirth: string;
    accountBalance: string;
    sex: string;
    isSuspicious: boolean;
  }) => void;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    country: string;
    accountType: string;
    phoneNumber: string;
    accountBalance: string;
    dateOfBirth: string;
    sex: string;
    isSuspicious: boolean;
  };
  onCreditTransaction: (data: {
    userId: string;
    amount: string;
    type: string;
    description: string;
    status: string;
  }) => Promise<void>;
}

const EditUserDetails: React.FC<EditUserDetailsProps> = ({
  isOpen,
  onClose,
  onSave,
  user,
  onCreditTransaction,
}) => {
  const [formData, setFormData] = useState({
    id: user.id,
    firstName: "",
    lastName: "",
    country: "",
    accountType: "",
    accountBalance: "",
    phoneNumber: "",
    dateOfBirth: "",
    sex: "",
    isSuspicious: false,
  });

  // State for credit transaction modal
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [creditData, setCreditData] = useState({
    amount: "",
    type: "credit",
    description: "Admin credit",
    status: "completed",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === "isSuspicious" ? value === "true" : value }));
  };

  const handleCreditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCreditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };
const handleCreditSubmit = async () => {
  setIsProcessing(true);
  try {
    await onCreditTransaction({
      userId: user.id,
      ...creditData,
    });
    setShowCreditModal(false);
    // Show appropriate success message
    toast.success(
      creditData.type === "credit"
        ? `Credit successful! ${creditData.amount} has been added.`
        : `Debit successful! ${creditData.amount} has been deducted.`
    );
    // Reset credit form
    setCreditData({
      amount: "",
      type: "credit", // Default to credit for next time
      description: "",
      status: "completed",
    });
  } catch (error) {
    console.error("Transaction failed:", error);
    toast.error(
      creditData.type === "credit"
        ? "Credit transaction failed"
        : "Debit transaction failed"
    );
  } finally {
    setIsProcessing(false);
  }
};

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-90 md:w-full md:max-w-lg space-y-4 shadow-lg overflow-y-auto max-h-[90vh]">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Edit User Details</h2>
            <button
              onClick={() => {
                onClose();
                setShowCreditModal(false);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2 flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1 space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded outline-none"
              />
              <label htmlFor="lastName" className="text-sm font-medium">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded outline-none"
              />
              <label htmlFor="country" className="text-sm font-medium">
                Country
              </label>
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded outline-none"
              />
              <label htmlFor="accountType" className="text-sm font-medium">
                Account type
              </label>
              <input
                type="text"
                name="accountType"
                placeholder="Account Type"
                value={formData.accountType}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded outline-none"
              />
              <label className="block text-sm font-medium text-gray-700">
                Suspicious Account?
              </label>
              <select
                name="isSuspicious"
                value={formData.isSuspicious}
                onChange={handleChange}
                className=" block border w-full border-gray-300 rounded outline-none p-2"
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="flex-1 space-y-2">
              <label htmlFor="dateOfBirth" className="text-sm font-medium">
                Date of Birth
              </label>
              <input
                type="text"
                name="dateOfBirth"
                placeholder="Date of Birth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded outline-none"
              />
              <label htmlFor="accountBalance" className="text-sm font-medium">
                Account balance
              </label>
              <input
                type="text"
                name="accountBalance"
                placeholder="Account Balance"
                value={formData.accountBalance}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded outline-none"
              />
              <label htmlFor="phoneNumber" className="text-sm font-medium">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded outline-none"
              />
              <label htmlFor="sex" className="text-sm font-medium">
                Gender
              </label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded outline-none"
              >
                <option value="">Select Sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => setShowCreditModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
          >
            Credit or Debit Account
          </button>

          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700 cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Credit Transaction Modal */}
      {showCreditModal && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-90 md:w-full md:max-w-md space-y-4 shadow-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Credit or Debit User Account
              </h2>
              <button
                onClick={() => setShowCreditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={creditData.amount}
                  onChange={handleCreditChange}
                  className="w-full border border-gray-300 p-2 rounded outline-none"
                  placeholder="Enter amount"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <input
                  type="text"
                  name="type"
                  value={creditData.type}
                  onChange={handleCreditChange}
                  className="w-full border border-gray-300 p-2 rounded outline-none"
                  placeholder="credit or debit"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={creditData.description}
                  onChange={handleCreditChange}
                  className="w-full border border-gray-300 p-2 rounded outline-none"
                  placeholder="Transaction description"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  name="status"
                  value={creditData.status}
                  onChange={(e) =>
                    setCreditData((prev) => ({
                      ...prev,
                      status: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 p-2 rounded outline-none"
                >
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                onClick={() => setShowCreditModal(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCreditSubmit}
                disabled={isProcessing || !creditData.amount}
                className={`px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700 cursor-pointer ${
                  isProcessing || !creditData.amount
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {isProcessing ? "Processing..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditUserDetails;
