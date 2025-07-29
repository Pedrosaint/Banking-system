

// InternationalTransfer component
import React, { useState } from "react";
import TransferPage from "../../../../general/components/common/transfer-page";
import { makeTransfer } from "../../../user/international-transfer/api/users-endpoint";
import { toast } from "sonner";
import { SuspendedModal } from "../modal/suspended.modal";

const InternationalTransfer: React.FC = () => {
  const [isSuspendedModalVisible, setIsSuspendedModalVisible] = useState(false);
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Transfer failed:", error);

      const statusCode = error?.response?.status;
      const data = error?.response?.data;

      const message = data?.error || data?.message || "Something went wrong";

      if (
        statusCode === 403 &&
        message.toLowerCase().includes("transfers are currently disabled")
      ) {
        setIsSuspendedModalVisible(true);
      } else {
        toast.error(message);
      }
    }


  };

  return (
    <>
      <TransferPage
        title="International Transfer"
        subtitle="Funds will reflect in the Beneficiary Account within 72 hours."
        onSubmit={handleSubmit}
        transferType="international"
      />
      {isSuspendedModalVisible && (
        <SuspendedModal onClose={() => setIsSuspendedModalVisible(false)} />
      )}
    </>
  );
};

export default InternationalTransfer;
