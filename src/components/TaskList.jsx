// components/TaskList.js
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Text,
  Button,
  Flex,
  Checkbox,
  HStack,
  Input,
} from "@chakra-ui/react";
import {
  deleteTask,
  toggleTaskCompletion,
  updateTask,
} from "../features/todosSlice";
import { IoMdTrash } from "react-icons/io";
import { AiFillSound } from "react-icons/ai";
import { toast } from "react-toastify";
import { useState } from "react";

const TaskList = () => {
  const tasks = useSelector((state) => state.todo.tasks);
  const dispatch = useDispatch();
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
    toast.success("Task Deleted Successfully");
  };

  const handleToggleTaskCompletion = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      dispatch(toggleTaskCompletion(id));
      if (!task.completed) {
        toast.success("Task completed Successfully");
      }
    }
  };

  const handleEditTask = (id) => {
    setEditingTaskId(id);
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setEditedTaskText(task.text);
    }
  };

  const handleUpdateTask = (id) => {
    dispatch(updateTask({ id, text: editedTaskText }));
    setEditingTaskId(null);
    setEditedTaskText("");
    toast.success("Task Updated");
  };

  const handleSpeak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-IN"; // Set language to Indian English
    speech.rate = 1; // Set speech rate (1 is the default rate)
    window.speechSynthesis.speak(speech);
  };

  // Sort tasks in descending order
  const sortedTasks = [...tasks].sort((a, b) => b.id - a.id);

  return (
    <Box mt={4}>
      {sortedTasks.map((task) => (
        <Flex
          key={task.id}
          align="center"
          justify="space-between"
          mb={2}
          borderRadius="10"
          border="1px solid #d4cfcf"
          bg="gray.50"
          p={2}
          gap={4}
          w={{md:"400px", base:"90vw"}}
        >
          {editingTaskId === task.id ? (
            <Flex w="100%">
              <Input
                value={editedTaskText}
                onChange={(e) => setEditedTaskText(e.target.value)}
                mr={2}
              />
              <Button
                colorScheme="blue"
                size="sm"
                onClick={() => handleUpdateTask(task.id)}
              >
                Save
              </Button>
            </Flex>
          ) : (
            <>
              <Checkbox
                isChecked={task.completed}
                onChange={() => handleToggleTaskCompletion(task.id)}
                mr={2}
                size="lg"
                boxShadow="lg"
              />
              <Text
                textDecoration={task.completed ? "line-through" : "none"}
                maxW={{md:"350px", base:"300px"}}
                noOfLines={2}
              >
                {task.text}
              </Text>
              <HStack>
                <Button
                  colorScheme="green"
                  size="sm"
                  onClick={() => handleEditTask(task.id)}
                >
                  Edit
                </Button>

                <IoMdTrash
                  onClick={() => handleDeleteTask(task.id)}
                  cursor="pointer"
                  color="#C53030"
                  fontSize="30px"
                />
                <AiFillSound
                  onClick={() => handleSpeak(task.text)}
                  cursor="pointer"
                  color="orange"
                  fontSize="30px"
                />
              </HStack>
            </>
          )}
        </Flex>
      ))}
    </Box>
  );
};

export default TaskList;
