import {
  CREATE_SPRINT,
  DELETE_SPRINT,
  ERROR_MESSAGE_SPRINT_TASK,
  GET_SPRINT,
  LOADING_MESSAGE_SPRINT_TASK,
} from "./task.type";

const initialState = {
  loading: false,
  error: false,
  errorMessage: "",
  sprintList: [],
};

export const taskReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING_MESSAGE_SPRINT_TASK: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case ERROR_MESSAGE_SPRINT_TASK: {
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: payload.message,
      };
    }
    case CREATE_SPRINT: {
      return {
        ...state,
        sprintList: payload.data,
        loading: false,
        error: false,
      };
    }

    case GET_SPRINT: {
      return {
        ...state,
        sprintList: payload.data,
        loading: false,
        error: false,
      };
    }

    case DELETE_SPRINT: {
      return {
        ...state,
        sprintList: payload.data,
        loading: false,
        error: false,
      };
    }

    default: {
      return state;
    }
  }
};
