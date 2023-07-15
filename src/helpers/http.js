 import axios from "axios";

 const Http = (token) =>{
    const headers = {}
    if(token){
        headers.Authorization = `Bearer ${token}`
    } 
    return axios.create({
        headers,
        baseURL: 'https://lime-frail-crow.cyclic.app'
        // baseURL: import.meta.env.VITE_BACKEND_URL,
    })
 }

 export default Http