import { Box,Text } from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import PageContent from '../../../components/Layout/PageContent';
import NewPostForm from '../../../components/Posts/NewPostForm';
import { auth } from '../../../firebase/client.App';

type submitProps = {
    
};

const SubmitPostPage:React.FC<submitProps> = () => {
  const [user] = useAuthState(auth)
    return (
      <PageContent>
        <>
          <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
            <Text fontWeight={600}>Create a post</Text>
          </Box>
          {user && <NewPostForm user={user}/>}
        </>
        <>
        </>
      </PageContent>
    )
}
export default SubmitPostPage