import {
  Box,
  Button,
  FormLabel,
  SimpleGrid,
  Textarea,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import {
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import Card from "components/card/Card";
import ChakraDatePicker from "components/datePicker/datePicker";
import InputField from "components/fields/InputField";
import { ethers } from "ethers";
import AdminLayout from "layouts/admin";
import { PaddockContractAddress } from "lib/constant";
import { useState } from "react";

export default function CreateProject() {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [projectGoal, setProjectGoal] = useState("");
  const [sponsorBudget, setSponsorBudget] = useState("0");
  const [goalDate, setGoalDate] = useState(new Date());
  const [isTxLoading, setIsTxLoading] = useState(false);

  const toast = useToast();
  const { contract } = useContract(PaddockContractAddress);
  const { data: projectCounter } = useContractRead(contract, "projectCounter");

  const { mutateAsync: createProject } = useContractWrite(
    contract,
    "createProject"
  );

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

  const handleSponsorBudgetChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSponsorBudget(event.target.value);
  };

  const handleCreateProject = async () => {
    if (
      !projectName ||
      !description ||
      !projectGoal ||
      !goalDate ||
      !projectCounter
    )
      return;
    setIsTxLoading(true);
    const nextNumber = projectCounter.toNumber() + 1;
    try {
      const data = await createProject([
        ethers.utils.parseEther(sponsorBudget),
      ]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
      setIsTxLoading(false);
      return;
    }
    const response = await fetch(`/api/create-project`, {
      method: "POST",
      body: JSON.stringify({
        name: projectName,
        description,
        goalDate,
        goal: projectGoal,
        projectCounter: nextNumber,
      }),
    });
    const result = await response.json();
    setIsTxLoading(false);
    if (response.ok) {
      toast({
        title: "Project Created!",
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
            <InputField
              type="number"
              mb="20px"
              id="2"
              label="Sponsor Budget (USDC)"
              placeholder="$100"
              onChange={handleSponsorBudgetChange}
            />
            <Button
              variant="brand"
              onClick={handleCreateProject}
              isLoading={isTxLoading}
            >
              Create Project
            </Button>
          </Card>
        </SimpleGrid>
      </Box>
    </AdminLayout>
  );
}
