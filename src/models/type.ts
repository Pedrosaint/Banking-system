// Admin
export interface User {
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