import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  Text,
} from "@chakra-ui/react"
import React from "react"
import { useRecoilState } from "recoil"
import { authModalState } from "../../../atoms/authModalAtom"
import AuthInputs from "./AuthInputs"
import OAuthButton from "./OAuthButton"

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState)

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }))
  }
  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">{modalState.view}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            pb={6}
          >
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="center"
              width="70%"
            >
              <OAuthButton />
              <Text color="gray.500" fontWeight={700}>OR</Text>
            <AuthInputs />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
export default AuthModal
