import Image from 'next/image';
import toast from 'react-hot-toast';
import { auth, googleAuthProvider } from '@app/lib/firebase';

const SignInButton = () => {
  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider)
    } catch (error) {
      toast.error(`${error}`)
    }
  }

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <Image src="/google.svg" alt="Google Logo" width={20} height={20} />
      Sign in with Google
    </button>
  )
};

export default SignInButton;
