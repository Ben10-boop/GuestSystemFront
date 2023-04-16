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
    return response.data;
  };

  const getActiveGuests = async () => {
    const response = await axios.get(API_URL + `/ActiveGuests`);
    return response.data;
  };

  const getActiveForms = async () => {
    const response = await axios.get(API_URL + `/Active`);
    return response.data;
  };

  const getRecentForms = async () => {
    const response = await axios.get(API_URL + `/Recent`);
    return response.data;
  };

  const deleteForm = async (id) => {
    const response = await axios.delete(API_URL + `/${id}`);
    return response.data;
  };

  const endVisit = async (id) => {
    const response = await axios.patch(API_URL + `/${id}/EndVisit`);
    return response.data;
  };

  const sendAlarm = async (message) => {
    const response = await axios.post(API_URL + `/Active/Alarm`, { message });
    return response.data;
  };

  return {
    getForms,
    getForm,
    postForm,
    putForm,
    getFormDocuments,
    getActiveGuests,
    getActiveForms,
    sendAlarm,
    deleteForm,
    getRecentForms,
    endVisit,
  };
};
