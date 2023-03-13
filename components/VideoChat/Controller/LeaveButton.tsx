import { useHMSActions } from "@100mslive/react-sdk";
import { IconButton } from "@chakra-ui/react";
import { ImPhoneHangUp } from "react-icons/im";

export const LeaveButton: React.FC = () => {
  const hmsActions = useHMSActions();

  const handleClick = () => {
    hmsActions.leave();
  };

  return (
    <IconButton
      onClick={handleClick}
      bgColor="red.600"
      rounded="full"
      color="white"
      size="lg"
      shadow="lg"
      icon={<ImPhoneHangUp />}
      aria-label="Leave call"
    ></IconButton>
  );
};
