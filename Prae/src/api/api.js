import axios from "axios";

const apiUrl = "https:/prae-backend-projeto.herokuapp.com";

const api = axios.create({
  baseURL: apiUrl,
});

export default api;
