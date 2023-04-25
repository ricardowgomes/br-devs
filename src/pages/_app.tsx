import '@app/styles/globals.css';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import Navbar from '@app/shared/Navbar';
import UserContext from '@app/context/UserContext';
import useUserData from '@app/hooks/useUserData';


export default function App({ Component, pageProps }: AppProps) {
  const userData = useUserData();

  return (
    <>
      <UserContext.Provider value={userData}>
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
      </UserContext.Provider>
    </>
  )
}
