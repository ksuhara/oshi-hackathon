import { useAVToggle } from "@100mslive/react-sdk";
import { IconButton } from "@chakra-ui/react";
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";

export const MicButton: React.FC = () => {
  const { isLocalAudioEnabled, toggleAudio } = useAVToggle();

  return (
    <IconButton
      onClick={toggleAudio}
      shadow="lg"
      icon={isLocalAudioEnabled ? <BsFillMicMuteFill /> : <BsFillMicFill />}
      aria-label="toggle audio"
    ></IconButton>
  );
};
