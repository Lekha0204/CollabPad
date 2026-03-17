import axios from "axios";


const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL 
});

export const createPad = () => API.post("/pads");
export const getPad = (code) => API.get(`/pads/${code}`);

export const updatePad = (code, data) =>
  API.put(`/pads/${code}`, data);
