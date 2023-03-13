import {
  selectDevices,
  selectLocalMediaSettings,
  useAVToggle,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import {
  List,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";

export const VideoController: React.FC = () => {
  const hmsActions = useHMSActions();
  const devices = useHMSStore(selectDevices);
  const selectedDevices = useHMSStore(selectLocalMediaSettings);
  const { isLocalVideoEnabled, toggleVideo } = useAVToggle();

  const handleChangeVideo = async (deviceId: string) => {
    await hmsActions.setVideoSettings({ deviceId });
  };

  return (
    <div
      style={{ position: "relative" }}
      className="flex flex-col items-center gap-1"
    >
      <Popover>
        <PopoverTrigger>
          <button>Video</button>
        </PopoverTrigger>
        <PopoverContent className="z-10 bg-gray-100 rounded shadow-lg">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Camera:</PopoverHeader>
          <PopoverBody>
            <List spacing="2">
              {devices.videoInput.map((videoInput) => (
                <ListItem
                  key={videoInput.deviceId}
                  onClick={() => handleChangeVideo(videoInput.deviceId)}
                  className={`py-1 px-5 cursor-pointer ${
                    videoInput.deviceId === selectedDevices.videoInputDeviceId
                      ? "bg-blue-500 font-bold"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {videoInput.label}
                </ListItem>
              ))}
            </List>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
};
