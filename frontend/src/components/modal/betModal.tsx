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
  useToast,
} from "@chakra-ui/react";
import { doc, updateDoc } from "@firebase/firestore";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import InputField from "components/fields/InputField";
import { ethers } from "ethers";
import { serverTimestamp } from "firebase/firestore";
import useFirebaseUser from "hooks/useFirebaseUser";
import { ERC20ContractAddress, PaddockContractAddress } from "lib/constant";
import initializeFirebaseClient from "lib/initFirebase";
import { useState } from "react";

export default function BetModal(props: {
  projectId: string;
  title: string;
  isOpen: boolean;
  betPosition: boolean;
  totalBetOnSuccess: number;
  totalBetOnFailure: number;
  sponsored: number;
  comments: any[];
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
    comments,
  } = props;

  const [amount, setAmount] = useState("0");
  const [comment, setComment] = useState("");

  const { db } = initializeFirebaseClient();
  const { user, isLoading: loadingAuth } = useFirebaseUser();
  const toast = useToast();

  const [isApproved, setIsApproved] = useState(false);
  const [isTxLoading, setIsTxLoading] = useState(false);

  const { contract } = useContract(PaddockContractAddress);

  const { contract: erc20Token } = useContract(ERC20ContractAddress);

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
      const docRef = doc(db, "projects", projectId);
      await updateDoc(docRef, {
        comments: [...comments, { comment, betPosition, user: user.uid }],
        updatedAt: serverTimestamp(),
      });
      toast({
        title: "Successfully Bet!",
        status: "success",
        isClosable: true,
      });
    } catch (err) {
      console.error("contract call failure", err);
    }
    setIsTxLoading(false);
  };

  const callApprove = async () => {
    setIsTxLoading(true);
    try {
      const data = await approve([
        PaddockContractAddress,
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

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
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
          <InputField
            type="stirng"
            mb="20px"
            id="2"
            label="Comment"
            placeholder="Please write your reason"
            onChange={handleCommentChange}
          />
          <Text>
            Expected Payout:{" "}
            <span style={{ color: "#2F855A" }}>{expected || "0"}</span> USDC
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
