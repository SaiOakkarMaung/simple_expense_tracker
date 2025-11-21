import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { name, email, password });
      navigate("/login");
    } catch (error) {
      setErr(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Register</h2>
        <form onSubmit={submit}>
          <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button type="submit">Register</button>
        </form>
        {err && <p className="small" style={{color:"red"}}>{err}</p>}
      </div>
    </div>
  );
}
