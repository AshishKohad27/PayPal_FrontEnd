import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Tasks from "../Pages/Tasks";
import UserTask from "../Pages/UserTask";
import PrivateRoute from "./PrivateRoute";


export default function AllRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                }
            />
            <Route
                path="/usertask"
                element={
                    <PrivateRoute>
                        <UserTask />
                    </PrivateRoute>
                }
            />
        

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/:id" element={<Tasks />} />
        </Routes>
    );
}
