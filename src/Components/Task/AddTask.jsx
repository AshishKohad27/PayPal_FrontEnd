import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Input,
    FormLabel,
    FormControl,
    Stack,
    Box,
    Select,
    Text,
    Flex,
    Textarea,
    SimpleGrid,
} from "@chakra-ui/react";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createTask, getTask } from "../../Redux/task/task.action";
import { getAllUsers, getDetailsFromToken } from "../../Redux/user/user.action";

const todoPayload = {
    title: "",
    description: "",
    assignedBy: "",
    assignedTo: "",
    status: "",
    sprintId: "",
    sprintName: ""
};

const SendToken = {
    token: "",
};

function AddTask() {

    const { id } = useParams();
    let [sprintName, sprintId] = id.split("__$$__");
    console.log('sprintId from AddTask:', sprintId);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const { tokenDetails, allUsers } = useSelector((store) => store.user);

    const [form, setForm] = useState(todoPayload);

    useEffect(() => {
        dispatch(getAllUsers());
        SendToken.token = axios.defaults.headers.common["authorization_access"];
        dispatch(getDetailsFromToken(SendToken));
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        setForm({ ...form, sprintId, sprintName })
        console.log('form:', form)

        if (
            !form.title ||
            !form.description ||
            !form.assignedBy ||
            !form.assignedTo ||
            !form.status ||
            !form.sprintId ||
            !form.sprintName
        ) {
            alert("Please Fill All Details");
        } else {
            const payload = {
                sprintId,
                form
            }
            dispatch(createTask(payload))

            setForm(todoPayload)
        }
    };

    const { title, description } = form;

    return (
        <>
            <SimpleGrid
                columns={{ base: 1, sm: 1, md: 2 }}
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
                    <Button onClick={onOpen}>Add Task</Button>
                </Box>
            </SimpleGrid>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Add Task by {tokenDetails && tokenDetails.name}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={1} mx={"auto"} maxW={"lg"} py={0} px={0}>
                            <Box rounded={"lg"} boxShadow={"lg"} p={8}>
                                <Stack spacing={4}>
                                    <FormControl>
                                        <FormLabel>Title</FormLabel>
                                        <Input
                                            type="text"
                                            name="title"
                                            value={title}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Description</FormLabel>

                                        <Textarea
                                            placeholder="Details Task"
                                            type="text"
                                            name="description"
                                            value={description}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Status</FormLabel>
                                        <Select
                                            placeholder="Select Status"
                                            name="status"
                                            onChange={handleChange}
                                        >
                                            <option value="todo">Todo</option>
                                            <option value="progress">In Progress</option>
                                            <option value="done">Done</option>
                                        </Select>
                                    </FormControl>

                                    <Flex gap="10px">
                                        <FormControl>
                                            <FormLabel>Assigned By</FormLabel>
                                            <Select
                                                placeholder="Assigned By"
                                                name="assignedBy"
                                                onChange={handleChange}
                                            >
                                                <option value={tokenDetails && tokenDetails.name}>
                                                    {tokenDetails && tokenDetails.name}
                                                </option>
                                            </Select>
                                        </FormControl>

                                        <FormControl>
                                            <FormLabel>Assigned To</FormLabel>
                                            <Select
                                                placeholder="Assigned To"
                                                name="assignedTo"
                                                onChange={handleChange}
                                            >
                                                {allUsers &&
                                                    allUsers.map((item, index) => (
                                                        <option key={index}>{item.name}</option>
                                                    ))}
                                            </Select>
                                        </FormControl>
                                    </Flex>
                                </Stack>
                            </Box>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={() => {
                                handleSubmit();
                            }}
                        >
                            Add Task
                        </Button>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={() => {
                                onClose();
                            }}
                        >
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default AddTask;
