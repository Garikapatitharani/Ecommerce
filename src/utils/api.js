const BASE_URL = "https://coding-assignment-server.vercel.app";

// LOGIN
export const loginUser = async (data) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: data.email.trim(),
      password: data.password.trim(),
      mobile: String(data.mobile).trim(),
    }),
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Login failed");
  return result;
};

// GET PRODUCTS
export const getProducts = async (token) => {
  const res = await fetch(`${BASE_URL}/products`, {
    headers: { authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return data;
};

// VALIDATE TOKEN
export const validateToken = async (token) => {
  const res = await fetch(`${BASE_URL}/validateToken`, {
    headers: { authorization: `Bearer ${token}` },
  });
  return res.json();
};
