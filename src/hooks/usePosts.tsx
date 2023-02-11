import { deleteDoc, doc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { authModalState } from "../atoms/authModalAtom"
import { communityState } from "../atoms/communitiesAtom"
import { Post, postState } from "../atoms/postAtom"
import { auth, firestore, storage } from "../firebase/client.App"

const usePosts = () => {
  const [user, loadingUser] = useAuthState(auth)
  const [postStateValue, setPostStateValue] = useRecoilState(postState)
  const setAuthModalState = useSetRecoilState(authModalState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const communityStateValue = useRecoilValue(communityState)

  const onVote = () => {}
  const onDeletePost = async (post: Post): Promise<boolean> => {
    try {
      if (post.imageURL) {
        const imageRef = ref(storage, `post/${post.id}/image`)
        await deleteObject(imageRef)
      }

      const postDocRef = doc(firestore, "posts", post.id)
      await deleteDoc(postDocRef)

      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id),
      }))
      return true
    } catch (error) {
      return false
    }
  }
  const onSelectPost = () => {}

  return {
    postStateValue,
    setPostStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  }
}
export default usePosts
