import '@app/styles/globals.css';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import Navbar from '@app/shared/Navbar';
import UserContext from '@app/context/UserContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserContext.Provider>
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
      </UserContext.Provider>
    </>
  )
}
