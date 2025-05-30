// src/views/international-transfer.tsx
import React from "react";
import TransferPage from "../../../../general/components/common/transfer-page";
import { InternationalTransferProps } from "../../../../models/index-model";

const InternationalTransfer: React.FC<InternationalTransferProps> = ({
  title = "International Transfer",
  subtitle = "Funds will reflect in the Beneficiary Account within 72 hours.",
  showTransferButton = true,
  buttonText = "Transfer",
  onSubmit,
  initialValues = {},
}) => {
  return (
    <TransferPage
      title={title}
      subtitle={subtitle}
      showTransferButton={showTransferButton}
      buttonText={buttonText}
      onSubmit={onSubmit}
      initialValues={initialValues}
      transferType="international"
    />
  );
};

export default InternationalTransfer;