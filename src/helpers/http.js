 import axios from "axios";

 const Http = (token) =>{
    const headers = {}
    if(token){
        headers.Authorization = `Bearer ${token}`
    } 
    return axios.create({
        headers,
        baseURL: 'http://localhost:8888'
        // baseURL: 'https://lime-frail-crow.cyclic.app'
    })
 }

 export default Http