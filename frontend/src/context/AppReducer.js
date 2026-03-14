const AppReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return ({
        ...state,
        transactions: [action.payload, ...state.transactions]
      })
    case 'UPDATE_TRANSACTION':
      return ({
        ...state,
        transactions: state.transactions.map((t) => t._id === action.payload._id ? action.payload : t)
      })
    case 'DELETE_TRANSACTION':
      return ({
        ...state,
        transactions: state.transactions.filter((t) => t._id !== action.payload)
      })
    case 'SET_TRANSACTION':
      return ({
        ...state,
        transactions: action.payload 
      })
    default:
      return state;
  }
}

export default AppReducer;