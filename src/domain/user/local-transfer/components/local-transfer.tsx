// // src/views/local-transfer.tsx
// import React from "react";
// import TransferPage from "../../../../general/components/common/transfer-page";
// import { LocalTransferProps } from "../../../../models/index-model";

// const LocalTransfer: React.FC<LocalTransferProps> = ({
//   title = "Local Transfer",
//   subtitle = "Funds will reflect in the Beneficiary Account within 24 hours.",
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
//       transferType="local"
//     />
//   );
// };

// export default LocalTransfer;




// LocalTransfer component
import React from "react";
import TransferPage from "../../../../general/components/common/transfer-page";
import { makeTransfer } from "../../../../domain/user/international-transfer/api/users-endpoint";
import { toast } from "sonner";

const LocalTransfer: React.FC = () => {
  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      const userTransferRequest = {
        amount: String(data.amount as number),
        accountNumber: data.accountNumber as string,
        beneficiaryName: data.beneficiaryName as string,
        accountName: data.accountName as string,
        bankName: data.bankName as string,
        transferType: "local",
        description: data.description as string,
        bankAddress: data.bankAddress as string,
        country: data.country as string,
        currency: data.currency as string,
        swiftCode: data.swiftCode as string,
        ibanNumber: data.ibanNumber as string,
      };
      const response = await makeTransfer(userTransferRequest);
      console.log("Transfer successful:", response);
      toast.success("Transfer successful!");
    } catch (error) {
      console.error("Transfer failed:", error);
      toast.error("Transfer failed. Please try again.");
    }
  };

  return (
    <TransferPage
      title="Local Transfer"
      subtitle="Funds will reflect in the Beneficiary Account within 24 hours."
      onSubmit={handleSubmit}
      transferType="local"
    />
  );
};

export default LocalTransfer;