import { signUpAPI, signInAPI } from "../../api";

const prefix = "@auth/";

const SET_LOADING = prefix + "SET_LOADING";
const SET_USER_DATA = prefix + "SET_USER_DATA";
const SET_ERROR = prefix + "SET_ERROR";
const LOG_OUT = prefix + "LOG_OUT";

const initialState = {
    token: null,
    userId: null,
    email: null,
    error: null,
    loading: false,
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
        default:
            return state;
    }
};

export default authReducer;

const setLoading = (payload) => ({ type: SET_LOADING, payload });
const setUserData = (id, token, email) => ({
    type: SET_USER_DATA,
    id,
    token,
    email,
});
const setError = (error) => ({ type: SET_ERROR, error });
export const logOut = () => ({ type: LOG_OUT });

const setAuthTimeout = (expiresIn) => (dispatch) => {
    setTimeout(() => {
        dispatch(logOut());
    }, expiresIn * 1000);
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

export const signUp = (values) => (dispatch) => {
    dispatch(auth(signUpAPI, values));
};

export const signIn = (values) => (dispatch) => {
    dispatch(auth(signInAPI, values));
};
