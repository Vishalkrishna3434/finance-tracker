import { createContext, useReducer, useState } from "react";
import AppReducer from "./AppReducer";
import { getTransactions, postTransaction, deleteTransactionbyid, putTransactionbyid, getSummaryOfTransactions } from '../services/api';

const IntialState = {
  transactions: [],
  summary: { income: 0, expense: 0, balance: 0 }
}

//create context
export const TransactionContext = createContext(IntialState);

//provider component
export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, IntialState);
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });
  //actions
  async function addtransaction(transaction) {
    const res = await postTransaction(transaction);
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: res.data
    })
    loadsummary();
  }
  async function loadsummary() {
    const res = await getSummaryOfTransactions();
    setSummary(res.data);
  }
  async function deletetransaction(id) {
    await deleteTransactionbyid(id);
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    })
    loadsummary();
  }
  async function loadtransactions() {
    const res = await getTransactions();
    dispatch({ type: 'SET_TRANSACTION', payload: res.data || [] })
  }
  async function updatetransaction(id, data) {
    const res = await putTransactionbyid(id, data);
    dispatch({
      type: 'UPDATE_TRANSACTION',
      payload: res.data
    })
  }
  return (
    <TransactionContext.Provider value={{
      transactions: state.transactions,
      summary,
      addtransaction,
      deletetransaction,
      loadtransactions,
      updatetransaction,
      loadsummary
    }}>
      {children}
    </TransactionContext.Provider>
  )
}