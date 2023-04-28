import { createContext } from 'react';
import type { User } from '@app/types'

interface UserContextType {
  user: User | null | any;
  username: string | null;
}

const UserContext = createContext<UserContextType>({
  user: null, username: null
});

export default UserContext
