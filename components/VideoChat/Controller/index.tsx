import { Box, Container, Stack } from "@chakra-ui/react";
import { AudioInputController } from "./AudioInputController";
import { AudioOutputController } from "./AudioOutputController";
import { LeaveButton } from "./LeaveButton";
import { MicButton } from "./MicButton";
import { ScreenShareController } from "./ScreenShareController";
import { VideoButton } from "./VideoButton";
import { VideoController } from "./VideoController";

export const Controller: React.FC = () => {
  return (
    <Box bg="gray.300" minH="40vh">
      <Container textAlign="center" mt="8" pt="8">
        <Stack direction="row" width="full" textAlign="center">
          <MicButton />
          <LeaveButton />
          <VideoButton />
          <ScreenShareController />
        </Stack>
      </Container>
      <Container textAlign="center" mt="8">
        <Stack direction="row" width="full" textAlign="center">
          <AudioInputController />
          <AudioOutputController />
          <VideoController />
        </Stack>
      </Container>
    </Box>
  );
};
