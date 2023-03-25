import {
    CREATE_TASK,
    DELETE_TASK,
    ERROR_MESSAGE_TASK,
    GET_TASK,
    LOADING_MESSAGE_TASK,
    UPDATE_TASK,
    USER_INDIVIDUAL_TASK,
} from "./task.type";

const initialState = {
    todo: [],
    progress: [],
    done: [],
    individual: [],
    loading: false,
    error: false,
    errorMessage: "",
};

export const taskReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_TASK: {
            return {
                ...state,
                todo: payload.data.todo,
                progress: payload.data.progress,
                done: payload.data.done,
                loading: false,
                error: false
            };
        }
        case CREATE_TASK: {
            return {
                ...state,
                todo: payload.data.todo,
                progress: payload.data.progress,
                done: payload.data.done,
                loading: false,
                error: false
            };

        }

        case DELETE_TASK: {
            return {
                ...state,
                todo: payload.data.todo,
                progress: payload.data.progress,
                done: payload.data.done,
                loading: false,
                error: false
            };
        }

        case UPDATE_TASK: {
            return {
                ...state,
                todo: payload.data.todo,
                progress: payload.data.progress,
                done: payload.data.done,
                loading: false,
                error: false
            };
        }

        case ERROR_MESSAGE_TASK: {
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: payload.message,
            };
        }

        case LOADING_MESSAGE_TASK: {
            return {
                ...state,
                loading: true,
                error: false,
            };
        }

        case USER_INDIVIDUAL_TASK: {
            return {
                ...state,
                individual: payload.data,
                loading: false,
                error: false,
            };
        }

        default: {
            return state;
        }
    }
};
