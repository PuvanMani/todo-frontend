import axios from "axios";
export const Axios = axios.create({
    baseURL: "http://localhost:3002/",
    headers: {
        token: localStorage.getItem("token"),
        userid: localStorage.getItem("userid"),
        username: localStorage.getItem("username"),
    },
});
