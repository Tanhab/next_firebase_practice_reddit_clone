import { Button, Flex, Input, Text } from "@chakra-ui/react"
import React, { useState } from "react"
import { authModalState } from "../../../atoms/authModalAtom"
import { useSetRecoilState } from "recoil"
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
import { auth } from "../../../firebase/client.App"
import { FIREBASE_ERRORS } from "../../../firebase/errors"
type LoginProps = {}

const Login: React.FC<LoginProps> = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  })

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth)

  const setAuthModalState = useSetRecoilState(authModalState)
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    signInWithEmailAndPassword(loginForm.email, loginForm.password)
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <Input
          required
          name="email"
          placeholder="email"
          mb={2}
          onChange={onChange}
          fontSize="10pt"
          _placeholder={{ color: "gray.500" }}
          _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          bg="gray.300"
        ></Input>
        <Input
          required
          name="password"
          type="password"
          placeholder="password"
          onChange={onChange}
          fontSize="10pt"
          _placeholder={{ color: "gray.500" }}
          _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          bg="gray.300"
        ></Input>
        {error && (
          <Text textAlign="center" mt={2} fontSize="10pt" color="red">
            {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
          </Text>
        )}
        <Button width="100%" height={"36px"} mt={2} mb={2} type="submit" isLoading={loading}>
          Log In
        </Button>
        <Flex justifyContent="center" mb={2}>
          <Text fontSize="9pt" mr={1}>
            Forgot your password?
          </Text>
          <Text
            fontSize="9pt"
            color="blue.500"
            cursor="pointer"
            // onClick={() => toggleView("resetPassword")}
            onClick={() =>
              setAuthModalState({ open: true, view: "resetPassword" })
            }
          >
            Reset
          </Text>
        </Flex>
        <Flex fontSize="9pt" justifyContent="center">
          <Text mr={1}>New here?</Text>
          <Text
            color="blue.500"
            fontWeight={700}
            cursor="pointer"
            //onClick={() => toggleView("signup")}
            onClick={() => setAuthModalState({ open: true, view: "signup" })}
          >
            SIGN UP
          </Text>
        </Flex>
      </form>
    </>
  )
}
export default Login
