import {
  Box,
  Button,
  FormLabel,
  SimpleGrid,
  Textarea,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import ChakraDatePicker from "components/datePicker/datePicker";
import InputField from "components/fields/InputField";
import AdminLayout from "layouts/admin";
import { useState } from "react";

export default function CreateProject() {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [projectGoal, setProjectGoal] = useState("");
  const [goalDate, setGoalDate] = useState(new Date());

  const toast = useToast();

  const handleProjectNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProjectName(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleProjectGoalChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProjectGoal(event.target.value);
  };

  const handleDateChange = (date: Date) => {
    setGoalDate(date);
  };

  const createProject = async () => {
    if (!projectName || !description || !projectGoal || !goalDate) return;
    const response = await fetch(`/api/create-project`, {
      method: "POST",
      body: JSON.stringify({
        name: projectName,
        description,
        goalDate,
        goal: projectGoal,
      }),
    });
    const result = await response.json();

    if (response.ok) {
      toast({
        title: "Projectが作成されました！",
        status: "success",
        isClosable: true,
      });
    } else {
      toast({
        title: "An error occurred.",
        description: result.error,
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <SimpleGrid
          mb="20px"
          columns={{ sm: 1 }}
          spacing={{ base: "20px", xl: "20px" }}
        >
          <Card>
            <InputField
              type="stirng"
              mb="20px"
              id="2"
              label="Project Name"
              placeholder="Astar Degents"
              onChange={handleProjectNameChange}
            />
            <FormLabel
              display="flex"
              ms="10px"
              fontSize="sm"
              color={textColorPrimary}
              fontWeight="bold"
              _hover={{ cursor: "pointer" }}
            >
              Project Description
            </FormLabel>
            <Textarea
              placeholder=""
              fontWeight="500"
              rounded="2xl"
              mb="20px"
              onChange={handleDescriptionChange}
            ></Textarea>
            <InputField
              type="stirng"
              mb="20px"
              id="2"
              label="Project Goal"
              placeholder="describe your goal in one sentence"
              onChange={handleProjectGoalChange}
            />
            <Box mb="30px">
              <FormLabel
                display="flex"
                ms="10px"
                fontSize="sm"
                color={textColorPrimary}
                fontWeight="bold"
                _hover={{ cursor: "pointer" }}
              >
                Goal Date
              </FormLabel>

              <ChakraDatePicker onChange={handleDateChange}></ChakraDatePicker>
            </Box>
            <Button variant="brand" onClick={createProject}>
              Create Project
            </Button>
          </Card>
        </SimpleGrid>
      </Box>
    </AdminLayout>
  );
}
