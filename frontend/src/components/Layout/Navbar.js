import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <nav>
      <h2>💰 Finance Tracker</h2>
      <div className="nav-right">
        <span>👤 {user?.name}</span>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </nav>
  )
}

export default Navbar;