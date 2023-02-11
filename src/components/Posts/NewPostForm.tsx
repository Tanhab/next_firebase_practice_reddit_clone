import { Alert, AlertDescription, AlertIcon, AlertTitle, Flex, Icon, Toast } from "@chakra-ui/react"
import React, { useRef, useState } from "react"
import { BiPoll } from "react-icons/bi"
import { BsLink45Deg, BsMic } from "react-icons/bs"
import { IoDocumentText, IoImageOutline } from "react-icons/io5"
import { AiFillCloseCircle } from "react-icons/ai"
import TabItems from "./TabItems"
import TextInputs from "./PostForm/TextInputs"
import ImageUpload from "./PostForm/ImageUpload"
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore"
import { ref, uploadString, getDownloadURL } from "firebase/storage"
import router from "next/router"
import { auth, firestore, storage } from "../../firebase/client.App"
import { useAuthState } from "react-firebase-hooks/auth"
import { User } from "firebase/auth"

type NewPostFormProps = {
  user: User
}

const formTabs: TabItem[] = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images & Video",
    icon: IoImageOutline,
  },
  {
    title: "Link",
    icon: BsLink45Deg,
  },
  {
    title: "Poll",
    icon: BiPoll,
  },
  {
    title: "Talk",
    icon: BsMic,
  },
]

export type TabItem = {
  title: string
  icon: typeof Icon.arguments
}

const NewPostForm: React.FC<NewPostFormProps> = ({ user }) => {
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  })
  const [selectedFile, setSelectedFile] = useState<string>()

  const handleCreatePost = async () => {
    const { communityId } = router.query
    setLoading(true)
    const { title, body } = textInputs
    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), {
        communityId: communityId as string,
        communityImageURL: "",
        creatorId: user.uid,
        userDisplayText: user.email!.split("@")[0],
        title,
        body,
        numberOfComments: 0,
        voteStatus: 0,
        createdAt: serverTimestamp(),
        editedAt: serverTimestamp(),
      })

      console.log("HERE IS NEW POST ID", postDocRef.id)

      // // check if selectedFile exists, if it does, do image processing
      if (selectedFile) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`)
        await uploadString(imageRef, selectedFile, "data_url")
        const downloadURL = await getDownloadURL(imageRef)
        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        })
        console.log("HERE IS DOWNLOAD URL", downloadURL)
      }

      // Clear the cache to cause a refetch of the posts
      // setPostItems((prev) => ({
      //   ...prev,
      //   postUpdateRequired: true,
      // }))
      router.back()
    } catch (error) {
      console.log("createPost error", error)
      setError("Error creating post")
    }
    setLoading(false)
  }

  const onTextChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0])
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target?.result as string)
      }
    }
  }
  return (
    <Flex direction={"column"} bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {formTabs.map((item) => (
          <TabItems
            key={item.title}
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex p={4}>
        {selectedTab === "Post" && (
          <TextInputs
            textInputs={textInputs}
            onChange={onTextChange}
            handleCreatePost={handleCreatePost}
            loading={loading}
          />
        )}
        {selectedTab === "Images & Video" && (
          <ImageUpload
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            setSelectedTab={setSelectedTab}
            onSelectImage={onSelectImage}
          />
        )}
      </Flex>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      )}
    </Flex>
  )
}
export default NewPostForm
