import {
  selectIsLocalScreenShared,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { Flex, Switch, Text } from "@chakra-ui/react";

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
    <Flex flexDirection="column" alignItems="center" gap="1">
      <Text fontSize="md">Share Screen</Text>
      <Switch
        isChecked={amIScreenSharing}
        onChange={handleToggleShareScreen}
        colorScheme={amIScreenSharing ? "blue" : "gray"}
        size="sm"
      />
    </Flex>
  );
};
