import axios from "axios";

const API_URL = `${process.env.REACT_APP_BACK_URL}/Admins`;

export const useAdmins = () => {
  const getAdmins = async () => {
    const response = await axios.get(API_URL);
    return response.data;
  };

  const getAdmin = async (id) => {
    const response = await axios.get(API_URL + `/${id}`);
    return response.data;
  };

  const postAdmin = async (name, email, password) => {
    const response = await axios.post(API_URL, {
      name,
      email,
      password,
    });
    return response.data;
  };

  const putAdmin = async (id, name, email, password) => {
    const response = await axios.patch(API_URL + `/${id}`, {
      name,
      email,
      password,
    });
    console.log(response.data);
    return response.data;
  };

  const deleteAdmin = async (id) => {
    const response = await axios.delete(API_URL + `/${id}`);
    console.log(response.data);
    return response.data;
  };

  return {
    getAdmins,
    getAdmin,
    postAdmin,
    putAdmin,
    deleteAdmin,
  };
};
