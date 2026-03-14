import { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";

const TransactionItem = ({ transaction }) => {
  const { deletetransaction } = useContext(TransactionContext);

  return (
    <li className={transaction.type === 'income' ? 'plus' : 'minus'}>
      <span>{transaction.title}</span>
      <span>${transaction.amount}</span>
     <button className="delete-btn" onClick={() => deletetransaction(transaction._id)}>x</button>
    </li>
  )
}

export default TransactionItem;