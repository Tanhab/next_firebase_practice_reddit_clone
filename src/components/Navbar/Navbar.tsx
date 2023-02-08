import { Flex, Image } from "@chakra-ui/react"
import React from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../firebase/client.App"

import Directory from "./Directory/Directory"
import RightContent from "./RightContent/RightContent"
import SearchInput from "./SearchInput"

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth)
  return (
    // bg="white" height="44px" padding="6px 12px"
    <div
      style={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        width:'100%'
      }}
    >
      <Flex align="center" width={{base: '40px', md: 'auto'}} mr={{base: 0, md:2}}>
        <Image src="/images/redditFace.svg" height="30px" />
        <Image
          src="/images/redditText.svg"
          height="46px"
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </div>
  )
}
export default Navbar
