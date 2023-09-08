import { useContextSelector } from "use-context-selector";
import { Header } from "../../Components/Header";
import { Summary } from "../../Components/Summary";
import { TransactionsContext } from "../../Contexts/TransactionsContext";
import { dataFormatter, priceFormatter } from "../../Utils/formatter";
import { SearchForm } from "./Components/SearchForm";
import { PriceHighLight, TransactionsContainer, TransactionsTable } from "./styles";


export function Transactions() {
    const transactions = useContextSelector(TransactionsContext, (context) => {
        return context.transactions
    })

    return (
        <div>
            <Header />
            <Summary />

            <TransactionsContainer>
                <SearchForm />

                <TransactionsTable>
                    <tbody>
                        {transactions.map(transaction => {
                            return (
                                <tr key={transaction.id}>
                                    <td width='50%'>{transaction.DESCRIPTION}</td>
                                    <td>
                                        <PriceHighLight variant={transaction.TYPE}>
                                            {transaction.TYPE === 'outcome' && '- '}
                                            {priceFormatter.format(transaction.PRICE)}
                                        </PriceHighLight>
                                    </td>
                                    <td>{transaction.CATEGORY}</td>
                                    <td>{dataFormatter.format(new Date(transaction.CREATED_AT))}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    )
}