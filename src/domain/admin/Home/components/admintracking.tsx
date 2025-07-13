// import { useState } from "react";
// import { CiSearch } from "react-icons/ci";
// import { FaUser } from "react-icons/fa";
// import EditUserDetails from "../modal/edit-user-details";

// const AdminTracking = () => {
//     const [editUser, setEditUser] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   const users = [
//     {
//       firstName: "John",
//       lastName: "Doe",
//       country: "Ghana",
//       accountType: "Saving",
//       sex: "Male",
//       accountBalance: "1000",
//       dateOfBirth: "1990-01-01",
//       phoneNumber: "1234567890",
//     },
//     {
//       firstName: "John",
//       lastName: "Doe",
//       country: "Ghana",
//       accountType: "Saving",
//       sex: "Male",
//       accountBalance: "1000",
//       dateOfBirth: "1990-01-01",
//       phoneNumber: "1234567890",
//     },
//     {
//       firstName: "John",
//       lastName: "Doe",
//       country: "Ghana",
//       accountType: "Saving",
//       sex: "Male",
//       dateOfBirth: "1990-01-01",
//       phoneNumber: "1234567890",
//       accountBalance: "1000",
//     },
//     {
//       firstName: "John",
//       lastName: "Doe",
//       country: "Ghana",
//       accountType: "Saving",
//       sex: "Male",
//       dateOfBirth: "1990-01-01",
//       phoneNumber: "1234567890",
//       accountBalance: "1000",
//     },
//   ];


//   const filteredUsers = users.filter((user) =>
//     `${user.firstName} ${user.lastName}`
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-6 space-y-6 w-screen md:w-screen lg:w-full">
//       {/* Search Bar */}
//       <div className="flex flex-col md:flex-row md:justify-between md:items-center">
//         <h1 className="text-xl font-semibold mb-2 md:mb-0">Dashboard Admin</h1>
//         <div className="flex items-center border border-gray-400 rounded-lg p-2 ">
//           <CiSearch size={20} className="text-gray-500" />
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             className="outline-none indent-2 w-full"
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Stat Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="flex justify-between items-center bg-white shadow-md rounded-lg px-4 py-2">
//           <div className="">
//             <p className="text-lg font-semibold">Active Users</p>
//             <p className="text-2xl font-bold text-green-600">100</p>
//           </div>
//           <FaUser size={20} className="text-gray-500" />
//         </div>
//         <div className="flex justify-between items-center bg-white shadow-md rounded-lg px-4 py-2">
//           <div className="">
//             <p className="text-lg font-semibold">Deleted Users</p>
//             <p className="text-2xl font-bold text-red-600">50</p>
//           </div>
//           <FaUser size={20} className="text-gray-500" />
//         </div>
//         <div className="bg-white shadow-md rounded px-4 py-2">
//           <div className="">
//             <p className="text-lg font-semibold">Total balance</p>
//             <p className="text-2xl font-bold text-blue-600">$50,100</p>
//           </div>
//         </div>
//       </div>

//     {/* User Profiles Table */}
//       <h2 className="text-xl font-semibold mb-4">User Profiles</h2>
//       <div className="w-full overflow-x-auto mb-10">
//         <table className="min-w-[800px] w-full text-xs text-left text-gray-700 border-separate border-spacing-y-1">
//           {/* Table Head */}
//           <thead className="bg-[#F5F6FA] text-gray-500 font-medium border-b border-gray-300">
//             <tr>
//               <th className="py-2 px-2">First Name</th>
//               <th className="px-2">Last Name</th>
//               <th className="px-2">Country</th>
//               <th className="px-2">Account Type</th>
//               <th className="px-2">Sex</th>
//               <th className="px-2">Edit</th>
//             </tr>
//           </thead>

//           {/* Table Body */}
//           <tbody>
//             {filteredUsers.map((user, idx) => (
//               <tr key={idx} className="bg-white border-b border-gray-200">
//                 <td className="p-2 ">{user.firstName}</td>
//                 <td className="p-2 ">{user.lastName}</td>
//                 <td className="p-2 ">{user.country}</td>
//                 <td className="p-2 ">{user.accountType}</td>
//                 <td className="p-2 ">{user.sex}</td>
//                 <td
//                   onClick={() => setEditUser(true)}
//                   className="p-2 cursor-pointer hover:text-blue-400"
//                 >
//                   Change
//                 </td>
//               </tr>
//             ))}
//           </tbody>

//           {/* Edit User Modal */}
//           {editUser && (
//             <EditUserDetails
//               isOpen={editUser}
//               onClose={() => setEditUser(false)}
//               onSave={() => setEditUser(false)}
//               user={filteredUsers[0]}
//             />
//           )}
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminTracking;



import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import EditUserDetails from "../modal/edit-user-details";
import { fetchAllUsers, updateUser } from "../api/admin-endpoints.api";
import { User, UpdateUsersData } from "../../../../models/type";
import { formatUserForModal } from "../../../../general/helpers/user-helpers";

const AdminTracking = () => {
  const [editUser, setEditUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetchAllUsers();
        setUsers(res.users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSaveUser = async (formData: any) => {
    if (!selectedUser) return;

    // Format the payload for update
    const updateData: UpdateUsersData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      country: formData.country,
      accountType: formData.accountType,
      phoneNumber: formData.phoneNumber,
      dateOfBirth: formData.dateOfBirth,
      balance: parseFloat(formData.accountBalance),
      sex: formData.sex,
    };

    try {
      await updateUser(selectedUser.id, updateData);

      // Refresh the users list after update
      const res = await fetchAllUsers();
      setUsers(res.users);
    } catch (error) {
      console.error("Failed to update user:", error);
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
            <p className="text-2xl font-bold text-red-600">50</p>
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
          <p className="text-sm">Once users sign up, they’ll appear here.</p>
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
                  <th className="px-2">Edit</th>
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
                    <td
                      onClick={() => {
                        setSelectedUser(user);
                        setEditUser(true);
                      }}
                      className="p-2 cursor-pointer hover:text-blue-400"
                    >
                      Change
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Edit Modal */}
            {editUser && selectedUser && (
              <EditUserDetails
                isOpen={editUser}
                onClose={() => {
                  setEditUser(false);
                  setSelectedUser(null);
                }}
                user={formatUserForModal(selectedUser)}
                onSave={handleSaveUser}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminTracking;
