import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (person) => {
  return axios.post(baseUrl, person);
};

const deleteEntry = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const updateNumber = (id) => {
  //TODO
};

export default { getAll, create, deleteEntry };
