// src/views/international-transfer-view.tsx
import InternationalTransfer from "../components/international-transfer";

const InternationalTransferView = () => {
  const handleSubmit = (formData: any) => {
    console.log("International transfer submitted:", formData);
    // Add your submission logic here (API call, etc.)
  };

  return (
    <>
      <div className="px-3 md:px-5">
        <h1 className="relative border-b max-w-3xl border-gray-300 py-3 text-xl font-medium md:mt-10 before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-1 before:w-9 before:bg-blue-900">
          International Transfer
        </h1>
      </div>
      <div className="md:mt-12 mt-5 mb-15 md:px-5 px-3">
        <InternationalTransfer 
        transferType="international"
        onSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default InternationalTransferView;