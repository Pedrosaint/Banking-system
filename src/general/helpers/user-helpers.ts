import { User } from "../../models/type";

export const formatUserForModal = (user: User) => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  country: user.country,
  accountType: user.accountType,
  phoneNumber: user.phoneNumber,
  accountBalance: user.balance.toString(),
  dateOfBirth: user.dateOfBirth,
  sex: user.sex,
  isSuspicious: user.isSuspicious,
  profileImageUrl: user.profileImageUrl,
});
