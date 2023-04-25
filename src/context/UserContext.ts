import { createContext } from 'react';

interface UserContextType {
  user: string | null;
  username: string | null;
}

const UserContext = createContext<UserContextType>({
  user: null, username: null
});

export default UserContext
