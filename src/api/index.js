import axios from "axios";

const instance = axios.create({
    baseURL: "https://burger-app-429a8.firebaseio.com/",
});

export default instance;
