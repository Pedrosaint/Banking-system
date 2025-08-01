import React from "react";
import { BaseTransferProps } from "../../../models/index-model";

interface TransferFormData {
  accountName: string;
  accountNumber: string;
  bankName: string;
  bankAddress: string;
  transferType: string;
  amount: string;
  description: string;
  country: string;
  currency: string;
  swiftCode: string;
  ibanNumber: string;
  [key: string]: string;
}

const TransferPage: React.FC<BaseTransferProps> = ({
  title = "Local Transfer",
  subtitle = "Funds will reflect in the Beneficiary Account within 24 hours.",
  showTransferButton = true,
  buttonText = "Transfer",
  onSubmit,
  initialValues = {},
  transferType = "local",
}) => {
  const [formData, setFormData] = React.useState<TransferFormData>({
    accountName: "",
    accountNumber: "",
    bankName: "",
    bankAddress: "",
    transferType: "",
    amount: "",
    description: "",
    country: "",
    currency: "",
    swiftCode: "",
    ibanNumber: "",
    ...initialValues,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev: TransferFormData) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      accountName: "",
      accountNumber: "",
      bankName: "",
      bankAddress: "",
      transferType: "",
      amount: "",
      description: "",
      country: "",
      currency: "",
      swiftCode: "",
      ibanNumber: "",
    });
  };

  const renderTransferFields = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="accountName" className="block font-medium mb-1">
            Account Name
          </label>
          <input
            name="accountName"
            placeholder="Beneficiary Account Name"
            className="w-full border rounded px-3 py-2 outline-none border-gray-300"
            value={formData.accountName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="accountNumber" className="block font-medium mb-1">
            Account Number
          </label>
          <input
            name="accountNumber"
            placeholder="Beneficiary Account Number"
            className="w-full border rounded px-3 py-2 outline-none border-gray-300"
            value={formData.accountNumber}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="bankName" className="block font-medium mb-1">
            Bank Name
          </label>
          <input
            name="bankName"
            placeholder="Beneficiary Bank Name"
            className="w-full border rounded px-3 py-2 outline-none border-gray-300"
            value={formData.bankName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="bankAddress" className="block font-medium mb-1">
            Bank Address
          </label>
          <input
            name="bankAddress"
            placeholder="Beneficiary Bank Address"
            className="w-full border rounded px-3 py-2 outline-none border-gray-300"
            value={formData.bankAddress}
            onChange={handleChange}
            required={transferType === "international"}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="country" className="block font-medium mb-1">
            Country
          </label>
          <input
            name="country"
            placeholder="Country"
            className="w-full border rounded px-3 py-2 outline-none border-gray-300"
            value={formData.country}
            onChange={handleChange}
            required={transferType === "international"}
          />
        </div>
        <div>
          <label htmlFor="currency" className="block font-medium mb-1">
            Currency
          </label>
          <input
            name="currency"
            placeholder="Currency"
            className="w-full border rounded px-3 py-2 outline-none border-gray-300"
            value={formData.currency}
            onChange={handleChange}
            required={transferType === "international"}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="swiftCode" className="block font-medium mb-1">
            SWIFT Code
          </label>
          <input
            name="swiftCode"
            placeholder="SWIFT Code"
            className="w-full border rounded px-3 py-2 outline-none border-gray-300"
            value={formData.swiftCode}
            onChange={handleChange}
            required={transferType === "international"}
          />
        </div>
        <div>
          <label htmlFor="ibanNumber" className="block font-medium mb-1">
            IBAN Number
          </label>
          <input
            name="ibanNumber"
            placeholder="IBAN Number"
            className="w-full border rounded px-3 py-2 outline-none border-gray-300"
            value={formData.ibanNumber}
            onChange={handleChange}
            required={transferType === "international"}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="amount" className="block font-medium mb-1">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
              ♦
            </span>
            <input
              name="amount"
              type="number"
              placeholder="Amount"
              className="w-full border rounded px-3 py-2 outline-none border-gray-300 pl-8"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="transferType" className="block font-medium mb-1">
            Transfer Type
          </label>
          <select
            name="transferType"
            className="w-full border rounded px-3 py-2 outline-none border-gray-300"
            value={formData.transferType}
            onChange={handleChange}
            required
          >
            <option value="">Select transfer type</option>
            <option value="Online Banking">Online Banking</option>
            <option value="Mobile Transfer">Mobile Transfer</option>
          </select>
        </div>
      </div>
    </>
  );

  return (
    <div className="p-7 bg-white rounded-md shadow-xl w-full max-w-3xl">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">
        {subtitle}
        {showTransferButton && (
          <button className="ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
            Transfer to Beneficiary
          </button>
        )}
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {renderTransferFields()}

        <label htmlFor="description" className="block font-medium mb-1">
          Description
        </label>
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border rounded px-3 py-2 outline-none border-gray-300"
          rows={4}
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        <button
          type="submit"
          className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default TransferPage;