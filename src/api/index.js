import axios from "axios";

const instance = axios.create({
    baseURL: "https://burger-app-429a8.firebaseio.com/",
});

export const signUpAPI = axios.create({
    baseURL:
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBxanQtiRccFtxFJZib3S3Qs_8DhcxRV_E",
    headers: {
        post: {
            "Content-Type": "application/json",
        },
    },
});

export const signInAPI = axios.create({
    baseURL:
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBxanQtiRccFtxFJZib3S3Qs_8DhcxRV_E",
    headers: {
        post: {
            "Content-Type": "application/json",
        },
    },
});

export const getUserData = axios.create({
    baseURL:
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBxanQtiRccFtxFJZib3S3Qs_8DhcxRV_E",
    headers: {
        post: {
            "Content-Type": "application/json",
        },
    },
});

export const getNewIdToken = axios.create({
    baseURL:
        "https://securetoken.googleapis.com/v1/token?key=AIzaSyBxanQtiRccFtxFJZib3S3Qs_8DhcxRV_E",
    headers: {
        post: {
            "Content-Type": "application/json",
        },
    },
});

export default instance;
