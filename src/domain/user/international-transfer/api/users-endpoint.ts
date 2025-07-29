import { UserTransferRequest, UserTransferResponse } from "../../../../models/type";
import api from "../../../admin/Home/api/api";


// Make a transfer
export const makeTransfer = async (
  data: UserTransferRequest
): Promise<UserTransferResponse> => {
  try {
    const response = await api.post<UserTransferResponse>(
      "transactions/transfer",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error making transfer:", error);
    throw error; 
  }
};
