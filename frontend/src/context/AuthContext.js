import { createContext, useState } from "react";
import { loginUser, registerUser } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    token: localStorage.getItem('token'),
    name: localStorage.getItem('name')
  });
  async function login(formData) {
    const data = await loginUser(formData);
    localStorage.setItem('token', data.token);
    localStorage.setItem('name', data.user.name);
    setUser({ token: data.token, name: data.user.name });
  }
  async function register(formData) {
    const data = await registerUser(formData);
    localStorage.setItem('token', data.token);
    localStorage.setItem('name', data.name);
     setUser({ token: data.token, name: data.name });
  }
  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    setUser(null);
  }
  return (<AuthContext.Provider
    value={{ user,login, register, logout }}>
    {children}
  </AuthContext.Provider>)
}