import axios from "axios";

const Authorization = null;
var instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    headers: {
        Authorization: Authorization
    }
});

export default instance;