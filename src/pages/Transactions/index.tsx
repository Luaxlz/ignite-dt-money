import { Header } from '../../components/Header';
import { Summary } from '../../components/Header/Summary';
import { SearchForm } from './components/SearchForm';
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles';
import { Transaction } from '../../@types/transactionType';
import { TransactionsContext } from '../../contexts/TransactionContext';
import currencyFormatter from '../../helpers/currencyFormat';
import { useContextSelector } from 'use-context-selector';

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map((transaction: Transaction) => {
              return (
                <tr>
                  <td width='50%'>{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {currencyFormatter(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {new Date(transaction.createdAt).toLocaleDateString(
                      'pt-br',
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
