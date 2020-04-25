import Cookies from "js-cookie";

export const setToken = (token) => {
    Cookies.set("token", token, { expires: 365 });
};

export const getToken = () => {
    return Cookies.get("token");
};

export const removeToken = () => {
    Cookies.remove("token");
};
