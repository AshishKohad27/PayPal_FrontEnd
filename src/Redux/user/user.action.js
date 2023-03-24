import axios from "axios";
import {
    ERROR_MESSAGE,
    GET_ALL_USERS,
    GET_DETAILS_FROM_TOKEN,
    LOGIN_ERROR,
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    SIGNUP_ERROR,
    SIGNUP_LOADING,
    SIGNUP_SUCCESS,
} from "./user.type";

// Signup
export const postSign = (payload) => async (dispatch) => {
    dispatch({ type: SIGNUP_LOADING });
    try {
        let res = await axios.post(
            `http://localhost:7878/auth/signup`,
            payload
        );
        console.log("res:", res.data);
        dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
    } catch (e) {
        dispatch({ type: SIGNUP_ERROR });
    }
};

//Login
export const postLogin = (payload) => async (dispatch) => {
    dispatch({ type: LOGIN_LOADING });
    try {
        let res = await axios.post(
            `http://localhost:7878/auth/login`,
            payload
        );
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    } catch (e) {
        console.log("e:", e.response.data.messages);
        dispatch({ type: LOGIN_ERROR });
    }
};

//Verify token and get result
export const getDetailsFromToken = (payload) => async (dispatch) => {
    try {
        let res = await axios.post(
            `http://localhost:7878/auth/verify`,
            payload
        );
        dispatch({ type: GET_DETAILS_FROM_TOKEN, payload: res.data });
    } catch (e) {
        dispatch({ type: ERROR_MESSAGE, payload: e.response.data });
        console.log("error from postVerify:", e.response.data);
    }
};

//Get all user 
export const getAllUsers = () => async (dispatch) => {
    try {
        let res = await axios.get(
            `http://localhost:7878/auth`
        );
        // console.log('res getAllUsers:', res)
        dispatch({ type: GET_ALL_USERS, payload: res.data });
    } catch (e) {
        dispatch({ type: ERROR_MESSAGE, payload: e.response.data });
        console.log("error from postVerify:", e.response.data);
    }
};
