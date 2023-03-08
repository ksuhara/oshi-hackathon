import {
  selectDevices,
  selectLocalMediaSettings,
  useAVToggle,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, List, ListItem, Switch } from "@chakra-ui/react";

export const AudioController: React.FC = () => {
  const hmsActions = useHMSActions();
  const devices = useHMSStore(selectDevices);
  const selectedDevices = useHMSStore(selectLocalMediaSettings);
  const { isLocalAudioEnabled, toggleAudio } = useAVToggle();

  const handleChangeAudioInput = async (deviceId: string) => {
    await hmsActions.setAudioSettings({ deviceId });
  };
  const handleChangeAudioOutput = (deviceId: string) => {
    hmsActions.setAudioOutputDevice(deviceId);
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <List spacing={2}>
        <ListItem>
          <Button
            onClick={() => {}}
            backgroundColor="transparent"
            color="black"
            px={2}
            py={1}
            rightIcon={<ChevronDownIcon display={true ? "block" : "none"} />}
            _hover={{
              background: "transparent",
              color: "blue.500",
              cursor: "pointer",
            }}
            _focus={{
              background: "transparent",
              outline: "none",
              color: "blue.500",
              boxShadow: "none",
            }}
          >
            Mic
          </Button>
          <List
            display={true ? "block" : "none"}
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
              <ListItem>
                <span>Microphone:</span>
              </ListItem>
              {devices.audioInput.map((audioInput) => (
                <ListItem
                  key={audioInput.deviceId}
                  onClick={() => handleChangeAudioInput(audioInput.deviceId)}
                  className={`py-1 px-5 cursor-pointer  ${
                    audioInput.deviceId === selectedDevices.audioInputDeviceId
                      ? "bg-blue-500 font-bold"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {audioInput.label}
                </ListItem>
              ))}
            </List>
            <hr style={{ margin: "0.5rem 0" }} />
            <List spacing={2}>
              <ListItem>
                <span>Speaker:</span>
              </ListItem>
              {devices.audioOutput.map((audioOutput) => (
                <ListItem
                  key={audioOutput.deviceId}
                  onClick={() => handleChangeAudioOutput(audioOutput.deviceId)}
                  className={`py-1 px-5 cursor-pointer  ${
                    audioOutput.deviceId === selectedDevices.audioOutputDeviceId
                      ? "bg-blue-500 font-bold"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {audioOutput.label}
                </ListItem>
              ))}
            </List>
          </List>
        </ListItem>
      </List>
      <Switch
        checked={isLocalAudioEnabled}
        onChange={toggleAudio ?? (() => {})}
        className={`${
          isLocalAudioEnabled ? "bg-blue-600" : "bg-gray-200"
        } focus:outline-none relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
      >
        <span
          className={`${
            isLocalAudioEnabled ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </Switch>
    </div>
  );
};
