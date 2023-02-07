import { Flex, Image } from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/client.App';
import AuthModal from '../../Modal/Auth/AuthModal';
import RightContent from './RightContent/RightContent';
import SearchInput from './SearchInput';


const Navbar:React.FC = () => {
    const [user,loading,error] = useAuthState(auth)
    return (
      // bg="white" height="44px" padding="6px 12px"
      <div style={{backgroundColor: "white", display:'flex' , justifyContent : 'space-between', alignItems:'center', position:'relative'}}>
        <Flex align="center">
          <Image src="/images/redditFace.svg" height="30px" />
          <Image
            src="/images/redditText.svg"
            height="46px"
            display={{ base: "none", md: "unset" }}
          />
        </Flex>

        <SearchInput />
        <RightContent user={user} />
      </div>
    )
}
export default Navbar;