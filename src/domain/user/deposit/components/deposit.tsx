const Deposit = () => {
    return (
      <div className="max-w-2xl w-full mt-10 bg-white p-8 rounded-md shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-6">Deposit form</h2>
      
  
        {/* Deposit Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Deposit Amount
          </label>
          <input
            type="number"
            id="amount"
            placeholder="Amount"
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none"
          />
        </div>
  
        {/* Deposit Method */}
        <div className="mb-6">
          <label htmlFor="method" className="block text-sm font-medium text-gray-700 mb-2">
            Prefer Deposit Method
          </label>
          <select
            id="method"
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none"
          >
            <option>Wire Transfer</option>
            <option>Bank Deposit</option>
            <option>Mobile Money</option>
          </select>
        </div>
  
        {/* Button */}
        <button
          type="submit"
          className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition duration-200"
        >
          Continue
        </button>
      </div>
    );
  };
  
  export default Deposit;
  