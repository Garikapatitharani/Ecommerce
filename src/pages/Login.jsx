import { useState } from "react";
import { loginUser } from "../utils/api";
import { saveAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", mobile: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!/^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(form.password))
      e.password = "Min 8 chars, 1 number, 1 special char";
    if (!/^\d{10}$/.test(form.mobile)) e.mobile = "Mobile must be 10 digits";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await loginUser(form);
      alert(res.message); //login successful ✅🎉
      saveAuth(res);
      setTimeout(()=> nav("/productlist"),200);
    } catch {
      alert("Login failed. Check credentials format.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              placeholder="Email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="input-group">
            <input
              placeholder="Mobile"
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            />
            {errors.mobile && <p className="error">{errors.mobile}</p>}
          </div>

          <button className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}
