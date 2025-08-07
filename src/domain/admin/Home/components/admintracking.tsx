import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaUser, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import EditUserDetails from "../modal/edit-user-details";
import {
  fetchAllUsers,
  updateUser,
  deleteUser,
  getUserTransaction,
  initiateUserCreditTransanction,
} from "../api/admin-endpoints.api";
import type {
  User,
  UpdateUsersData,
  Transaction,
} from "../../../../models/type";
import { formatUserForModal } from "../../../../general/helpers/user-helpers";
import { toast } from "sonner";
import ViewTransactions from "../modal/view-transaction";


const AdminTracking = () => {
  const [viewTransactions, setViewTransactions] = useState(false);
  const [selectedUserForTransactions, setSelectedUserForTransactions] =
    useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [deletedUsers, setDeletedUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetchAllUsers();
        const activeUsers = res.users.filter((user) => !user.deleted);
        const deletedUsers = res.users.filter((user) => user.deleted);
        setUsers(activeUsers);
        setDeletedUsers(deletedUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleViewTransactions = async (user: User) => {
    setSelectedUserForTransactions(user);
    setIsLoadingTransactions(true);
    try {
      const response = await getUserTransaction(user.id);
      setTransactions(response.transactions);
      setViewTransactions(true);
    } catch (error) {
      toast.error("Failed to fetch transactions");
      console.error("Error fetching transactions:", error);
    } finally {
      setIsLoadingTransactions(false);
    }
  };

  const handleCreditTransaction = async (data: {
    userId: string;
    amount: string;
    type: string;
    description: string;
    status: string;
  }) => {
    try {
      const response = await initiateUserCreditTransanction(data.userId, {
        amount: data.amount,
        type: data.type,
        description: data.description,
        status: data.status,
      });
      console.log("Credit transaction response:", response);
      const res = await fetchAllUsers();
      setUsers(res.users.filter((user) => !user.deleted));
      setDeletedUsers(res.users.filter((user) => user.deleted));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser(userToDelete.id);
      setUsers((prev) => prev.filter((user) => user.id !== userToDelete.id));
      setDeletedUsers((prev) => [...prev, { ...userToDelete, deleted: true }]);
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Failed to delete user. Please try again.");
    } finally {
      setDeleteModal(false);
      setUserToDelete(null);
    }
  };

  const openDeleteModal = (user: User) => {
    setUserToDelete(user);
    setDeleteModal(true);
  };

  const handleSaveUser = async (formData: {
    firstName: string;
    lastName: string;
    country: string;
    accountType: string;
    phoneNumber: string;
    dateOfBirth: string;
    accountBalance: string;
    sex: string;
    isSuspicious: boolean;
  }) => {
    if (!selectedUser) return;

    const updateData: UpdateUsersData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      country: formData.country,
      accountType: formData.accountType,
      phoneNumber: formData.phoneNumber,
      dateOfBirth: formData.dateOfBirth,
      balance: Number.parseFloat(formData.accountBalance),
      sex: formData.sex,
      isSuspicious: formData.isSuspicious,
    };

    try {
      await updateUser(selectedUser.id, updateData);
      const res = await fetchAllUsers();
      setUsers(res.users);
      toast.success("User updated successfully");
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error("Failed to update user. Please try again.");
    } finally {
      setEditUser(false);
      setSelectedUser(null);
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <div className="p-6 space-y-6 w-screen md:w-screen lg:w-full">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-xl font-semibold mb-2 md:mb-0">Dashboard Admin</h1>
        <div className="flex items-center border border-gray-400 rounded-lg p-2">
          <CiSearch size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            className="outline-none indent-2 w-full"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex justify-between items-center bg-white shadow-md rounded-lg px-4 py-2">
          <div>
            <p className="text-lg font-semibold">Active Users</p>
            <p className="text-2xl font-bold text-green-600">{users.length}</p>
          </div>
          <FaUser size={20} className="text-gray-500" />
        </div>
        <div className="flex justify-between items-center bg-white shadow-md rounded-lg px-4 py-2">
          <div>
            <p className="text-lg font-semibold">Deleted Users</p>
            <p className="text-2xl font-bold text-red-600">
              {deletedUsers.length}
            </p>
          </div>
          <FaUser size={20} className="text-gray-500" />
        </div>
        <div className="bg-white shadow-md rounded px-4 py-2">
          <div>
            <p className="text-lg font-semibold">Total balance</p>
            <p className="text-2xl font-bold text-blue-600">
              $
              {users
                .reduce((acc, user) => acc + user.balance, 0)
                .toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Loading or Users Table */}
      {isLoading ? (
        <p className="text-center text-gray-500 mt-10">Loading users...</p>
      ) : users.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p className="text-lg font-medium">No users found.</p>
          <p className="text-sm">Once users sign up, they'll appear here.</p>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">User Profiles</h2>
          <div className="w-full overflow-x-auto mb-10">
            <table className="min-w-[800px] w-full text-xs text-left text-gray-700 border-separate border-spacing-y-1">
              <thead className="bg-[#F5F6FA] text-gray-500 font-medium border-b border-gray-300">
                <tr>
                  <th className="py-2 px-2">First Name</th>
                  <th className="px-2">Last Name</th>
                  <th className="px-2">Country</th>
                  <th className="px-2">Account Type</th>
                  <th className="px-2">Phone</th>
                  <th className="px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="bg-white border-b border-gray-200"
                  >
                    <td className="p-2">{user.firstName}</td>
                    <td className="p-2">{user.lastName}</td>
                    <td className="p-2">{user.country}</td>
                    <td className="p-2">{user.accountType}</td>
                    <td className="p-2">{user.phoneNumber}</td>
                    <td className="p-2">
                      <div className="flex gap-3">
                        <FaEye
                          onClick={() => handleViewTransactions(user)}
                          className="cursor-pointer hover:text-green-400 transition-colors"
                          size={16}
                        />
                        <FaEdit
                          onClick={() => {
                            setSelectedUser(user);
                            setEditUser(true);
                          }}
                          className="cursor-pointer hover:text-blue-400 transition-colors"
                          size={16}
                        />
                        <FaTrash
                          onClick={() => openDeleteModal(user)}
                          className="cursor-pointer hover:text-red-400 transition-colors"
                          size={16}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {viewTransactions && (
              <ViewTransactions
                isOpen={viewTransactions}
                onClose={() => {
                  setViewTransactions(false);
                  setSelectedUserForTransactions(null);
                }}
                transactions={transactions}
                user={selectedUserForTransactions}
                isLoading={isLoadingTransactions}
              />
            )}

            {editUser && selectedUser && (
              <EditUserDetails
                isOpen={editUser}
                onClose={() => {
                  setEditUser(false);
                  setSelectedUser(null);
                }}
                user={formatUserForModal(selectedUser)}
                onSave={handleSaveUser}
                onCreditTransaction={handleCreditTransaction}
              />
            )}


            {deleteModal && userToDelete && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                      <FaTrash className="text-red-600" size={20} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Delete User
                      </h3>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete{" "}
                      <span className="font-medium text-gray-900">
                        {userToDelete.firstName} {userToDelete.lastName}
                      </span>
                      ? This action cannot be undone.
                    </p>
                  </div>

                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => {
                        setDeleteModal(false);
                        setUserToDelete(null);
                      }}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteUser}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  </>
  );
};

export default AdminTracking;