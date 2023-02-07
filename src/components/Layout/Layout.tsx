import React, { PropsWithChildren } from 'react';
import Navbar from './Navbar/Navbar';


const Layout:React.FC<PropsWithChildren> = ({ children }) => {
    
    return (
        <>
        <Navbar />
        <main style={{paddingTop:'50px'}}>{children}</main>
        </>
    )
}
export default Layout;