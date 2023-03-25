import { Box, Heading, SimpleGrid, Spinner, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userIndividualTask } from "../Redux/task/task.action";
import { getDetailsFromToken } from "../Redux/user/user.action";

const SendToken = {
    token: "",
};


export default function UserTask() {

    const dispatch = useDispatch();
    const { tokenDetails, isAuth } = useSelector(
        (store) => store.user
    );

    const { individual, loading } = useSelector((store) => store.task);
    console.log('individual:', individual)

    useEffect(() => {
        SendToken.token = axios.defaults.headers.common["authorization_access"];
        dispatch(getDetailsFromToken(SendToken));
    }, [isAuth, dispatch]);

    useEffect(() => {
        const payload = {
            "userName": tokenDetails && tokenDetails.name
        }
        dispatch(userIndividualTask(payload))
    }, [dispatch, tokenDetails])


    return (
        <>
            <Heading maxW="1348px" m="auto" mt="10px" bg="green.300" borderRadius="10px">All Task Assigned to {tokenDetails && tokenDetails.name}</Heading>
            {loading ? <Box bg="" mt={{ base: "50px", md: "100px" }}>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </Box> : <SimpleGrid maxW="900px" m="auto" mt="50px" columns={2} spacing={10}>
                {individual &&
                    individual.map((item, index) => (
                        <Stack
                            key={index}
                            bg="blue.200"
                            height="auto"
                            justifyContent="space-between"
                            alignItems="center"
                            p="25px"
                            borderRadius="10px"
                            borderBottom="5px solid blue"

                        >

                            <Heading fontSize="26px" p="3px">
                                {" "}
                                {item.title}
                            </Heading>
                            <Text as="p" fontSize="16px" >Desc: {item.description}</Text>
                            <Text as="p" fontSize="16px" >AssignedBy: {item.assignedBy}</Text>
                            <Text as="p" fontSize="16px">AssignedTo: {item.assignedTo}</Text>
                            <Text>Sprint: {item.sprintName}</Text>

                        </Stack>
                    ))}
            </SimpleGrid>
            }
        </>
    )
}