import  { useState, useEffect } from "react";

interface EditUserDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: {
    firstName: string;
    lastName: string;
    country: string;
    accountType: string;
    phoneNumber: string;
    dateOfBirth: string;
    accountBalance: string;
    sex: string;
  }) => void;
  user: {
    firstName: string;
    lastName: string;
    country: string;
    accountType: string;
    phoneNumber: string;
    accountBalance: string;
    dateOfBirth: string;
    sex: string;
  };
}

const EditUserDetails: React.FC<EditUserDetailsProps> = ({ isOpen, onClose, onSave, user }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    accountType: "",
    accountBalance: "",
    phoneNumber: "",
    dateOfBirth: "",
    sex: "",
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-90 md:w-full md:max-w-md  space-y-4 shadow-lg">
        <h2 className="text-xl font-semibold">Edit User Details</h2>

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
            <label htmlFor="firstName" className="text-sm font-medium">
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
            <label htmlFor="firstName" className="text-sm font-medium">
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
            <label htmlFor="firstName" className="text-sm font-medium">
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
          </div>
          <div className="flex-1 space-y-2">
            <label htmlFor="firstName" className="text-sm font-medium">
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
            <label htmlFor="firstName" className="text-sm font-medium">
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
            <label htmlFor="firstName" className="text-sm font-medium">
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
            <label htmlFor="firstName" className="text-sm font-medium">
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

        <div className="flex justify-end space-x-4 pt-4">
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
  );
};

export default EditUserDetails;
