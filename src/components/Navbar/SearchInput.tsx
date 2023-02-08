import { SearchIcon } from "@chakra-ui/icons"
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react"
import { User } from "firebase/auth"
import React from "react"

type SearchInputProps = {
  user?: User | null
}

const SearchInput: React.FC<SearchInputProps> = ({ user }) => {
  return (
    <Flex flexGrow={1} maxWidth={user ? "auto" : "600px"} mr={2} align="center">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.400" />}
        />
        <Input
          fontSize="10pt"
          placeholder="Search reddit"
          _placeholder={{ color: "gray.400" }}
          _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          height="34px"
          bg="gray.50"
        />
      </InputGroup>
    </Flex>
  )
}
export default SearchInput
