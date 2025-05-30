// src/views/local-transfer.tsx
import React from "react";
import TransferPage from "../../../../general/components/common/transfer-page";
import { LocalTransferProps } from "../../../../models/index-model";

const LocalTransfer: React.FC<LocalTransferProps> = ({
  title = "Local Transfer",
  subtitle = "Funds will reflect in the Beneficiary Account within 24 hours.",
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
      transferType="local"
    />
  );
};

export default LocalTransfer;