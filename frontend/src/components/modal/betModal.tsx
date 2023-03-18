import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import InputField from "components/fields/InputField";
import { ethers } from "ethers";
import { useState } from "react";

export default function BetModal(props: {
  projectId: string;
  title: string;
  isOpen: boolean;
  betPosition: boolean;
  totalBetOnSuccess: number;
  totalBetOnFailure: number;
  sponsored: number;
  onClose: () => void;
}) {
  const {
    projectId,
    title,
    isOpen,
    onClose,
    betPosition,
    totalBetOnSuccess,
    totalBetOnFailure,
    sponsored,
  } = props;

  const [amount, setAmount] = useState("0");

  const [isApproved, setIsApproved] = useState(false);
  const [isTxLoading, setIsTxLoading] = useState(false);

  const { contract } = useContract(
    "0x0BB2c97f9F733798833510083d9f432296b6DD00"
  );

  const { contract: erc20Token } = useContract(
    "0xBE0F4D98cdDa6B7e93faC1Fb15c99197a1fb7919"
  );

  const { mutateAsync: betOnProject } = useContractWrite(
    contract,
    "betOnProject"
  );

  const totalPod =
    totalBetOnSuccess + totalBetOnFailure + sponsored + Number(amount);
  const expected = betPosition
    ? (totalPod * Number(amount)) / (totalBetOnSuccess + Number(amount))
    : (totalPod * Number(amount)) / (totalBetOnFailure + Number(amount));

  const { mutateAsync: approve } = useContractWrite(erc20Token, "approve");

  const call = async () => {
    setIsTxLoading(true);
    try {
      const data = await betOnProject([
        projectId,
        betPosition,
        ethers.utils.parseEther(amount),
      ]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
    setIsTxLoading(false);
  };

  const callApprove = async () => {
    setIsTxLoading(true);
    try {
      const data = await approve([
        "0x0BB2c97f9F733798833510083d9f432296b6DD00",
        ethers.utils.parseEther(amount),
      ]);
      setIsApproved(true);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
    setIsTxLoading(false);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputField
            type="stirng"
            mb="20px"
            id="2"
            label="Bet Amount"
            placeholder="USDC"
            onChange={handleAmountChange}
          />
          <Text>
            Expected Payout:{" "}
            <span style={{ color: "#2F855A" }}>{expected}</span>
          </Text>
          {isApproved ? (
            <Button
              variant="brand"
              fontSize="sm"
              fontWeight="500"
              borderRadius="70px"
              py="5px"
              w="full"
              onClick={call}
              isLoading={isTxLoading}
            >
              Bet
            </Button>
          ) : (
            <Button
              variant="brand"
              fontSize="sm"
              fontWeight="500"
              borderRadius="70px"
              py="5px"
              w="full"
              my="2"
              onClick={callApprove}
              isLoading={isTxLoading}
            >
              Approve
            </Button>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
