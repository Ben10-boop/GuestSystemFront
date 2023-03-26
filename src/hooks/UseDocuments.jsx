import axios from "axios";

const API_URL = `${process.env.REACT_APP_BACK_URL}/Documents`;

export const useDocuments = () => {
  const getDocuments = async () => {
    const response = await axios.get(API_URL);
    return response.data;
  };

  const getDocument = async (id) => {
    const response = await axios.get(API_URL + `/${id}`);
    return response.data;
  };

  const postDocument = async (title, content, status) => {
    console.log(content);
    const response = await axios.post(API_URL, {
      title,
      content,
      status,
    });
    return response.data;
  };

  const putDocument = async (id, title, content, status) => {
    const response = await axios.patch(API_URL + `/${id}`, {
      title,
      content,
      status,
    });
    console.log(response.data);
    return response.data;
  };

  const deleteDocument = async (id) => {
    const response = await axios.delete(API_URL + `/${id}`);
    console.log(response.data);
    return response.data;
  };

  return {
    getDocuments,
    getDocument,
    postDocument,
    putDocument,
    deleteDocument,
  };
};
