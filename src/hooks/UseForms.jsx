import axios from "axios";

const API_URL = `${process.env.REACT_APP_BACK_URL}/FormSubmissions`;

export const useForms = () => {
  const getForms = async () => {
    const response = await axios.get(API_URL);
    return response.data;
  };

  const getForm = async (id) => {
    const response = await axios.get(API_URL + `/${id}`);
    return response.data;
  };

  const postForm = async (
    name,
    email,
    visitPurpose,
    signature,
    entranceTime,
    departureTime,
    visiteeId,
    wifiAccessStatus
  ) => {
    const response = await axios.post(API_URL, {
      name,
      email,
      visitPurpose,
      signature,
      entranceTime,
      departureTime,
      visiteeId,
      wifiAccessStatus,
    });
    return response.data;
  };

  const putForm = async (
    id,
    name,
    email,
    visitPurpose,
    signature,
    entranceTime,
    departureTime,
    visiteeId,
    wifiAccessStatus
  ) => {
    const response = await axios.patch(API_URL + `/${id}`, {
      name,
      email,
      visitPurpose,
      signature,
      entranceTime,
      departureTime,
      visiteeId,
      wifiAccessStatus,
    });
    console.log(response.data);
    return response.data;
  };

  const getFormDocuments = async (id) => {
    const response = await axios.get(API_URL + `/${id}/Documents`);
    console.log(response.data);
    return response.data;
  };

  const deleteForm = async (id) => {
    const response = await axios.delete(API_URL + `/${id}`);
    console.log(response.data);
    return response.data;
  };

  return {
    getForms,
    getForm,
    postForm,
    putForm,
    getFormDocuments,
    deleteForm,
  };
};
