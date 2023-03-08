import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { useEffect } from "react";
import { JoinForm } from "./JoinForm";
import { VideoChat } from "./VideoChat";

export const Home: React.FC = () => {
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);

  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);

  return <>{isConnected ? <VideoChat /> : <JoinForm />}</>;
};
