import { useState, useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";

const AddTransaction = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');
  const { addtransaction } = useContext(TransactionContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addtransaction({ title, amount: parseFloat(amount), type });
    setTitle('');
    setAmount('');
    setType('income');
  }

  return (
    <div>
      <h3>Add New Transaction</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input type="text" value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title" />
        </div>
        <div>
          <label>Amount</label>
          <input type="number" value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount" />
        </div>
        <div>
          <label>Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <button className="btn" type="submit">Add Transaction</button>
      </form>
    </div>
  )
}

export default AddTransaction;