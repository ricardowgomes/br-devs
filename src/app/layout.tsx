import '@app/styles/globals.css';
import Navbar from '@app/shared/Navbar';
import UserContext from '@app/context/UserContext';
import useUserData from '@app/hooks/useUserData';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ 
  children,
}: {
  children: React.ReactNode,
}) {
  const userData = useUserData();

  return (
    <html lang="en">
      <body>
        <UserContext.Provider value={userData}>
          <Navbar />
          {children}
          <Toaster/>
        </UserContext.Provider>
      </body>
    </html>
  );
}
