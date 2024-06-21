import { useState } from "react";
import { mineTransactionRequest } from "../services/blockchainServices";
import { SuccessModal } from "./SuccessModal";

export const MineButton = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>("");

  const clickHandler = async () => {
    const mine = await mineTransactionRequest();

    if (mine.data) {
      setSuccessMsg("Transaction Mined Successfully");
      setSuccess(true);
      console.log(mine.data);
      return;
    }
  };

  return (
    <>
      {success && (
        <SuccessModal
          setRead={setSuccess}
          Msg={successMsg}
          headMsg="Transaction Mined"
        />
      )}
      <button
        onClick={clickHandler}
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Mine Transaction
      </button>
    </>
  );
};
