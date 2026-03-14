import { useContext, useEffect } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import Balance from "../Transactions/Balance";
import IncomeExpenses from "../Transactions/IncomeExpenses";
import TransactionList from "../Transactions/TransactionList";
import AddTransaction from "../Transactions/AddTransaction";

const Dashboard = () => {
  const { loadtransactions, loadsummary } = useContext(TransactionContext);

  useEffect(() => {
    loadtransactions();
    loadsummary();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <h2>Personal Finance Tracker</h2>
      <Balance />
      <IncomeExpenses />
      <AddTransaction />
      <TransactionList />
    </div>
  )
}

export default Dashboard;