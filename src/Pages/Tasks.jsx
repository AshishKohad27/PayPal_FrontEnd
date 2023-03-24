import {
    Box,
    Button,
    Flex,
    Heading,
    SimpleGrid,
    Stack,
    Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import AddTask from "../Components/Task/AddTask";
import { FaCircle } from "react-icons/fa";
import style from "../Css/Tasks.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, getTask } from "../Redux/task/task.action";
import EditTask from "../Components/Task/EditTask";
import { MdDelete } from "react-icons/md";

function Tasks() {
    const dispatch = useDispatch();
    const { id } = useParams();
    let [sprintName, sprintId] = id.split("__$$__");
    const { todo, progress, done } = useSelector((store) => store.task);

    useEffect(() => {
        dispatch(getTask(sprintId));
    }, [dispatch, sprintId]);

    const handleDelete = (item) => {
        // console.log('item:', item)
        dispatch(deleteTask({ id: item._id, sprintId }))
    }

    return (
        <Box mb="50px">
            <Flex
                maxW="1048px"
                m="auto"
                mt="20px"
                bg="yellow.200"
                p="10px"
                borderRadius="10px"

            >
                <Heading>Sprint Name: {sprintName}</Heading>
            </Flex>
            <Box mt="50px">
                <AddTask sprintId={sprintId} />
            </Box>

            <SimpleGrid
                maxW="1348px"
                m="auto"
                mt="50px"
                columns={{ sm: 2, md: 3 }}
                spacing="20px"
            >
                {/* Todo */}
                <Box borderRadius="10px" height="auto" bg="green.100"
                    borderBottom="5px solid green"
                >
                    <Flex className={style.TasksItem} mt="10px">
                        {/* Todo */}
                        <FaCircle color="green" />
                        <Heading>Todo </Heading>
                    </Flex>
                    <Box m="15px">
                        {todo &&
                            todo.map((item, index) => (
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    key={index}
                                    borderRadius="10px"
                                    mt="10px"
                                    bg="green.400"
                                    p="10px"
                                    borderBottom="5px solid green"
                                    boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
                                >
                                    <Box >
                                        <Box textAlign="left">
                                            <Text
                                                fontWeight="600"
                                                fontFamily="sans-serif"
                                                fontSize="23px"
                                            >
                                                Title: {item.title}
                                            </Text>
                                            <Text
                                                fontWeight="500"
                                                fontFamily="sans-serif"
                                                fontSize="18px"
                                            >
                                                Description: {item.description}
                                            </Text>
                                            <Text>AssignedBy: {item.assignedBy}</Text>
                                            <Text>AssignedTo: {item.assignedTo}</Text>
                                        </Box>
                                    </Box>
                                    <Box >
                                        <Stack
                                            gap="10px"
                                            m="auto"
                                            mt="10px"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Button onClick={() => handleDelete(item)}>
                                                <MdDelete fontSize="18px" />
                                            </Button>
                                            <EditTask item={item} />
                                        </Stack>
                                    </Box>

                                </Box>
                            ))}
                    </Box>
                </Box>
                {/* Todo */}

                {/* Progress */}
                <Box borderRadius="10px" height="auto" bg="yellow.100"
                    borderBottom="5px solid yellow"
                >
                    <Flex className={style.TasksItem} mt="10px">
                        {/* Todo */}
                        <FaCircle color="yellow" />
                        <Heading>In Progress </Heading>
                    </Flex>
                    <Box m="15px">
                        {progress &&
                            progress.map((item, index) => (
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    key={index}
                                    borderRadius="10px"
                                    mt="10px"
                                    bg="yellow.400"
                                    p="10px"
                                    borderBottom="5px solid yellow"
                                    boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
                                >
                                    <Box >
                                        <Box textAlign="left">
                                            <Text
                                                fontWeight="600"
                                                fontFamily="sans-serif"
                                                fontSize="23px"
                                            >
                                                Title: {item.title}
                                            </Text>
                                            <Text
                                                fontWeight="500"
                                                fontFamily="sans-serif"
                                                fontSize="18px"
                                            >
                                                Description: {item.description}
                                            </Text>
                                            <Text>AssignedBy: {item.assignedBy}</Text>
                                            <Text>AssignedTo: {item.assignedTo}</Text>
                                        </Box>
                                    </Box>
                                    <Box >
                                        <Stack
                                            gap="10px"
                                            m="auto"
                                            mt="10px"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Button onClick={() => handleDelete(item)}>
                                                <MdDelete fontSize="18px" />
                                            </Button>

                                            <EditTask item={item} />
                                        </Stack>
                                    </Box>

                                </Box>
                            ))}
                    </Box>
                </Box>
                {/* Progress */}

                {/* Done */}
                <Box borderRadius="10px" height="auto" bg="purple.100"
                    borderBottom="5px solid purple"
                >
                    <Flex className={style.TasksItem} mt="10px">
                        <FaCircle color="purple" />
                        <Heading>Done </Heading>
                    </Flex>
                    <Box m="15px">
                        {done &&
                            done.map((item, index) => (
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    key={index}
                                    borderRadius="10px"
                                    mt="10px"
                                    bg="purple.400"
                                    p="10px"
                                    borderBottom="5px solid purple"
                                    boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
                                >
                                    <Box >
                                        <Box textAlign="left">
                                            <Text
                                                fontWeight="600"
                                                fontFamily="sans-serif"
                                                fontSize="23px"
                                            >
                                                Title: {item.title}
                                            </Text>
                                            <Text
                                                fontWeight="500"
                                                fontFamily="sans-serif"
                                                fontSize="18px"
                                            >
                                                Description: {item.description}
                                            </Text>
                                            <Text>AssignedBy: {item.assignedBy}</Text>
                                            <Text>AssignedTo: {item.assignedTo}</Text>
                                        </Box>
                                    </Box>
                                    <Box >
                                        <Stack
                                            gap="10px"
                                            m="auto"
                                            mt="10px"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Button onClick={() => handleDelete(item)}>
                                                <MdDelete fontSize="18px" />
                                            </Button>

                                            <EditTask item={item} />
                                        </Stack>
                                    </Box>

                                </Box>
                            ))}
                    </Box>
                </Box>
                {/* Done */}
            </SimpleGrid>
        </Box>
    );
}

export default Tasks;
