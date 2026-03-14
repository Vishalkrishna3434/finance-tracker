const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

//register - no token needed
export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify(data)
  })
  return res.json();
}

//login - no token needed
export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify(data)
  })
  return res.json();
}

//get transactions - token needed
export const getTransactions = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/transactions`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return res.json();
}

//post transactions - token needed
export const postTransaction = async (data) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/transactions`, {
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },body:JSON.stringify(data)
  })
  return res.json();
}

//get transactions summary - token needed
export const getSummaryOfTransactions = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/transactions/summary`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return res.json();
}

//get transaction by id - token needed
export const getTransactionbyid = async (id) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/transactions/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  return res.json();
}

//put transaction by id - token needed
export const putTransactionbyid = async (id,data) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/transactions/${id}`, {
    method:'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },body:JSON.stringify(data)
  })
  return res.json();
}

//delete transaction by id - token needed
export const deleteTransactionbyid = async (id) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/transactions/${id}`, {
    method:'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  return res.json();
}



