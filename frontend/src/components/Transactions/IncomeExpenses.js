import { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";

const IncomeExpenses = () => {
  const { summary } = useContext(TransactionContext);

 return (
  <div className="inc-exp-container">
    <div>
      <h4>Income</h4>
      <p className="money plus">${summary?.income || 0}</p>
    </div>
    <div>
      <h4>Expense</h4>
      <p className="money minus">${summary?.expense || 0}</p>
    </div>
  </div>
)
}

export default IncomeExpenses;