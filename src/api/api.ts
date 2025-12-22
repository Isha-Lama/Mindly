import axios from "axios";

const api = axios.create({
  baseURL: "http://poem:7999/",
  headers: {"Content-type": "application/json"},
});

//attaching token for authentication
api.interceptors.request.use((config)=>{
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

//error handler
api.interceptors.response.use(
  (response) => response,
  (error) =>{
    if(error.response?.status === 401){
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;