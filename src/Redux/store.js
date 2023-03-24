import {
    legacy_createStore,
    applyMiddleware,
    combineReducers,
    compose,
} from "redux";
import thunk from "redux-thunk";
import { sprintReducer } from "./sprint/sprint.reducer";
import { taskReducer } from "./task/task.reducer";
import { userReducer } from "./user/user.reducer";

const rootReducer = combineReducers({
    user: userReducer,
    sprint: sprintReducer,
    task: taskReducer
});
const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = legacy_createStore(
    rootReducer,
    createComposer(applyMiddleware(thunk))
);
