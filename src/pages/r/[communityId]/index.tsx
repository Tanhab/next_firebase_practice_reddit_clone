import { doc, getDoc } from "firebase/firestore"
import { GetServerSidePropsContext } from "next"
import React from "react"
import safeJsonStringify from "safe-json-stringify"
import { Community } from "../../../atoms/communitiesAtom"
import CreatePostLink from "../../../components/Community/CreatePostLink"
import Header from "../../../components/Community/Header"
import CommunityNotFound from "../../../components/Community/NotFound"
import PageContent from "../../../components/Layout/PageContent"
import Posts from "../../../components/Posts/Posts"
import { firestore } from "../../../firebase/client.App"

type CommunityPageProps = {
  communityData: Community
}

const CummunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  //console.table(communityData)
  if (!communityData) {
    return <CommunityNotFound />
  }
  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityData}/>
        </>
        <></>
      </PageContent>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId as string
    )
    const communityDoc = await getDoc(communityDocRef)

    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({
                id: communityDoc.id,
                ...communityDoc.data(),
              }) // needed for dates
            )
          : "",
      },
    }
  } catch (error) {
    console.error("getServerSideProps err", error)
    return {
      redirect: {
        destination: "/",
        statusCode: 307,
      },
    }
  }
}
export default CummunityPage
