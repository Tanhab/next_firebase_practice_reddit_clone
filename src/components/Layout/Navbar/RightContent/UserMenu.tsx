import { ChevronDownIcon } from "@chakra-ui/icons"
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Icon,
  Flex,
} from "@chakra-ui/react"
import { User } from "firebase/auth"
import React from "react"

import { FaRedditSquare } from "react-icons/fa"
import { VscAccount } from "react-icons/vsc"
import { IoSparkles } from "react-icons/io5"
import { CgProfile } from "react-icons/cg"

type UserMenuProps = {
  user?: User | null
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  return (
    <Menu >
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        {user ? (
          <Flex align={"center"}>
            <Flex>
              <>
                <Icon
                  fontSize={24}
                  mr={1}
                  color="gray.300"
                  as={FaRedditSquare}
                />
              </>
              <ChevronDownIcon />
            </Flex>
          </Flex>
        ) : (
          <Icon fontSize={24} mr={1} color="gray.300" as={VscAccount} />
        )}
      </MenuButton>
      <MenuList style={{position:'absolute'}}>
        <MenuItem
          fontSize={"10pt"}
          fontWeight={700}
          _hover={{ bg: "blue.500", color: "white" }}
        >
          <Flex align={"center"}>
            <Icon fontSize={20} mr={2} as={CgProfile} />
            Profile
          </Flex>
        </MenuItem>
        <MenuItem
          fontSize={"10pt"}
          fontWeight={700}
          _hover={{ bg: "blue.500", color: "white" }}
        >
          <Flex align={"center"}>
            <Icon fontSize={20} mr={2} as={CgProfile} />
            Profile
          </Flex>
        </MenuItem>
        <MenuItem
          fontSize={"10pt"}
          fontWeight={700}
          _hover={{ bg: "blue.500", color: "white" }}
        >
          <Flex align={"center"}>
            <Icon fontSize={20} mr={2} as={CgProfile} />
            Profile
          </Flex>
        </MenuItem>
        <MenuItem
          fontSize={"10pt"}
          fontWeight={700}
          _hover={{ bg: "blue.500", color: "white" }}
        >
          <Flex align={"center"}>
            <Icon fontSize={20} mr={2} as={CgProfile} />
            Profile
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
export default UserMenu
