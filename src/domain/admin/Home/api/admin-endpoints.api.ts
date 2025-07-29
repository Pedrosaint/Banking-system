import api from "./api";
import { InitiateUserTransactionRequest, InitiateUserTransactionResponse, UpdateUsersData, UpdateUsersResponse, UsersResponse, UserTransactionResponse } from "../../../../models/type";
import { User } from "../../../../models/type";


// Get all users
export const fetchAllUsers = async (): Promise<UsersResponse> => {
  try {
    const response = await api.get<UsersResponse>("admin/getAll");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};

// Update user by ID
export const updateUser = async (
  id: string,
  data: UpdateUsersData
): Promise<User> => {
  try {
    const response = await api.put<UpdateUsersResponse>(
      `admin/update/${id}`,
      data
    );
    return response.data.user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
};

// Delete user
export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`admin/user/delete/${id}`);
};


// Get user transfer
export const getUserTransaction = async (id: string): Promise<UserTransactionResponse> => {
  const response = await api.get(`admin/user/${id}/transactions`);
  return response.data;
};

export const initiateUserCreditTransanction = async (id: string, data: InitiateUserTransactionRequest): Promise<InitiateUserTransactionResponse> => {
  const response = await api.post(`admin/user/${id}/transaction`, data);
  return response.data;
};
