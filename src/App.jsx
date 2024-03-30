import { Center, Flex, Heading, Stack } from "@chakra-ui/react";
import { GoTasklist } from "react-icons/go";
import TaskInput from "./components/AddTask";
import TaskList from "./components/TaskList";

function App() {
  return (
    <Center h="100vh">
      <Stack
        maxW={{md:"470px", base:"98vw"}}
        mx="auto"
        borderRadius="10"
        border="1px solid #d4cfcf"
        p={{md:"6", base:"2"}}
      >
        <Flex gap={4} mx="auto" mb={8}>
          <GoTasklist size={40} />
          <Heading color="gray.700">To-Do Application</Heading>
        </Flex>
        <TaskInput />
        <Stack maxH="50vh" overflowY="auto" my={4}>
          <TaskList />
        </Stack>
      </Stack>
    </Center>
  );
}

export default App;
