import { useState } from "react";
import { sendTransactionRequest } from "../services/blockchainServices";
import { ErrorModal } from "../components/ErrorModal";
import { SuccessModal } from "../components/SuccessModal";
import { MineButton } from "../components/MineButton";
import { ListTransactions } from "../components/ListTransactions";

export const Transact = () => {
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await sendTransactionRequest(recipient, amount);
    console.log(response.data);

    if (response.data) {
      setSuccessMsg("Transaction sent successfully");
      setSuccess(true);
      return;
    }
    if (response.error) {
      setErrorMsg("Failed to send transaction");
      setError(true);
      return;
    }
  };

  return (
    <>
      {error && (
        <ErrorModal
          setError={setError}
          errorMsg={errorMsg}
          headMsg="Transaction Failed"
        />
      )}
      {success && (
        <SuccessModal
          setRead={setSuccess}
          Msg={successMsg}
          headMsg="Transaction Successful"
        />
      )}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Send your transaction
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="recipient"
              >
                Reciever address
              </label>
              <div className="mt-2">
                <input
                  id="recipient"
                  name="recipient"
                  type="text"
                  onChange={(e) => setRecipient(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  className="block text-sm font-medium leading-6 text-gray-900"
                  htmlFor="amount"
                >
                  Amount
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  onChange={(e) => setAmount(parseInt(e.target.value))}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send transaction
              </button>
            </div>
            <MineButton />
          </form>
          <ListTransactions />
        </div>
      </div>
    </>
  );
};
