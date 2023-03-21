const userKey = "user";
export const tokenKey = "token";

export const useUser = () => {
  const setUser = (userInfo) =>
    localStorage.setItem(userKey, JSON.stringify(userInfo));

  const getUser = () => JSON.parse(localStorage.getItem(userKey));

  const setToken = (token) => localStorage.setItem(tokenKey, token);

  const getToken = () => localStorage.getItem(tokenKey);

  return { setUser, getUser, setToken, getToken };
};
