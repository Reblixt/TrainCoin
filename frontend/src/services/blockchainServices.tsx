import { endpoint } from "../config/settings";

type createAccountType = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export const createAccount = async ({
  name,
  email,
  password,
  role,
}: createAccountType) => {
  const response = await fetch(endpoint.register, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
      role: role,
    }),
  });

  return responseHandler(response);
};

export const fetchBlockchain = async () => {
  const response = await fetch(endpoint.getBlockchain, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return responseHandler(response);
};

export const fetchTransactions = async () => {
  const response = await fetch(endpoint.GetTransaction, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return responseHandler(response);
};

export const loginRequest = async (email: string, password: string) => {
  const response = await fetch(endpoint.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });

  return responseHandler(response);
};

export const sendTransactionRequest = async (
  recipient: string,
  amount: number,
) => {
  const tokenLocal: string | null = localStorage.getItem("Bearer");
  if (!tokenLocal) return console.log("Token not found");
  const token: string = JSON.parse(tokenLocal);

  const response = await fetch(endpoint.AddTransaction, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ recipient: recipient, amount: amount }),
  });

  return responseHandler(response);
};

export const mineTransactionRequest = async () => {
  const mineTransaction = await fetch(endpoint.mineTransaction, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return responseHandler(mineTransaction);
};

const responseHandler = (response: any) => {
  if (response.ok) {
    try {
      const data = response.json();
      return data;
    } catch (error) {
      throw new Error("Failed to send transaction");
    }
  } else {
    return { error: true };
  }
};
