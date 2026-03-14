import { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import TransactionItem from "./TransactionItem";

const TransactionList = () => {
  const { transactions } = useContext(TransactionContext);

  return (
    <div>
      <h3>Transaction History</h3>
      <ul className="list">
        {transactions.map(transaction => (
          <TransactionItem 
            key={transaction._id} 
            transaction={transaction} 
          />
        ))}
      </ul>
    </div>
  )
}

export default TransactionList;