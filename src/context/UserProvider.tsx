import UserContext from '@app/context/UserContext';
import useUserData from '@app/hooks/useUserData';

export default function UserProvider({ 
  children 
}: { 
  children: React.ReactNode, 
}) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  )
}