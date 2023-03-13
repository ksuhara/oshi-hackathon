import { useAVToggle } from "@100mslive/react-sdk";
import { IconButton } from "@chakra-ui/react";
import { BsCameraVideoFill, BsCameraVideoOffFill } from "react-icons/bs";

export const VideoButton: React.FC = () => {
  const { isLocalVideoEnabled, toggleVideo } = useAVToggle();

  return (
    <IconButton
      onClick={toggleVideo}
      shadow="lg"
      icon={
        isLocalVideoEnabled ? <BsCameraVideoOffFill /> : <BsCameraVideoFill />
      }
      aria-label="toggle video"
    ></IconButton>
  );
};
