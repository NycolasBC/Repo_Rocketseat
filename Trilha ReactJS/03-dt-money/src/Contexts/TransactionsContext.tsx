import { ReactNode, useEffect, useState, useCallback } from "react";
import { createContext } from "use-context-selector";
import { api } from "../Lib/axios";

interface Transactions {
    id: number,
    DESCRIPTION: string,
    TYPE: 'income' | 'outcome',
    CATEGORY: string,
    PRICE: number,
    CREATED_AT: string
}

interface CreateTransactionInput {
    DESCRIPTION: string;
    PRICE: number;
    CATEGORY: string;
    TYPE: 'income' | 'outcome';
}

interface TransactionsContextType {
    transactions: Transactions[];
    fetchTransactions: (query?: string) => Promise<void>;
    createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionsProviderProps {
    children: ReactNode;
}


export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transactions[]>([])

    const fetchTransactions = useCallback(async (query?: string) => {
        const response = await api.get('/transactions', {
            params: {
                _sort: 'CREATED_AT',
                _order: 'desc',
                q: query
            }
        })

        setTransactions(response.data)
    }, [])

    const createTransaction = useCallback(async (data: CreateTransactionInput) => {
        const { DESCRIPTION, CATEGORY, PRICE, TYPE } = data

        const response = await api.post('/transactions', {
            DESCRIPTION,
            CATEGORY,
            PRICE,
            TYPE,
            CREATED_AT: new Date()
        })

        setTransactions(state => [response.data, ...state])
    }, [])

    useEffect(() => {
        fetchTransactions()
    }, [fetchTransactions])

    return (
        <TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}