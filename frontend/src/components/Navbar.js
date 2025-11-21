import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ token, setToken }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <div className="card header">
      <div style={{ fontSize: 25, }}><strong>ExpenseTracker</strong></div>
      <div className="nav">
        {token ? (
          <>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn">Login</Link>
            <Link to="/register" className="btn">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}
