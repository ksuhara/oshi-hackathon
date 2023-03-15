import {
  HMSNotificationTypes,
  selectLocalPeerID,
  selectPeerMetadata,
  useHMSActions,
  useHMSNotifications,
  useHMSStore,
} from "@100mslive/react-sdk";
import { IconButton, useToast } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { FaHandPaper, FaHandRock } from "react-icons/fa";

export const RaiseHandButton: React.FC = () => {
  const toast = useToast();
  const localPeerId = useHMSStore(selectLocalPeerID);
  const metaData = useHMSStore(selectPeerMetadata(localPeerId));
  const hmsActions = useHMSActions();
  const toggleRaiseHand = useCallback(async () => {
    const newMetadata = { ...metaData, isHandRaised: !metaData.isHandRaised };
    await hmsActions.changeMetadata(newMetadata);
  }, [hmsActions, metaData]);

  const notification = useHMSNotifications(
    HMSNotificationTypes.METADATA_UPDATED
  );
  const peer = notification?.data;
  const isHandRaised = useHMSStore(
    selectPeerMetadata(peer?.id ?? "")
  )?.isHandRaised;

  useEffect(() => {
    if (isHandRaised && peer && !peer.isLocal) {
      toast({ status: "success", title: `${peer.name} raised their hand.` });
    }
  }, [isHandRaised, peer]);

  return (
    <IconButton
      onClick={toggleRaiseHand}
      shadow="lg"
      icon={metaData.isHandRaised ? <FaHandRock /> : <FaHandPaper />}
      aria-label="toggle audio"
    ></IconButton>
  );
};
