// src/views/financial-overview.tsx
import { IoMdAddCircleOutline } from "react-icons/io";
import AccountDetails from "../../Home/components/account-details";
import Balance from "../../Home/components/balance";
import RecentTransaction from "../../Home/components/recent-transaction";
import { LuCopy } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const HomeView = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="p-3 md:p-10 mb-20 w-screen lg:w-[100%]">
        <div className="relative flex justify-between border-b pb-2 border-gray-200 before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-1 before:w-9 before:bg-blue-900">
          <h2 className="text-lg font-semibold pb-2">Financial Overview</h2>
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <button
              onClick={() => navigate("/user/dashboard/deposit")}
              className="flex gap-1 items-center bg-blue-900 p-1 rounded-sm text-sm text-white cursor-pointer"
            >
              <IoMdAddCircleOutline size={18} />
              <h1>Add Deposit</h1>
            </button>

            <button
              onClick={() => navigate("/user/dashboard/international-transfer")}
              className="flex gap-1 items-center bg-green-500 p-1 rounded-sm text-sm text-white cursor-pointer"
            >
              <LuCopy size={15} />
              <h1>Make Transfer</h1>
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-col lg:flex-col xl:flex-row mt-4 gap-3 md:gap-6">
          <Balance />
          <AccountDetails />
        </div>
        <div className="w-full overflow-x-auto">
          <RecentTransaction />
        </div>
      </div>
    </>
  );
};

export default HomeView;
