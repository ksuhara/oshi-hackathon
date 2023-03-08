import { useHMSActions } from "@100mslive/react-sdk";
import { Button } from "@chakra-ui/react";
import type { VFC } from "react";

export const LeaveButton: VFC = () => {
  const hmsActions = useHMSActions();

  const handleClick = () => {
    hmsActions.leave();
  };

  return (
    <Button
      onClick={handleClick}
      backgroundColor="red.600"
      color="white"
      rounded="lg"
      shadow="lg"
    >
      Leave
    </Button>
  );
};
