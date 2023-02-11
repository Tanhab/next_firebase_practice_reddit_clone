import { Stack } from "@chakra-ui/react"
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { Community } from "../../atoms/communitiesAtom"
import { Post } from "../../atoms/postAtom"
import { auth, firestore } from "../../firebase/client.App"
import usePosts from "../../hooks/usePosts"
import PostItem from "./PostItem"
import PostLoader from "./PostLoader"

type PostsProps = {
  communityData: Community
}

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  const [user] = useAuthState(auth)
  const [loading, setLoading] = useState(false)
  const {
    postStateValue,
    setPostStateValue,
    onVote,
    onDeletePost,
    onSelectPost,
  } = usePosts()
  const getPosts = async () => {
    try {
      setLoading(true)
      const postQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id),
        orderBy("createdAt", "desc")
      )

      const postDocs = await getDocs(postQuery)
      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }))
    } catch (error: any) {
      console.log("getPosts error", error.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    getPosts()
  }, [])
  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {postStateValue.posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              userIsCreator={user?.uid === post.creatorId}
              onDeletePost={onDeletePost}
              onVote={onVote}
              userVoteValue={
                postStateValue.postVotes.find((vote) => vote.postId === post.id)
                  ?.voteValue
              }
            />
          ))}
        </Stack>
      )}
    </>
  )
}

export default Posts
