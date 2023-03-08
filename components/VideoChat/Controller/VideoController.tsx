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
  Switch,
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
      <Switch
        isChecked={isLocalVideoEnabled}
        onChange={toggleVideo ?? (() => {})}
        className={`${
          isLocalVideoEnabled ? "bg-blue-600" : "bg-gray-200"
        } focus:outline-none relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
      >
        <span
          className={`${
            isLocalVideoEnabled ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </Switch>
    </div>
  );
};
