import axios from "axios";
import { CREATE_SPRINT, DELETE_SPRINT, ERROR_MESSAGE_SPRINT_TASK, GET_SPRINT, LOADING_MESSAGE_SPRINT_TASK } from "./sprint.type";

export const getSprint = () => async (dispatch) => {
    try {
        dispatch({ type: LOADING_MESSAGE_SPRINT_TASK })
        const res = await axios.get('https://chocolate-abalone-gear.cyclic.app/sprint/');
        dispatch({ type: GET_SPRINT, payload: res.data });
    } catch (e) {
        dispatch({ type: ERROR_MESSAGE_SPRINT_TASK, payload: e.response.data });
        console.log("error from getSprint:", e.response.data);
    }
}

export const createSprint = (payload) => async (dispatch) => {
    try {
        dispatch({ type: LOADING_MESSAGE_SPRINT_TASK })
        const res = await axios.post('https://chocolate-abalone-gear.cyclic.app/sprint/', payload);
        dispatch({ type: CREATE_SPRINT, payload: res.data });
    } catch (e) {
        dispatch({ type: ERROR_MESSAGE_SPRINT_TASK, payload: e.response.data });
        console.log("error from createSprint:", e.response.data);
    }
}

export const deleteSprint = (payload) => async (dispatch) => {
    try {
        dispatch({ type: LOADING_MESSAGE_SPRINT_TASK })
        const res = await axios.delete(`https://chocolate-abalone-gear.cyclic.app/sprint/${payload}`);
        dispatch({ type: DELETE_SPRINT, payload: res.data });
    } catch (e) {
        dispatch({ type: ERROR_MESSAGE_SPRINT_TASK, payload: e.response.data });
        console.log("error from createSprint:", e.response.data);
    }
}