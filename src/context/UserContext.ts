import { createContext } from 'react';

interface UserContextType {
  user: null;
  username: null;
}

const UserContext: Context<UserContextType> = createContext<UserContextType>({
  user: null, username: null
});

export default UserContext
