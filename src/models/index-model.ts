import type { JSX } from "react";

//====== Sidebar Model=====//
export type TsideBarLinks = {
    id: number;
    name: string;
    path: string;
    icon: React.ReactElement;
    section?: string;
    children?: {
      id: number;
      name: string;
      path: string;
    }[];
  };
  

  export type HeaderProps = {
    title?: string | React.ReactElement;
    subtitle?: string | React.ReactElement;
    icon?: JSX.Element;
  };

//=====Transfer Page Model=====//
export type TransferType = "local" | "international";

export interface BaseTransferProps {
  title?: string;
  subtitle?: string;
  showTransferButton?: boolean;
  buttonText?: string;
  onSubmit: (data: any) => void;
  initialValues?: any;
  transferType: TransferType;
}

export interface LocalTransferProps extends BaseTransferProps {
  initialValues?: {
    accountName?: string;
    accountNumber?: string;
    bankName?: string;
    transferType?: string;
    amount?: string;
    description?: string;
  };
}

export interface InternationalTransferProps extends BaseTransferProps {
  initialValues?: {
    accountName?: string;
    accountNumber?: string;
    bankName?: string;
    swiftCode?: string;
    ibanNumber?: string;
    bankAddress?: string;
    country?: string;
    transferType?: string;
    amount?: string;
    currency?: string;
    description?: string;
  };
}