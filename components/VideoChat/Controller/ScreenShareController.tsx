import {
  selectIsLocalScreenShared,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { Switch } from "@chakra-ui/react";

export const ScreenShareController: React.FC = () => {
  const hmsActions = useHMSActions();
  const amIScreenSharing = useHMSStore(selectIsLocalScreenShared);

  const handleToggleShareScreen = async () => {
    try {
      await hmsActions.setScreenShareEnabled(!amIScreenSharing);
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <span>Share Screen</span>
      <Switch
        isChecked={amIScreenSharing}
        onChange={handleToggleShareScreen}
        className={`${
          amIScreenSharing ? "bg-blue-600" : "bg-gray-200"
        } focus:outline-none relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
      >
        <span
          className={`${
            amIScreenSharing ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </Switch>
    </div>
  );
};
