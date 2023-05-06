import '@app/styles/globals.css';
import UserProvider from '@app/context/UserProvider';
import Navbar from '@app/shared/Navbar';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ 
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      {/* prevent extensions from causing a server/client
      mismatch by setting suppressHydrationWarning to true */}
      <body suppressHydrationWarning={true}>
        <UserProvider>
          <Navbar />
            {children}
          <Toaster/>
        </UserProvider>
      </body>
    </html>
  );
}
