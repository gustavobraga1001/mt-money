import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { PriceHighLight, TransactionsContainer, TrasactionsTable } from './styles'
import { SearchForm } from './components/SearchForm'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { useContextSelector } from 'use-context-selector'


export const Transactions = () => {
   const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
   })

  return (
    <div>
        <Header />
        <Summary />

        <TransactionsContainer>
          <SearchForm />
          <TrasactionsTable>
            <tbody>
              {transactions.map(transaction => {
                return (
                  <tr key={transaction.id}>
                    <td width="50%">{transaction.description}</td>
                    <td>
                      <PriceHighLight variant={transaction.type}>
                        {transaction.type === 'outcome' && "- "}
                        {priceFormatter.format(transaction.price)}
                      </PriceHighLight>
                    </td>
                    <td>{transaction.category}</td>
                    <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                  </tr>
                )
              })}
            </tbody>
        </TrasactionsTable>
        </TransactionsContainer>
    </div>
  )
}
