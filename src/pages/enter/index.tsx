import { auth } from '@app/lib/firebase';
import SignInButton from './SignInButton';

const Enter = () => {
  const user = null;
  const username = null;

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <main>
      {user ?
        !username ? <UsernameForm /> : <SignOutButton />
        :
        <SignInButton />
      }
    </main>
  );
};

export default Enter;

// Sign out button
const SignOutButton = () => {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

const UsernameForm = () => {
  return null;
}
