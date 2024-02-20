import axios from "axios";

const axiosInstance = axios.create({
    // local instance of firebase functions url
    // baseURL: "http://127.0.0.1:5001/clone-df63b/us-central1/api",
    // render url/deployed version of amazone-server on render.com
    baseURL: "https://amazoneclonebackend-zewb.onrender.com"
});


export {axiosInstance};