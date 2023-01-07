import axios from "axios";

const request = axios.create({
  baseURL: "http://192.168.8.108:3039/",
  timout: 1000,
  headers: { 
    Authorization: "token", 
  },
});

//. load contact
export const fetchData = (params, query = {}) =>
  request.get("/api/phonebooks", {
    params: { ...params, ...query },
  });

//. add contact
export const addData = ({ name, phone }) => request.post("/api/phonebooks", { name, phone });

//. update contact
export const updateData = ({ id, name, phone }) => request.put(`/api/phonebooks/${id}`, { name, phone });

//. delete contact
export const deleteData = ({ id }) => request.delete(`/api/phonebooks/${id}`);