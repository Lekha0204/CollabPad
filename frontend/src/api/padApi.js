import axios from "axios";


const API = axios.create({
  baseURL: "http://localhost:8080/api"
});

export const createPad = () => API.post("/pads");
export const getPad = (code) => API.get(`/pads/${code}`);

export const updatePad = (code, content) =>
  API.put(`/pads/${code}`, content, {
    headers: { "Content-Type": "text/plain" }
  });