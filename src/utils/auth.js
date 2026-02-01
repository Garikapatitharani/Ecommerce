export const saveAuth = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("userName", data.userName);
};

export const getToken = () => localStorage.getItem("token");

export const logout = () => localStorage.clear();
