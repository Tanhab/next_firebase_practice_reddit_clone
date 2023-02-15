import { doc, getDoc } from "firebase/firestore"
import { useRouter } from "next/router"
import { pid } from "process"
import React, { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { Post } from "../../../../atoms/postAtom"
import PageContent from "../../../../components/Layout/PageContent"
import PostItem from "../../../../components/Posts/PostItem"
import { auth, firestore } from "../../../../firebase/client.App"
import usePosts from "../../../../hooks/usePosts"

const PostPage: React.FC = () => {
  const { postStateValue, setPostStateValue, onDeletePost, onVote } = usePosts()
  const [loading, setLoading] = useState(false)
  const [user] = useAuthState(auth)
  const router = useRouter()

  const fetchPost = async (postId: string) =>{
    setLoading(true)
    try {
      const postDocRef = doc(firestore, "posts", postId as string)
      const postDoc = await getDoc(postDocRef)
      setPostStateValue((prev) => ({
        ...prev,
        selectedPost: { id: postDoc.id, ...postDoc.data() } as Post,
      }))
    } catch (error: any) {
      console.log("fetchPost error", error.message)
    }
    setLoading(false)
  }
  useEffect(()=>{
    const { pid } = router.query 
    if(pid && !postStateValue.selectedPost){
      fetchPost(pid as string)
    }
  },[router.query, postStateValue.selectedPost])
  return (
    <PageContent>
      <>
        {postStateValue.selectedPost && (
          <PostItem
            post={postStateValue.selectedPost}
            onVote={onVote}
            onDeletePost={onDeletePost}
            userVoteValue={
              postStateValue.postVotes.find(
                (item) => item.postId === postStateValue.selectedPost?.id
              )?.voteValue
            }
            userIsCreator={user?.uid === postStateValue.selectedPost?.creatorId}
          />
        )}
      </>
      <></>
    </PageContent>
  )
}
export default PostPage
