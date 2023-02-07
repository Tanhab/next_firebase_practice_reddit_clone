import { Flex } from "@chakra-ui/react"
import React from "react"
import { useRecoilValue } from "recoil"
import { authModalState } from "../../../atoms/authModalAtom"
import Login from "./Login"
import ResetPassword from "./ResetPassword"
import SignUp from "./SignUp"

type AuthInputsProps = {}

const AuthInputs: React.FC<AuthInputsProps> = () => {
  const modalState = useRecoilValue(authModalState)
  return (
    <>
      <Flex direction="column" alignItems="center" width="100%" mt={4}></Flex>
      {modalState.view === "login" && <Login />}
      {modalState.view === "signup" && <SignUp />}
      {modalState.view === "resetPassword" && <ResetPassword />}
    </>
  )
}
export default AuthInputs
