import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    SimpleGrid,
    Spinner,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    createSprint,
    deleteSprint,
    getSprint,
} from "../Redux/sprint/sprint.action";
import { getDetailsFromToken } from "../Redux/user/user.action";
import { LOGOUT } from "../Redux/user/user.type";
import { MdDelete } from "react-icons/md";
import style from "../Css/Home.module.css";

const sprintPayload = {
    name: "",
    startDate: "",
    endDate: ""
};

const SendToken = {
    token: "",
};

export default function Home() {
    const [flag, setFlag] = useState(false);
    const [form, setForm] = useState(sprintPayload);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const { tokenDetails, isAuth, errorMessage } = useSelector(
        (store) => store.user
    );
    const { sprintList, loading } = useSelector((store) => store.sprint);
    console.log('loading:', loading)

    useEffect(() => {
        SendToken.token = axios.defaults.headers.common["authorization_access"];
        dispatch(getDetailsFromToken(SendToken));
    }, [isAuth, dispatch]);

    useEffect(() => {
        if (errorMessage === "Token Expired!") {
            dispatch({ type: LOGOUT });
        }
    }, [dispatch, errorMessage]);

    useEffect(() => {
        dispatch(getSprint());
    }, [dispatch, flag]);

    const handleChange = (e) => {
        const { value, name } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleClick = () => {
        if (!form.name || !form.startDate || !form.endDate) {
            alert("Please Fill All Details");
        } else {
            console.log("sprintList:", sprintList);
            setFlag(!flag);
            dispatch(createSprint(form));
            setForm(sprintPayload);
        }
    };
    const handleDelete = (id) => {
        dispatch(deleteSprint(id));
    };

    const { startDate, endDate, name } = form;
    return (
        <Box>
            <Flex
                maxW="1048px"
                bg="green.200"
                m="auto"
                px="100px"
                justifyContent="space-between"
                alignItems="center"
                borderRadius="10px"
                mt="20px"
            >
                <Box>
                    <Text fontSize="20px" fontWeight="500">
                        Name: {tokenDetails.name}
                    </Text>
                    <Text>Email: {tokenDetails.email}</Text>
                </Box>
                <Box>
                    <Button onClick={onOpen}>Add Sprint</Button>
                </Box>
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Sprint name</FormLabel>
                            <Input
                                type="text"
                                placeholder="Select Date of the Sprint and Title"
                                name="name"
                                value={name}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <Flex mt="10px" gap="10px">
                            <FormControl>
                                <FormLabel>Start Date</FormLabel>
                                <Input
                                    type="date"
                                    name="startDate"
                                    value={startDate}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>End Date</FormLabel>
                                <Input
                                    type="date"
                                    name="endDate"
                                    value={endDate}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={handleClick}>Add Sprint</Button>
                        <Button colorScheme="blue" onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {
                loading ? <Spinner /> : <SimpleGrid maxW="900px" m="auto" mt="50px" columns={2} spacing={10}>
                    {sprintList &&
                        sprintList.map((item, index) => (
                            <Flex
                                key={index}
                                bg="blue.200"
                                height="100px"
                                justifyContent="space-between"
                                alignItems="center"
                                p="25px"
                                className={style.BoxItem}
                            >
                                <Link to={`/${item.name + "__$$__" + item._id}`}>
                                    <Heading fontSize="26px" p="3px">
                                        {" "}
                                        {item.name}
                                    </Heading>
                                    <Text as="p" fontSize="16px" >Start: {item.startDate}</Text>
                                    <Text as="p" fontSize="16px">End: {item.endDate}</Text>
                                </Link>
                                <Box>
                                    <Button
                                        borderRadius="100px"
                                        onClick={() => handleDelete(item._id)}
                                        _hover={{
                                            bg: "red",
                                        }}
                                    >
                                        <MdDelete />
                                    </Button>
                                </Box>
                            </Flex>
                        ))}
                </SimpleGrid>
            }

        </Box>
    );
}
