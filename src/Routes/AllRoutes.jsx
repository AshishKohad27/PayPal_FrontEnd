import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Tasks from "../Pages/Tasks";
import PrivateRoute from "./PrivateRoute";


export default function AllRoutes() {
    return (
        <Routes>
            {/* <Route
                path="/about"
                element={
                    <PrivateRoute>
                        <About />
                    </PrivateRoute>
                }
            /> */}
            <Route
                path="/task"
                element={
                    <PrivateRoute>
                        <Tasks />
                    </PrivateRoute>
                }
            />
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/:id" element={<Tasks />} />
        </Routes>
    );
}
