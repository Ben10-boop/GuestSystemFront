import axios from "axios";

const API_URL = `${process.env.REACT_APP_BACK_URL}/VisitableEmployees`;

export const useVisitees = () => {
  const getVisitees = async () => {
    const response = await axios.get(API_URL);
    return response.data;
  };

  const getAllVisitees = async () => {
    const response = await axios.get(API_URL + "/All");
    return response.data;
  };

  const getVisitee = async (id) => {
    const response = await axios.get(API_URL + `/${id}`);
    return response.data;
  };

  const postVisitee = async (name, email) => {
    const response = await axios.post(API_URL, {
      name,
      email,
    });
    return response.data;
  };

  const putVisitee = async (id, name, email, status) => {
    const response = await axios.patch(API_URL + `/${id}`, {
      name,
      email,
      status,
    });
    console.log(response.data);
    return response.data;
  };

  const deleteVisitee = async (id) => {
    const response = await axios.delete(API_URL + `/${id}`);
    console.log(response.data);
    return response.data;
  };

  return {
    getVisitees,
    getAllVisitees,
    getVisitee,
    postVisitee,
    putVisitee,
    deleteVisitee,
  };
};
