// components/TaskInput.js
import { useDispatch } from "react-redux";
import { Input, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { addTask } from "../features/todosSlice";

const TaskInput = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = () => {
    if (task.trim() !== "") {
      dispatch(addTask(task));
      setTask("");
    }
  };

  return (
    <Flex gap={2} w={{md:"400px", base:"90vw"}}>
      <Input
        border="1px solid #d4cfcf"
        variant="filled"
        placeholder="Enter task"
        value={task}
        onChange={handleChange}
        mr={2}
      />
      <Button colorScheme="blue" onClick={handleAddTask}>
        Add Task
      </Button>
    </Flex>
  );
};

export default TaskInput;
