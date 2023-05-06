import UserContext from '@app/context/UserContext';
import { useContext } from 'react';
import { SignOutButton, SignInButton } from './SignButtons';
import UsernameForm from './UsernameForm';
import Error from './error';

export default function Page() {
  const { user, username } = useContext(UserContext);

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <main>
      <React.ErrorBoundary fallback={<Error/>}>
        {user ? !username ? <UsernameForm /> : <SignOutButton /> : <SignInButton />}
      </React.ErrorBoundary>
    </main>
  );
}
