import { Flex, Icon, Button, Image, Box, Text } from "@chakra-ui/react"

import React from "react"
import { FaReddit } from "react-icons/fa"
import { Community } from "../../atoms/communitiesAtom"

type HeaderProps = {
  communityData: Community
}

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  const isJoined = false
  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="50%" bg="blue.400" />
      <Flex justifyContent="center" bg="white" height="50%">
        <Flex width="95%" maxWidth="860px">
          {/* IMAGE URL IS ADDED AT THE VERY END BEFORE DUMMY DATA - USE ICON AT FIRST */}
          {/* {communityStateValue.currentCommunity.imageURL ? (
              <Image
                borderRadius="full"
                boxSize="66px"
                src={communityStateValue.currentCommunity.imageURL}
                alt="Dan Abramov"
                position="relative"
                top={-3}
                color="blue.500"
                border="4px solid white"
              />
            ) : (
              <Icon
                as={FaReddit}
                fontSize={64}
                position="relative"
                top={-3}
                color="blue.500"
                border="4px solid white"
                borderRadius="50%"
              />
            )} */}
          <Icon
            as={FaReddit}
            fontSize={64}
            position="relative"
            top={-3}
            color="blue.500"
            border="4px solid white"
            borderRadius="50%"
          />
          <Flex padding="10px 16px">
            <Flex direction="column" mr={6}>
              <Text fontWeight={800} fontSize="16pt">
                {communityData.id}
              </Text>
              <Text fontWeight={600} fontSize="10pt" color="gray.400">
                r/{communityData.id}
              </Text>
            </Flex>
            <Flex>
              <Button
                variant={isJoined ? "outline" : "solid"}
                height="30px"
                pr={6}
                pl={6}
                //onClick={() => onJoinLeaveCommunity(communityData, isJoined)}
                //isLoading={loading}
              >
                {isJoined ? "Joined" : "Join"}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
export default Header
