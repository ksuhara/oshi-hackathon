import { Grid, GridItem } from "@chakra-ui/react";
import { AudioController } from "./AudioController";
import { LeaveButton } from "./LeaveButton";
import { ScreenShareController } from "./ScreenShareController";
import { VideoController } from "./VideoController";

export const Controller: React.FC = () => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" px="2" py="4" bg="gray.300">
      <GridItem colSpan={2} justifyContent="center" alignItems="center" py="2">
        <AudioController />
        <VideoController />
      </GridItem>
      <GridItem justifyContent="center" alignItems="center" py="2">
        <ScreenShareController />
      </GridItem>
      <GridItem justifyContent="center" alignItems="center" py="2">
        <LeaveButton />
      </GridItem>
    </Grid>
  );
};
