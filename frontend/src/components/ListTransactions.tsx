import { useEffect, useState } from "react";
import { fetchTransactions } from "../services/blockchainServices";

export const ListTransactions = () => {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    const getTransactions = await fetchTransactions();
    if (getTransactions.data) {
      setTransactions(getTransactions.data);
      console.log(getTransactions.data);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
          Transactions
        </h1>
        <div className="mt-5">
          <ul className="divide-y divide-gray-200">
            <li className="py-4">
              <div className="flex space-x-3">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-gray-900">
                    Transaction Id: {transactions.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    {transactions.outputMap}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-sm font-medium text-gray-900"></p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
