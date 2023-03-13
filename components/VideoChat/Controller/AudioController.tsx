import {
  selectDevices,
  selectLocalMediaSettings,
  useAVToggle,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Button, List, ListItem, useDisclosure } from "@chakra-ui/react";

export const AudioController: React.FC = () => {
  const hmsActions = useHMSActions();
  const devices = useHMSStore(selectDevices);
  const selectedDevices = useHMSStore(selectLocalMediaSettings);
  const { isLocalAudioEnabled, toggleAudio } = useAVToggle();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const handleChangeAudioInput = async (deviceId: string) => {
    await hmsActions.setAudioSettings({ deviceId });
  };
  const handleChangeAudioOutput = (deviceId: string) => {
    hmsActions.setAudioOutputDevice(deviceId);
  };

  return (
    <List spacing={2} width="full">
      <ListItem>
        <Button
          onClick={isOpen ? onClose : onOpen}
          backgroundColor="transparent"
          color="black"
          px={2}
          py={1}
          rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        >
          Mic
        </Button>
        <List
          display={isOpen ? "block" : "none"}
          position="absolute"
          zIndex="1"
          backgroundColor="white"
          border="1px"
          borderColor="gray.200"
          borderRadius="md"
          boxShadow="md"
          py={2}
          px={3}
        >
          <List spacing={2}>
            <ListItem>Microphone:</ListItem>
            {devices.audioInput.map((audioInput) => (
              <ListItem
                key={audioInput.deviceId}
                onClick={() => handleChangeAudioInput(audioInput.deviceId)}
                bg={
                  selectedDevices.audioInputDeviceId === audioInput.deviceId
                    ? "gray.200"
                    : ""
                }
                _hover={{
                  bg:
                    selectedDevices.audioInputDeviceId !== audioInput.deviceId
                      ? "gray.100"
                      : "",
                }}
              >
                {audioInput.label}
              </ListItem>
            ))}
          </List>
          <hr style={{ margin: "0.5rem 0" }} />
          <List spacing={2}>
            <ListItem>Speaker:</ListItem>
            {devices.audioOutput.map((audioOutput) => (
              <ListItem
                key={audioOutput.deviceId}
                onClick={() => handleChangeAudioOutput(audioOutput.deviceId)}
                bg={
                  selectedDevices.audioOutputDeviceId === audioOutput.deviceId
                    ? "gray.200"
                    : ""
                }
                _hover={{
                  bg:
                    selectedDevices.audioOutputDeviceId !== audioOutput.deviceId
                      ? "gray.100"
                      : "",
                }}
              >
                {audioOutput.label}
              </ListItem>
            ))}
          </List>
        </List>
      </ListItem>
    </List>
  );
};
