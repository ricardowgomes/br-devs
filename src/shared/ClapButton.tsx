import { firestore, auth, increment } from '@app/lib/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';

// Allows user to clap or like a post
export default function ClapButton({ postRef }: any) {
  // Listen to clap document for currently logged in user
  const clapRef = postRef.collection('claps').doc(auth.currentUser?.uid);
  const [clapDoc] = useDocument(clapRef);

  // Create a user-to-post relationship
  const addClap = async () => {
    const uid = auth.currentUser?.uid;
    const batch = firestore.batch();

    batch.update(postRef, { clapCount: increment(1) });
    batch.set(clapRef, { uid });

    await batch.commit();
  };

  // Remove a user-to-post relationship
  const removeClap = async () => {
    const batch = firestore.batch();

    batch.update(postRef, { clapCount: increment(-1) });
    batch.delete(clapRef);

    await batch.commit();
  };

  return clapDoc && clapDoc.exists() ? (
    <button onClick={removeClap}>💔 not for me</button>
  ) : (
    <button onClick={addClap}>👏 Nice</button>
  );
}
