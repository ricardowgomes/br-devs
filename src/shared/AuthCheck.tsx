import Link from 'next/link';
import { useContext } from 'react';
import UserContext from '@app/context/UserContext';

type AuthProps = {
  children?: JSX.Element | JSX.Element[],
  fallback?: any
}
// Component's children only shown to logged-in users
export default function AuthCheck(props: AuthProps) {
  const { username } = useContext(UserContext);

  return username ? props.children : props.fallback || <Link href="/enter">You must be signed in</Link>;
}
