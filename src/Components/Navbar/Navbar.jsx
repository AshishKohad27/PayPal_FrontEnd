import { Box, Button, Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOGOUT } from "../../Redux/user/user.type";
import style from "./Navbar.module.css";


const links = [
    { path: "/", title: "Home" },
    { path: "/task", title: "Task" },
    { path: "/signup", title: "Signup" },
];

export default function Navbar() {
    const dispatch = useDispatch();
    const { isAuth } = useSelector((store) => store.user);

    const handleClick = () => {
        dispatch({ type: LOGOUT });
    };

    return (
        <Flex
            className={style.container}
            justifyContent="space-evenly"
            alignItems="center"
            bg="red.300"
            color="black"
            h="60px"
        >
            {links.map((item, index) => (
                <Box key={index}>
                    <Link to={item.path}>{item.title}</Link>
                </Box>
            ))}
            <Box>
                <Button onClick={handleClick}>
                    {isAuth ? "Logout" : <Link to="/login">Login</Link>}
                </Button>
            </Box>
        </Flex>
    );
}
