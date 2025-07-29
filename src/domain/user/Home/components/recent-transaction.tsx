import { useEffect, useState } from "react";
import { getUserTransaction } from "../../../admin/Home/api/admin-endpoints.api";

interface Transaction {
  id: string;
  type: string;
  amount: number;
  status: string;
  description: string;
  createdAt: string;
}

const RecentTransaction = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
      const currentUserId = localStorage.getItem("userId");
      if (!currentUserId) {
        setError("User ID not found");
        setLoading(false);
        return;
      }
      const response = await getUserTransaction(currentUserId);
      setTransactions(response.transactions);
      } catch (err) {
        setError("Failed to load transactions");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <div className="text-center">Loading transactions...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>

      {transactions.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No transactions found
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="min-w-[800px] w-full text-xs text-left text-gray-700 border-separate border-spacing-y-1">
            <thead className="bg-[#F5F6FA] text-gray-500 font-medium border-b border-gray-300">
              <tr>
                <th className="py-2 px-2">REFERENCE ID</th>
                <th className="px-2">TYPE</th>
                <th className="px-2">AMOUNT</th>
                <th className="px-2">DESCRIPTION</th>
                <th className="px-2">STATUS</th>
                <th className="px-2">DATE</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="bg-white border-b border-gray-200"
                >
                  <td className="py-2 px-2">#{transaction.id.slice(0, 8)}</td>
                  <td className="px-2 capitalize">{transaction.type}</td>
                  <td
                    className={`px-2 ${
                      transaction.type === "transfer" || transaction.type === "debit"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {transaction.type === "transfer" ? "-" : "+"}$
                    {transaction.amount.toFixed(2)}
                  </td>
                  <td className="px-2 truncate max-w-[120px]">
                    {transaction.description}
                  </td>
                  <td className="px-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === "completed" || transaction.status === "success"
                          ? "bg-green-100 text-green-800"
                          : transaction.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-2">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentTransaction;
