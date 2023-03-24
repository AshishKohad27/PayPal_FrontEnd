import { Box, Flex, Heading, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import AddTask from '../Components/Task/AddTask';
import { FaCircle } from "react-icons/fa";
import style from "../Css/Tasks.module.css"
import { useParams } from 'react-router-dom';

function Tasks() {

    const { id } = useParams();

    let [sprintName, sprintId] = id.split("__$$__")


    return (
        <Box>
            <Flex maxW="1048px" m="auto" mt="20px" bg="yellow.200" p="10px" pl="100px"
                borderRadius="10px"
            ><Heading>Sprint Name: {sprintName}</Heading></Flex>
            <Box mt="50px">
                <AddTask sprintId={sprintId} />
            </Box>
            <SimpleGrid maxW="1348px" m="auto" mt="50px" columns={{ sm: 2, md: 3 }} spacing='20px'>
                <Box border="1px solid red" height='500px'>
                    <Flex className={style.TasksItem} >
                        {/* Todo */}
                        <FaCircle color="green" />
                        <Heading>Todo </Heading>
                    </Flex>
                </Box>
                <Box bg='tomato' height='80px'>
                    <Box>

                        <Flex className={style.TasksItem} >
                            {/* Todo */}
                            <FaCircle color="yellow" />
                            <Heading>In Progress </Heading>
                        </Flex>

                    </Box>
                </Box>
                <Box bg='tomato' height='80px'>
                    <Box>
                        <Flex className={style.TasksItem} >
                            {/* Todo */}
                            <FaCircle color="purple" />
                            <Heading>Done </Heading>
                        </Flex>
                    </Box>

                </Box>
            </SimpleGrid>
        </Box>
    )
}

export default Tasks
