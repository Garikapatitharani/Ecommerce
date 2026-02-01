import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import './Navbar.css'

export default function Navbar() {
  const nav = useNavigate();
  const user = localStorage.getItem("userName");

  return (
    <nav className="navbar">
      <h3>Welcome {user}</h3>
      <button className='logout-btn' onClick={()=>{ logout(); nav("/"); }}>Logout</button>
    </nav>
  );
}