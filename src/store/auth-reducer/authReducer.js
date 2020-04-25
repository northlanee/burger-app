import { signUpAPI, signInAPI, getNewIdToken, getUserData } from "../../api";
import { getToken, removeToken, setToken } from "../../helpers/cookies";

const prefix = "@auth/";

const SET_LOADING = prefix + "SET_LOADING";
const SET_USER_DATA = prefix + "SET_USER_DATA";
const SET_ERROR = prefix + "SET_ERROR";
const LOG_OUT = prefix + "LOG_OUT";
const SET_INIT_LOADING = prefix + "SET_INIT_LOADING";
const SET_ID_TOKEN = prefix + "SET_ID_TOKEN";

const initialState = {
    token: null,
    userId: null,
    email: null,
    error: null,
    loading: false,
    initLoading: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, loading: action.payload };
        case SET_USER_DATA:
            return {
                ...state,
                token: action.token,
                userId: action.id,
                email: action.email,
            };
        case SET_ERROR:
            return { ...state, error: action.error };
        case LOG_OUT:
            return { ...state, token: null, userId: null, email: null };
        case SET_INIT_LOADING:
            return { ...state, initLoading: action.payload };
        case SET_ID_TOKEN:
            return { ...state, token: action.payload };
        default:
            return state;
    }
};

export default authReducer;

const setLoading = (payload) => ({ type: SET_LOADING, payload });
const setInitLoading = (payload) => ({ type: SET_INIT_LOADING, payload });
const setIdToken = (payload) => ({ type: SET_ID_TOKEN, payload });
const setUserData = (id, token, email) => ({
    type: SET_USER_DATA,
    id,
    token,
    email,
});
const setError = (error) => ({ type: SET_ERROR, error });
export const logOut = () => {
    removeToken();
    return { type: LOG_OUT };
};

const setAuthTimeout = (expiresIn) => (dispatch) => {
    setTimeout(() => {
        dispatch(refreshToken(getToken()));
    }, (expiresIn * 1000) / 2);
};

const auth = (api, values) => (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    api.post("", {
        email: values.email,
        password: values.password,
        returnSecureToken: true,
    })
        .then((res) => {
            dispatch(
                setUserData(res.data.localId, res.data.idToken, res.data.email)
            );
            dispatch(setAuthTimeout(res.data.expiresIn));
            dispatch(setLoading(false));
            setToken(res.data.refreshToken);
        })
        .catch((err) => {
            dispatch(
                setError(
                    err.response.data.error.message
                        .split("_")
                        .join(" ")
                        .toLowerCase()
                )
            );
            dispatch(setLoading(false));
        });
};

const refreshToken = (token) => (dispatch) => {
    return getNewIdToken
        .post("", {
            grant_type: "refresh_token",
            refresh_token: token,
        })
        .then((res) => {
            dispatch(setIdToken(res.data.id_token));
            return res.data.id_token;
        });
};

const fetchUserData = (token) => (dispatch) => {
    return getUserData
        .post("", {
            idToken: token,
        })
        .then((res) => {
            dispatch(
                setUserData(
                    res.data.users[0].localId,
                    token,
                    res.data.users[0].email
                )
            );
        });
};

export const initialLogIn = () => (dispatch) => {
    const token = getToken();
    if (token) {
        dispatch(setInitLoading(true));
        dispatch(refreshToken(token)).then((idToken) =>
            dispatch(fetchUserData(idToken)).then(() => {
                dispatch(setInitLoading(false));
            })
        );
    }
};

export const signUp = (values) => (dispatch) => {
    dispatch(auth(signUpAPI, values));
};

export const signIn = (values) => (dispatch) => {
    dispatch(auth(signInAPI, values));
};
