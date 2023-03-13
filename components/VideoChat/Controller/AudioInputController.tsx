import {
  selectDevices,
  selectLocalMediaSettings,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsFillMicFill } from "react-icons/bs";

export const AudioInputController: React.FC = () => {
  const hmsActions = useHMSActions();
  const devices = useHMSStore(selectDevices);
  const selectedDevices = useHMSStore(selectLocalMediaSettings);

  const handleChangeAudioInput = async (deviceId: string) => {
    await hmsActions.setAudioSettings({ deviceId });
  };

  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          leftIcon={<BsFillMicFill />}
          size="sm"
        >
          {devices.audioInput
            .find(
              ({ deviceId }) => deviceId == selectedDevices.audioInputDeviceId
            )
            ?.label.substring(0, 12) + "..."}
        </MenuButton>
        <MenuList>
          {devices.audioInput.map((audioInput) => (
            <MenuItem
              key={audioInput.deviceId}
              onClick={() => handleChangeAudioInput(audioInput.deviceId)}
            >
              {audioInput.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};
