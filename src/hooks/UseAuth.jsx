import axios from "axios";
import jwt_decode from "jwt-decode";
import { useUser } from "./UseUser";

const API_URL = `${process.env.REACT_APP_BACK_URL}/Auth`;

export const useAuth = () => {
  const { setUser, setToken } = useUser();

  const login = async (email, password) => {
    const response = await axios.post(API_URL + "/login", {
      email,
      password,
    });
    console.log(response.data);

    //for logout delete from localStorage and axios default
    setToken(response.data);
    axios.defaults.headers.common["Authorization"] = `bearer ${response.data}`;

    setUser(jwt_decode(response.data));

    return response.data;
  };

  const logout = async () => {
    setToken("");
    setUser(null);
  };

  //   const registerUser = async (email, password) => {
  //     console.log({
  //       email,
  //       password,
  //     });
  //     // try {
  //     const response = await axios.post(API_URL + "/Register", {
  //       email,
  //       password,
  //     });
  //     return response.data;
  //     // } catch (err) {
  //     //   localStorage.setItem("backError", err);
  //     // }
  //   };

  return { login, logout };
};
