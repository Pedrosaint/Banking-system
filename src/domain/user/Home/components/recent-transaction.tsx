const RecentTransaction = () => {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>

      {/* Scrollable container */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[800px] w-full text-xs text-left text-gray-700 border-separate border-spacing-y-1">
          {/* Table Head */}
          <thead className="bg-[#F5F6FA] text-gray-500 font-medium border-b border-gray-300">
            <tr>
              <th className="py-2 px-2">REFERENCE ID</th>
              <th className="px-2">SENDER/BENEFICIARY</th>
              <th className="px-2">TYPE</th>
              <th className="px-2">AMOUNT</th>
              <th className="px-2">DESCRIPTION</th>
              <th className="px-2">STATUS</th>
              <th className="px-2">DATE</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {/* Example Row */}
            <tr className="bg-white border-b border-gray-200">
              <td className="py-2 px-2">#12345678</td>
              <td className="px-2">John Doe</td>
              <td className="px-2">Transfer</td>
              <td className="px-2">$500.00</td>
              <td className="px-2">Payment</td>
              <td className="px-2 text-green-600">Completed</td>
              <td className="px-2">2025-05-10</td>
            </tr>
            {/* Add more rows dynamically here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default RecentTransaction;