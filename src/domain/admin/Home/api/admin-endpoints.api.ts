import api from "./api";
import { UpdateUsersData, UpdateUsersResponse, UsersResponse } from "../../../../models/type";
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
