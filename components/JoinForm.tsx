import { useHMSActions } from "@100mslive/react-sdk";
import { Input } from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";

export const JoinForm: React.FC = () => {
  const hmsActions = useHMSActions();
  const [userName, setUserName] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    hmsActions.join({
      userName,
      authToken: process.env.NEXT_PUBLIC_STAGE_TOKEN || "",
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Join Room</h2>
      <div>
        <label htmlFor="user_name">User Name:</label>
        <Input
          type="text"
          id="user_name"
          name="name"
          required
          value={userName}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Join</button>
    </form>
  );
};
