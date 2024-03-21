import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Transaction } from '../@types/transactionType';
import { api } from '../lib/axios';
import { createContext } from 'use-context-selector';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

type TransactionContextType = {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createNewTransaction: (data: CreateNewTransactionData) => Promise<void>;
  deleteTransaction: (transactionId: number) => Promise<AxiosResponse>;
};

type TransactionProviderProps = {
  children: ReactNode;
};

type CreateNewTransactionData = {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
};

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    });
    setTransactions(response.data);
  }, []);

  const createNewTransaction = useCallback(
    async ({
      category,
      description,
      price,
      type,
    }: CreateNewTransactionData) => {
      const response = await api.post('transactions', {
        description,
        price,
        category,
        type,
        createdAt: new Date(),
      });

      setTransactions((state) => [response.data, ...state]);
      toast.success('Transação criada com sucesso!', {
        position: 'top-center',
      });
    },
    [],
  );

  const deleteTransaction = async (transactionId: number) => {
    const response = await api.delete(`/transactions/${transactionId}`);
    fetchTransactions();
    return response;
  };

  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createNewTransaction,
        deleteTransaction,
      }}>
      {children}
    </TransactionsContext.Provider>
  );
}
