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
import { log } from "console"
import React, { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRecoilState } from "recoil"
import { authModalState } from "../../../atoms/authModalAtom"
import { auth } from "../../../firebase/client.App"
import AuthInputs from "./AuthInputs"
import OAuthButton from "./OAuthButton"

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState)
  const [user, loading, error] = useAuthState(auth)

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }))
  }

  useEffect(() => {
    if (user) handleClose()
  }, [user])
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
              {modalState.view !== "resetPassword" && (
                <>
                  <OAuthButton />
                  <Text color="gray.500" fontWeight={700}>
                    OR
                  </Text>
                </>
              )}
              <AuthInputs />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
export default AuthModal
