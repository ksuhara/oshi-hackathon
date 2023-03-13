import { selectPeers, useHMSStore } from "@100mslive/react-sdk";
import { Box, Grid } from "@chakra-ui/react";
import { Controller } from "./Controller";
import { Peer } from "./Peer";

export const VideoChat: React.FC = () => {
  const peers = useHMSStore(selectPeers);

  return (
    <Box minH="100vh" backgroundColor="gray.900">
      <Grid gridAutoFlow="column" flex="1" gap="4" p="8">
        {peers.map((peer) => (
          <Peer key={peer.id} peer={peer} />
        ))}
      </Grid>
      <Controller />
    </Box>
  );
};
