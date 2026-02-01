import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";
import { validateToken } from "../utils/api";

export default function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const check = async () => {
      const token = getToken();
      if (!token) return navigate("/");

      const res = await validateToken(token);
      if (res.isValid) setAllowed(true);
      else navigate("/");
    };
    check();
  }, []);

  return allowed ? children : null;
}
