import { Box, Container, Stack } from "@chakra-ui/react";
import { AudioController } from "./AudioController";
import { LeaveButton } from "./LeaveButton";
import { MicButton } from "./MicButton";
import { ScreenShareController } from "./ScreenShareController";
import { VideoButton } from "./VideoButton";
import { VideoController } from "./VideoController";

export const Controller: React.FC = () => {
  return (
    <Box bg="gray.300" minH="50vh">
      <Container textAlign="center" mt="8">
        <Stack direction="row" width="full" textAlign="center">
          <MicButton />
          <LeaveButton />
          <VideoButton />
          <ScreenShareController />
        </Stack>
      </Container>
      <Container>
        <AudioController />
        <VideoController />
      </Container>
    </Box>
  );
};
