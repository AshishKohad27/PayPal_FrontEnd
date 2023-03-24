import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOGOUT } from "../../Redux/user/user.type";
import style from "./Navbar.module.css";

const links = [
    { path: "/", title: "Home" },
    { path: "/usertask", title: "Task" },
    { path: "/signup", title: "Signup" },
];

export default function Navbar() {
    const dispatch = useDispatch();
    const { isAuth } = useSelector((store) => store.user);

    const handleClick = () => {
        dispatch({ type: LOGOUT });
    };

    return (
        <>
            <Flex
                className={style.container}
                justifyContent="space-evenly"
                alignItems="center"
                bg="red.100"
                color="black"
                h="60px"
                boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
            >
                {links.map((item, index) => (
                    <Box key={index}>
                        <Link to={item.path}>
                            <Heading fontSize="22px">{item.title}</Heading>
                        </Link>
                    </Box>
                ))}
                <Box>
                    <Button onClick={handleClick}>
                        {isAuth ? "Logout" : <Link to="/login">Login</Link>}
                    </Button>
                </Box>
            </Flex>
        </>
    );
}
