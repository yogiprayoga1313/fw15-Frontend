 import axios from "axios";

 const Http = (token) =>{
    const headers = {}
    if(token){
        headers.Authorization = `Bearer ${token}`
    } 
    return axios.create({
        headers,
        baseURL: import.meta.env.VITE_BACKEND_URL,
        // baseURL: 'https://calm-rose-octopus-sari.cyclic.app'
    })
 }

 export default Http