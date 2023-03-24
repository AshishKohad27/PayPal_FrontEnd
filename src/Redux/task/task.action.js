import axios from "axios";
import { CREATE_TASK, DELETE_TASK, ERROR_MESSAGE_TASK, GET_TASK, LOADING_MESSAGE_TASK, UPDATE_TASK, USER_INDIVIDUAL_TASK } from "./task.type";

export const getTask = (payload) => async (dispatch) => {
    try {
        dispatch({ type: LOADING_MESSAGE_TASK })
        const res = await axios.get(`https://chocolate-abalone-gear.cyclic.app/task/filter?sprintId=${payload}`);
        // console.log('res:', res.data.data)
        dispatch({ type: GET_TASK, payload: res.data });
    } catch (e) {
        dispatch({ type: ERROR_MESSAGE_TASK, payload: e.response.data });
        console.log("error from getTask:", e.response.data);
    }
}

export const createTask = (payload) => async (dispatch) => {
    console.log('payload:', payload)

    try {
        dispatch({ type: LOADING_MESSAGE_TASK })
        let result = await axios.post('https://chocolate-abalone-gear.cyclic.app/task/', payload.form);
        console.log('result:', result.data)

        const res = await axios.get(`https://chocolate-abalone-gear.cyclic.app/task/filter?sprintId=${payload.sprintId}`);

        console.log('res:', res.data.data)

        dispatch({ type: CREATE_TASK, payload: res.data });
    } catch (e) {
        dispatch({ type: ERROR_MESSAGE_TASK, payload: e.response.data });
        console.log("error from createTask:", e.response.data);
    }
}

export const deleteTask = (payload) => async (dispatch) => {
    try {
        dispatch({ type: LOADING_MESSAGE_TASK })
        await axios.delete(`https://chocolate-abalone-gear.cyclic.app/task/${payload.id}`);

        const res = await axios.get(`https://chocolate-abalone-gear.cyclic.app/task/filter?sprintId=${payload.sprintId}`);
        // console.log('res:', res.data.data)

        dispatch({ type: DELETE_TASK, payload: res.data });
    } catch (e) {
        dispatch({ type: ERROR_MESSAGE_TASK, payload: e.response.data });
        console.log("error from deleteTask:", e.response.data);
    }
}

export const updateTask = (payload) => async (dispatch) => {
    console.log('payload from redux update:', payload)
    try {
        dispatch({ type: LOADING_MESSAGE_TASK })
        await axios.patch(`https://chocolate-abalone-gear.cyclic.app/task/${payload.id}`, payload.form);

        const res = await axios.get(`https://chocolate-abalone-gear.cyclic.app/task/filter?sprintId=${payload.sprintId}`);
        // console.log('res:', res.data.data)

        dispatch({ type: UPDATE_TASK, payload: res.data });
    } catch (e) {
        dispatch({ type: ERROR_MESSAGE_TASK, payload: e.response.data });
        console.log("error from deleteTask:", e);
    }
}

export const userIndividualTask = (payload) => async (dispatch) => {

    try {
        dispatch({ type: LOADING_MESSAGE_TASK })
        let res = await axios.post(`https://chocolate-abalone-gear.cyclic.app/task/individual`, payload);
        console.log('res:', res)

        dispatch({ type: USER_INDIVIDUAL_TASK, payload: res.data });
    } catch (e) {
        dispatch({ type: ERROR_MESSAGE_TASK, payload: e.response.data });
        console.log("error from deleteTask:", e);
    }
}





