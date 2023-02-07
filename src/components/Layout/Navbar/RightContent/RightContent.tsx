import { Button, Flex } from "@chakra-ui/react"
import { signOut, User } from "firebase/auth"
import React from "react"
import { auth } from "../../../../firebase/client.App"
import AuthModal from "../../../Modal/Auth/AuthModal"
import AuthButtons from "./AuthButtons"
import ActionIcons from "./Icons"
import UserMenu from "./UserMenu"

type RightContentProps = {
  user?: User|null
}

const RightContent: React.FC<RightContentProps> = ({user}) => {
  return (
    <>
      <AuthModal />
      <Flex position={'relative'} alignItems="center">
        {user ? <ActionIcons /> : <AuthButtons />}
        <UserMenu user={user} />
      </Flex>
    </>
  )
}
export default RightContent
