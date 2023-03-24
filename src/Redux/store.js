import {
    legacy_createStore,
    applyMiddleware,
    combineReducers,
    compose,
} from "redux";
import thunk from "redux-thunk";
import { taskReducer } from "./task/task.reducer";
import { userReducer } from "./user/user.reducer";

const rootReducer = combineReducers({
    user: userReducer,
    task:taskReducer
});
const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = legacy_createStore(
    rootReducer,
    createComposer(applyMiddleware(thunk))
);
