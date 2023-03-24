import { Button } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../Redux/task/task.action";

export default function DeleteTask({ item, sprintId }) {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteTask({ id: item._id, sprintId }))
    }
    return (
        <>
            <Button onClick={() => handleDelete()}>
                <MdDelete fontSize="18px" />
            </Button></>
    )
}