import { ChevronDownIcon } from "@chakra-ui/icons"
import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react"
import React from "react"
import { TiHome } from "react-icons/ti"

const Directory: React.FC = () => {
  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        mr={2}
        ml={{ base: 0, md: 2 }}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex
          align={"center"}
          justify="space-between"
          width={{ base: "auto", lg: "200px" }}
        >
          <Flex align={"center"}>
            <Icon fontSize={24} mr={1} color="gray.600" as={TiHome} />
            <Flex display={{ base: "none", lg: "flex" }} alignSelf='flex-end' >
              <Text fontSize={"10pt"} fontWeight={600}>
                Home
              </Text>
            </Flex>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem>Communities</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem>
      </MenuList>
    </Menu>
  )
}
export default Directory
