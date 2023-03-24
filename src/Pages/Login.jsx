import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { postLogin } from '../Redux/user/user.action';
import { CLEAR_MESSAGE } from '../Redux/user/user.type';

const initialState = {
    email: "",
    password: ""
}
export default function Login() {
    const [form, setForm] = useState(initialState);
    const dispatch = useDispatch();
    const { loading, error, isAuth, message } = useSelector((store) => store.user);
    // console.log('message:', message)
    // console.log('isAuth:', isAuth);

    useEffect(() => {
        if (message === "Wrong Credentials") {
            form.email = "";
            form.password = "";
            alert(message);
            dispatch({ type: CLEAR_MESSAGE });
        }
    }, [loading, error, isAuth, dispatch, form, message]);

    const handleChange = (e) => {
        const { value, name } = e.target;
        setForm({
            ...form, [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            alert("Please Fill All Details")
        } else {
            dispatch({ type: CLEAR_MESSAGE }) // CLEAR ERROR MESSAGE AND MESSAGE IN FROM REDUX
            dispatch(postLogin(form))
        }
        // console.log("email:", form.email, "password:", form.password)
    }

    const { email, password } = form;
    if (isAuth && message === "Login Successfully!") {
        alert(message)
        return <Navigate to="/" />
    } else
        return (
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
            >
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Login to your account</Heading>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input type="email"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input type="text"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <Stack spacing={10}>

                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    onClick={handleSubmit}
                                >
                                    Login
                                </Button>

                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        )
}