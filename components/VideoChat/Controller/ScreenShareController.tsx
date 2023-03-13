import {
  selectIsLocalScreenShared,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { IconButton } from "@chakra-ui/react";
import { MdScreenShare, MdStopScreenShare } from "react-icons/md";

export const ScreenShareController = () => {
  const hmsActions = useHMSActions();
  const amIScreenSharing = useHMSStore(selectIsLocalScreenShared);

  const handleToggleShareScreen = async () => {
    try {
      await hmsActions.setScreenShareEnabled(!amIScreenSharing);
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <IconButton
      aria-label="screen share"
      icon={amIScreenSharing ? <MdStopScreenShare /> : <MdScreenShare />}
      onClick={handleToggleShareScreen}
    ></IconButton>
  );
};
