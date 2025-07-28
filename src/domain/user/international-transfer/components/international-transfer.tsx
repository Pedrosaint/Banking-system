// // src/views/international-transfer.tsx
// import React from "react";
// import TransferPage from "../../../../general/components/common/transfer-page";
// import { InternationalTransferProps } from "../../../../models/index-model";

// const InternationalTransfer: React.FC<InternationalTransferProps> = ({
//   title = "International Transfer",
//   subtitle = "Funds will reflect in the Beneficiary Account within 72 hours.",
//   showTransferButton = true,
//   buttonText = "Transfer",
//   onSubmit,
//   initialValues = {},
// }) => {
//   return (
//     <TransferPage
//       title={title}
//       subtitle={subtitle}
//       showTransferButton={showTransferButton}
//       buttonText={buttonText}
//       onSubmit={onSubmit}
//       initialValues={initialValues}
//       transferType="international"
//     />
//   );
// };

// export default InternationalTransfer;




// InternationalTransfer component
import React from "react";
import TransferPage from "../../../../general/components/common/transfer-page";
import { makeTransfer } from "../../../user/international-transfer/api/users-endpoint";
import { toast } from "sonner";

const InternationalTransfer: React.FC = () => {
  const handleSubmit = async (data: Record<string, unknown>) => {
    const userTransferRequest = {
      amount: String(data.amount as number),
      accountName: data.accountName as string,
      accountNumber: data.accountNumber as string,
      bankName: data.bankName as string,
      bankAddress: data.bankAddress as string,
      country: data.country as string,
      swiftCode: data.swiftCode as string,
      ibanNumber: data.ibanNumber as string,
      transferType: "international",
      currency: data.currency as string,
      description: (data.description as string) || "",
    };
    try {
      const response = await makeTransfer(userTransferRequest);
      console.log("Transfer successful:", response);
      toast.success("Transfer successful!");
    } catch (error) {
      console.error("Transfer failed:", error);
     toast.error("Transfer failed");
    }
  };

  return (
    <TransferPage
      title="International Transfer"
      subtitle="Funds will reflect in the Beneficiary Account within 72 hours."
      onSubmit={handleSubmit}
      transferType="international"
    />
  );
};

export default InternationalTransfer;