import {
  selectDevices,
  selectLocalMediaSettings,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

export const VideoController: React.FC = () => {
  const hmsActions = useHMSActions();
  const devices = useHMSStore(selectDevices);
  const selectedDevices = useHMSStore(selectLocalMediaSettings);

  const handleChangeVideo = async (deviceId: string) => {
    await hmsActions.setVideoSettings({ deviceId });
  };

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} size="sm">
        {devices.videoInput
          .find(
            ({ deviceId }) => deviceId == selectedDevices.videoInputDeviceId
          )
          ?.label.substring(0, 12) + "..."}
      </MenuButton>
      <MenuList>
        {devices.videoInput.map((videoInput) => (
          <MenuItem
            key={videoInput.deviceId}
            onClick={() => handleChangeVideo(videoInput.deviceId)}
          >
            {videoInput.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
