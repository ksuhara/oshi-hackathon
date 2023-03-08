import { useHMSActions } from "@100mslive/react-sdk";
import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";

export const JoinForm: React.FC = () => {
  const hmsActions = useHMSActions();
  const [userName, setUserName] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    hmsActions.join({
      userName,
      authToken: process.env.NEXT_PUBLIC_STAGE_TOKEN || "",
    });
  };
  return (
    <Box bgColor="gray.900" height="100vh">
      <Container>
        <Stack>
          <Heading mx="auto" mt="16" color="white">
            Join Room
          </Heading>

          <form onSubmit={handleSubmit}>
            <div>
              <FormLabel textColor="white">User Name</FormLabel>
              <Input
                type="text"
                id="user_name"
                name="name"
                required
                value={userName}
                onChange={handleChange}
              />
            </div>
            <Box width="full" textAlign="center">
              <Button type="submit" mt="4">
                Join
              </Button>
            </Box>
          </form>
        </Stack>
      </Container>
    </Box>
  );
};
