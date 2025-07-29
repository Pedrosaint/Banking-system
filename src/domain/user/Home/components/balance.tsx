// // src/components/account/balance.tsx

// const Balance = () => {
//   return (
//     <div className="w-full flex flex-col gap-6">
//       <div className="flex gap-5 md:gap-20 flex-col md:flex-row">
//         <div>
//           <p className="text-gray-500">Total Balance</p>
//           <h2 className="text-3xl font-bold">$2,192.00</h2>
//           {/* <button className="text-blue-900 text-sm font-medium border-b-3 border-blue-900 hover:opacity-80 transition">
//             View Statement &gt;
//           </button> */}
//         </div>
//         <div>
//           <p className="text-gray-500">Available Balance</p>
//           <h2 className="text-3xl font-bold">$2,121.00</h2>
//           {/* <button className="text-blue-900 text-sm font-medium border-b-3 border-blue-900 hover:opacity-80 transition">
//             Transfer Fund &gt;
//           </button> */}
//         </div>
//       </div>
//       <div className="w-full md:w-85 h-47 perspective">
//         <div className="relative w-full h-full transition-transform duration-700 transform-style preserve-3d hover:rotate-y-180">
//           {/* Front of the card */}
//           <div className="absolute w-full h-full backface-hidden bg-blue-900 text-white rounded-lg p-4 shadow cursor-pointer">
//             <div className="flex justify-end">
//               <span className="font-bold text-lg">$12,312</span>
//             </div>
//             {/* account number */}
//             <div className="mt-6 text-xl tracking-widest text-center font-semibold">
//               4316 5968 5411 3492 
//             </div>
//             <div className="flex items-center justify-between">
//               <div className="mt-4 text-lg">
//                 <p className="uppercase text-[55%]">Card Holder</p>
//                 <p className="font-bold">Susan Anthony</p>
//               </div>
//               <div className="mt-2 text-lg">
//                 <p className="uppercase text-[55%]">Expires</p>
//                 <p className="font-bold">04/2025</p>
//               </div>
//             </div>
//           </div>

//           {/* Back of the card */}
//           <div className="cursor-pointer absolute w-full h-full backface-hidden rotate-y-180 bg-blue-900 text-white rounded-lg p-4 shadow flex flex-col justify-between">
//             {/* Magnetic stripe */}
//             <div className="h-10 bg-black rounded-sm mt-2"></div>

//             {/* Signature and CVV area */}
//             <div className="mt-6 relative">
//               <div className="bg-white h-8 flex items-center px-2 pr-10 text-black text-sm italic bg-[repeating-linear-gradient(45deg,white,white_5px,#ccc_5px,#ccc_10px)] rounded-sm">
//                 Signature
//               </div>
//               <div className="absolute right-2 top-0 bottom-0 flex items-center bg-white px-2 text-black font-bold rounded-sm">
//                 485
//               </div>
//             </div>

//             {/* Logos at bottom */}
//             <div className="flex justify-between items-end text-xs opacity-50 mt-8">
//               <span className="text-white font-light">
//                 MEMIC FINANCIAL BANK
//               </span>
//               <span className="text-white font-bold text-base">VISA</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Balance;




import { useEffect, useState } from "react";
import { fetchAllUsers } from "../../../admin/Home/api/admin-endpoints.api";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  balance: number;
  accountNumber: string;
}

const Balance = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const loadUser = async () => {
      try {
        const response = await fetchAllUsers();
        const foundUser = response.users.find((u) => u.id === userId);
        if (foundUser) {
          setUser(foundUser);
        } else {
          console.warn("User not found");
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    loadUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex gap-5 md:gap-20 flex-col md:flex-row">
        <div>
          <p className="text-gray-500">Total Balance</p>
          <h2 className="text-3xl font-bold">
            ${user.balance.toLocaleString()}
          </h2>
        </div>
        <div>
          <p className="text-gray-500">Available Balance</p>
          <h2 className="text-3xl font-bold">
            ${user.balance.toLocaleString()}
          </h2>
        </div>
      </div>

      <div className="w-full md:w-85 h-47 perspective">
        <div className="relative w-full h-full transition-transform duration-700 transform-style preserve-3d hover:rotate-y-180">
          {/* Front of the card */}
          <div className="absolute w-full h-full backface-hidden bg-blue-900 text-white rounded-lg p-4 shadow cursor-pointer">
            <div className="flex justify-end">
              <span className="font-bold text-lg">
                ${user.balance.toLocaleString()}
              </span>
            </div>
            <div className="mt-6 text-xl tracking-widest text-center font-semibold">
              {user.accountNumber.replace(/(\d{4})(?=\d)/g, "$1 ")}
            </div>
            <div className="flex items-center justify-between">
              <div className="mt-4 text-lg">
                <p className="uppercase text-[55%]">Card Holder</p>
                <p className="font-bold">
                  {user.firstName} {user.lastName}
                </p>
              </div>
              <div className="mt-2 text-lg">
                <p className="uppercase text-[55%]">Expires</p>
                <p className="font-bold">04/2027</p>
              </div>
            </div>
          </div>

          {/* Back of the card */}
          <div className="cursor-pointer absolute w-full h-full backface-hidden rotate-y-180 bg-blue-900 text-white rounded-lg p-4 shadow flex flex-col justify-between">
            <div className="h-10 bg-black rounded-sm mt-2"></div>
            <div className="mt-6 relative">
              <div className="bg-white h-8 flex items-center px-2 pr-10 text-black text-sm italic bg-[repeating-linear-gradient(45deg,white,white_5px,#ccc_5px,#ccc_10px)] rounded-sm">
                Signature
              </div>
              <div className="absolute right-2 top-0 bottom-0 flex items-center bg-white px-2 text-black font-bold rounded-sm">
                485
              </div>
            </div>
            <div className="flex justify-between items-end text-xs opacity-50 mt-8">
              <span className="text-white font-light">
                MEMIC FINANCIAL BANK
              </span>
              <span className="text-white font-bold text-base">VISA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
