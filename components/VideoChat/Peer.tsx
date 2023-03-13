import {
  HMSPeer,
  selectScreenShareByPeerID,
  useHMSStore,
  useVideo,
} from "@100mslive/react-sdk";
import { Flex, Text } from "@chakra-ui/react";

type Props = {
  peer: HMSPeer;
};

export const Peer: React.FC<Props> = ({ peer }) => {
  const screenshareVideoTrack = useHMSStore(selectScreenShareByPeerID(peer.id));
  const { videoRef } = useVideo({
    trackId: screenshareVideoTrack?.id ?? peer.videoTrack,
  });

  return (
    <Flex
      flexDirection="column"
      gap="2"
      alignItems="center"
      alignSelf="center"
      justifyContent="center"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ transform: "scaleX(-1)", maxHeight: "70vh" }}
      />
      <Text color="white">
        {peer.name} {peer.isLocal && "(You)"}
      </Text>
    </Flex>
  );
};
