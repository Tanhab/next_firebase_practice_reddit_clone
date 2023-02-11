import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRecoilState, useSetRecoilState } from "recoil"
import { authModalState } from "../atoms/authModalAtom"
import {
  Community,
  CommunitySnippet,
  communityState,
} from "../atoms/communitiesAtom"
import { auth, firestore } from "../firebase/client.App"

const useCommunityData = () => {
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState)
  const setAuthModalState = useSetRecoilState(authModalState)
  const [user] = useAuthState(auth)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    if (!user) {
      setAuthModalState({open:true, view:'login'})
      return
    }

    if (isJoined) {
      leaveCommunity(communityData.id)
      return
    }

    joinCommunity(communityData)
  }

  const getMySnippets = async () => {
    setLoading(true)
    try {
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      )

      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }))
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
      }))
    } catch (error: any) {
      console.error("getmysnnipeterror", error)
      setError(error?.message)
    }
    setLoading(false)
  }

  const joinCommunity = async (coummunityData: Community) => {
    setLoading(true)
    try {
      const batch = writeBatch(firestore)
      const newSnippet: CommunitySnippet = {
        communityId: coummunityData.id,
        imageURL: coummunityData.imageURL || "",
      }
      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          coummunityData.id // will for sure have this value at this point
        ),
        newSnippet
      )

      batch.update(doc(firestore, "communities", coummunityData.id), {
        numberOfMembers: increment(1),
      })

      // perform batch writes
      await batch.commit()

      // Add current coummunityData to snippet
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }))
    } catch (error: any) {
      console.error("joinCommunity", error)
      setError(error?.message)
    }

    setLoading(false)
  }
  const leaveCommunity = async (communityId: string) => {
    try {
      const batch = writeBatch(firestore)

      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets/${communityId}`)
      )

      batch.update(doc(firestore, "communities", communityId), {
        numberOfMembers: increment(-1),
      })

      await batch.commit()

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item) => item.communityId !== communityId
        ),
      }))
    } catch (error) {
      console.log("leaveCommunity error", error)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!user) {
      setCommunityStateValue(prev => ({
        ...prev,
        mySnippets: []
      }))
      return
    }
    getMySnippets()
  }, [user])
  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  }
}
export default useCommunityData
