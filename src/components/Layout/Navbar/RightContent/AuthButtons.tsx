import { Button } from "@chakra-ui/react"
import React from "react"

const AuthButtons: React.FC = () => {
  return (
    <>
      <Button
        variant="outline"
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
      >
        Log In
      </Button>
      <Button
        variant="outline"
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
      >
        Log out
      </Button>
    </>
  )
}
export default AuthButtons
