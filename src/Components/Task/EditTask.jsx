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
    Stack,
    Box,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
    Flex,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { GrEdit } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateTask } from '../../Redux/task/task.action';
import { getAllUsers } from '../../Redux/user/user.action';



export default function EditTask({ item }) {
    const { id } = useParams();
    let [sprintName, sprintId] = id.split("__$$__");
    console.log('sprintId from AddTask:', sprintId);


    const { isOpen, onOpen, onClose } = useDisclosure()
    const [form, setForm] = useState({
        title: item.title,
        description: item.description,
        assignedBy: item.assignedBy,
        assignedTo: item.assignedTo,
        status: item.status,
        sprintId
    })
    const dispatch = useDispatch();
    const { tokenDetails, allUsers } = useSelector((store) => store.user);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        if (
            !form.title ||
            !form.description ||
            !form.assignedBy ||
            !form.assignedTo ||
            !form.status ||
            !form.sprintId
        ) {
            alert("Please Fill All Details");
        } else {
            const payload = {
                id: item._id,
                sprintId,
                form
            }
            dispatch(updateTask(payload))
            console.log("form EDIT:", form)
        }
    };

    const { title, description } = form;

    return (
        <>
            <Button onClick={onOpen}>  <GrEdit fontSize="18px" /></Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{item.title}</ModalHeader>
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
                                            value={form.status}
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
                                                value={form.assignedBy}
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
                                                value={form.assignedTo}
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
                            Edit Task
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
    )
}