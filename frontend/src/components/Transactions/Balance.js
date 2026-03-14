import { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";

const Balance = () => {
  const { summary } = useContext(TransactionContext);

  return (
    <div className="balance">
      <h4>Your Balance</h4>
      <h1>${summary?.balance || 0}</h1>
    </div>
  )
}

export default Balance;