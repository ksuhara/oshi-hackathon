import {
  selectDevices,
  selectLocalMediaSettings,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { HiOutlineSpeakerWave } from "react-icons/hi2";

export const AudioOutputController: React.FC = () => {
  const hmsActions = useHMSActions();
  const devices = useHMSStore(selectDevices);
  const selectedDevices = useHMSStore(selectLocalMediaSettings);

  const handleChangeAudioOutput = (deviceId: string) => {
    hmsActions.setAudioOutputDevice(deviceId);
  };

  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          leftIcon={<HiOutlineSpeakerWave />}
          size="sm"
        >
          {devices.audioOutput
            .find(
              ({ deviceId }) => deviceId == selectedDevices.audioOutputDeviceId
            )
            ?.label.substring(0, 12) + "..."}
        </MenuButton>
        <MenuList>
          {devices.audioOutput.map((audiooutput) => (
            <MenuItem
              key={audiooutput.deviceId}
              onClick={() => handleChangeAudioOutput(audiooutput.deviceId)}
            >
              {audiooutput.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};
