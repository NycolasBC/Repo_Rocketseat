import { useContextSelector } from "use-context-selector"
import { TransactionsContext } from "../Contexts/TransactionsContext"
import { useMemo } from 'react'

export function useSummary() {
    const transactions = useContextSelector(TransactionsContext, (context) => {
        return context.transactions
    })

    const summary = useMemo(() => {
        return transactions.reduce(
            (acc, transactions) => {
                if (transactions.TYPE === 'income') {
                    acc.income += transactions.PRICE
                    acc.total += transactions.PRICE
                } else {
                    acc.outcome += transactions.PRICE
                    acc.total -= transactions.PRICE
                }

                return acc
            },
            {
                income: 0,
                outcome: 0,
                total: 0
            }
        )
    }, [transactions])

    return summary
}