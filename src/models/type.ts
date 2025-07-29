// Admin
export interface User {
  deleted: unknown;
  id: string;
  firstName: string;
  lastName: string;
  sex: string;
  password: string;
  email: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  profileImageUrl: string;
  isSuspicious: boolean;
  dateOfBirth: string;
  phoneNumber: string;
  country: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface UsersResponse {
  success: boolean;
  users: User[];
}

export interface UpdateUsersResponse {
  success: boolean;
  user: User;
}

export type UpdateUsersData = Partial<
  Omit<User, "id" | "createdAt" | "updatedAt" | "accountNumber">
>;



// User transfer requests
export interface UserTransferRequest {
  accountName: string;
  accountNumber: string;
  bankName: string;
  bankAddress: string;
  country: string;
  currency: string;
  swiftCode: string;
  ibanNumber: string;
  amount: string;
  transferType: string;
  description: string;
}

// user transfer response
export interface UserTransferResponse {
  success: boolean;
  message: string;
  transfer: Transfer;
  newBalance: number;
}

export interface Transfer {
  id: string;
  userId: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  bankAddress: string;
  country: string;
  currency: string;
  swiftCode: string;
  ibanNumber: string;
  amount: number;
  transferType: string;
  description: string;
  status: string;
  createdAt: string;
  transactionId: string;
}

// get User transaction response
export interface UserTransactionResponse {
  success: boolean;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  type: string;
  amount: number;
  status: string;
  description: string;
  userId: string;
  createdAt: string;
}



// Initiate user credit transaction request
export interface InitiateUserTransactionRequest {
  status: string;
  amount: string;
  type: string;
  description: string;
}

// Initiate user credit transaction response
export interface InitiateUserTransactionResponse {
  success: boolean;
  message: string;
  transaction: Transaction;
  newBalance: number;
}

export interface Transaction {
  id: string;
  type: string;
  amount: number;
  status: string;
  description: string;
  userId: string;
  createdAt: string;
}

