import {
    Box, Button, Divider, Flex,
    Icon, Image, Skeleton, SkeletonCircle, Spinner, Stack, Text
} from "@chakra-ui/react"
import { doc, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadString } from "firebase/storage"
import moment from "moment"
import Link from "next/link"
import React, { useRef, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { FaReddit } from "react-icons/fa"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { RiCakeLine } from "react-icons/ri"
import { useSetRecoilState } from "recoil"
import { Community, communityState } from "../../atoms/communitiesAtom"
import { auth, firestore, storage } from "../../firebase/client.App"
import useSelectFile from "../../hooks/useSelectFile"

type AboutProps = {
  communityData: Community
}

const About: React.FC<AboutProps> = ({ communityData }) => {
  const [user] = useAuthState(auth)
  const [imageLoading, setimageLoading] = useState(false)
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile()
  const selectedFileRef = useRef<HTMLInputElement>(null)
  const setCommunitySateValue = useSetRecoilState(communityState)
  const loading = false
  const onCreatePage = false

  const onUpdateImage = async () => {
    if (!selectedFile) return
    setimageLoading(true)
    try {
      const imageRef = ref(storage, `communities/${communityData.id}/image`)
      await uploadString(imageRef, selectedFile, "data_url")
      const downloadURL = await getDownloadURL(imageRef)

      await updateDoc(doc(firestore, "communities", communityData.id), {
        imageURL: downloadURL,
      })

      setCommunitySateValue((prev) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          imageURL: downloadURL,
        } as Community,
      }))
    } catch (error: any) {
      console.error(error)
    }
    setimageLoading(false)
  }
  return (
    <Box position="sticky" top="14px">
      <Flex
        justify="space-between"
        align="center"
        p={3}
        color="white"
        bg="blue.400"
        borderRadius="4px 4px 0px 0px"
      >
        <Text fontSize="10pt" fontWeight={700}>
          About Community
        </Text>
        <Icon as={HiOutlineDotsHorizontal} cursor="pointer" />
      </Flex>
      <Flex direction="column" p={3} bg="white" borderRadius="0px 0px 4px 4px">
        {loading ? (
          <Stack mt={2}>
            <SkeletonCircle size="10" />
            <Skeleton height="10px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        ) : (
          <>
            {user?.uid === communityData?.creatorId && (
              <Box
                bg="gray.100"
                width="100%"
                p={2}
                borderRadius={4}
                border="1px solid"
                borderColor="gray.300"
                cursor="pointer"
              >
                <Text fontSize="9pt" fontWeight={700} color="blue.500">
                  Add description
                </Text>
              </Box>
            )}
            <Stack spacing={2}>
              <Flex width="100%" p={2} fontWeight={600} fontSize="10pt">
                <Flex direction="column" flexGrow={1}>
                  <Text>
                    {communityData?.numberOfMembers?.toLocaleString()}{" "}
                  </Text>
                  <Text>Members</Text>
                </Flex>
                <Flex direction="column" flexGrow={1}>
                  <Text>1</Text>
                  <Text>Online</Text>
                </Flex>
              </Flex>
              <Divider />
              <Flex
                align="center"
                width="100%"
                p={1}
                fontWeight={500}
                fontSize="10pt"
              >
                <Icon as={RiCakeLine} mr={2} fontSize={18} />
                {communityData?.createdAt && (
                  <Text>
                    Created{" "}
                    {moment(
                      new Date(communityData.createdAt!.seconds * 1000)
                    ).format("MMM DD, YYYY")}
                  </Text>
                )}
              </Flex>
              {!onCreatePage && (
                <Link href={`/r/${communityData.id}/submit`}>
                  <Button mt={3} height="30px">
                    Create Post
                  </Button>
                </Link>
              )}
              {/* !!!ADDED AT THE VERY END!!! INITIALLY DOES NOT EXIST */}
              {user?.uid === communityData?.creatorId && (
                <>
                  <Divider />
                  <Stack fontSize="10pt" spacing={1}>
                    <Text fontWeight={600}>Admin</Text>
                    <Flex align="center" justify="space-between">
                      <Text
                        color="blue.500"
                        cursor="pointer"
                        _hover={{ textDecoration: "underline" }}
                        onClick={() => selectedFileRef.current?.click()}
                      >
                        Change Image
                      </Text>
                      {communityData?.imageURL || selectedFile ? (
                        <Image
                          borderRadius="full"
                          boxSize="40px"
                          src={selectedFile || communityData?.imageURL}
                          alt="Dan Abramov"
                        />
                      ) : (
                        <Icon
                          as={FaReddit}
                          fontSize={40}
                          color="brand.100"
                          mr={2}
                        />
                      )}
                    </Flex>
                    {selectedFile &&
                      (imageLoading ? (
                        <Spinner />
                      ) : (
                        <Text cursor="pointer" onClick={onUpdateImage}>
                          Save Changes
                        </Text>
                      ))}
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/x-png,image/gif,image/jpeg"
                      hidden
                      ref={selectedFileRef}
                      onChange={onSelectFile}
                    />
                  </Stack>
                </>
              )}
            </Stack>
          </>
        )}
      </Flex>
    </Box>
  )
}
export default About
