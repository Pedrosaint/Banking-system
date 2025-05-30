// src/components/account/account-details.tsx

import { IoIosAddCircleOutline } from "react-icons/io";
import { Button } from "../../../../general/components/common/button";

const AccountDetails = () => {
  return (
    <div className="bg-white p-4 rounded w-full shadow-md">
      <h2 className="text-xl font-semibold w-full mb-4">Account Details</h2>
      <div className="space-y-2 text-sm w-full">
        <div className="flex justify-between">
          <span>Account Name :</span>
          <span>Susan Anthony</span>
        </div>
        <div className="flex justify-between">
          <span>Balance :</span>
          <span>$2,141,210.00</span>
        </div>
        <div className="flex justify-between">
          <span>Account Type :</span>
          <span>Checking</span>
        </div>
        <div className="flex justify-between">
          <span>Account Number :</span>
          <span>15882******22</span>
        </div>
        <div className="flex justify-between">
          <span>Swift Code :</span>
          <span>0TFB2724502</span>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <Button
          variant="secondary"
          size="default"
          className="flex items-center gap-2"
        >
          <IoIosAddCircleOutline size={15} className="font-bold" />
          <span className="uppercase text-[75%]">Delete Card</span>
        </Button>
        <Button variant="primary" size="default">
          <span className="uppercase text-[75%]">Fund Card</span>
        </Button>
      </div>
    </div>
  );
};

export default AccountDetails;
