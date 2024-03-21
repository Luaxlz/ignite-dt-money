import { Header } from '../../components/Header';
import { Summary } from '../../components/Header/Summary';
import { SearchForm } from './components/SearchForm';
import {
  DeleteButton,
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles';
import { Transaction } from '../../@types/transactionType';
import { TransactionsContext } from '../../contexts/TransactionContext';
import currencyFormatter from '../../helpers/currencyFormat';
import { useContextSelector } from 'use-context-selector';
import { Trash } from '@phosphor-icons/react';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  const deleteTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.deleteTransaction;
    },
  );

  const handleDelete = async (transactionId: number) => {
    try {
      const result: AxiosResponse = await deleteTransaction(transactionId);
      if (result.status === 200) {
        toast.success('Transação deletada com sucesso!', {
          position: 'top-center',
        });
      } else {
        toast.error('Não foi possível deletar transação no momento!', {
          position: 'top-center',
        });
      }
    } catch (error) {}
  };

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
                      {currencyFormatter(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {new Date(transaction.createdAt).toLocaleDateString(
                      'pt-br',
                    )}
                  </td>
                  <td>
                    <DeleteButton onClick={() => handleDelete(transaction.id)}>
                      <Trash size={22} weight='fill' />
                    </DeleteButton>
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
