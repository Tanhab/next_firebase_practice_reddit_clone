import { Input, Button, Flex, Text } from "@chakra-ui/react"
import React, { useState } from "react"
import { useSetRecoilState } from "recoil"
import { authModalState } from "../../../atoms/authModalAtom"
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
import { auth } from "../../../firebase/client.App"
import { FIREBASE_ERRORS } from "../../../firebase/errors"

const SignUp: React.FC = () => {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth)

  const setAuthModalState = useSetRecoilState(authModalState)
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if(error) setError('')
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError("Password do not match")
      return
    }
    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password)
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
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
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
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
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          bg="gray.300"
          mb={2}
        ></Input>
        <Input
          required
          name="confirmPassword"
          type="password"
          placeholder="confirm password"
          onChange={onChange}
          fontSize="10pt"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          bg="gray.300"
        ></Input>
        {(error || userError) && 
        <Text textAlign="center" mt={2} fontSize="10pt" color="red">
          {error ||             FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
        </Text>}
        <Button width="100%" height={"36px"} mt={2} mb={2} type="submit" isLoading={loading}>
          Sign Up 
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
          <Text mr={1}>Already a redditor?</Text>
          <Text
            color="blue.500"
            fontWeight={700}
            cursor="pointer"
            //onClick={() => toggleView("signup")}
            onClick={() => setAuthModalState({ open: true, view: "login" })}
          >
            Log In
          </Text>
        </Flex>
      </form>
    </>
  )
}
export default SignUp
