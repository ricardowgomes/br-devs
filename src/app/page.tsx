import type { Metadata } from 'next';
import { firestore, fromMillis, postToJSON } from '@app/lib/firebase';

import HomePage from './home-page';

export const metadata: Metadata = {
  title: 'BR Devs | Brazilian Developers in Canada',
  description: 'BR Devs is a blog for Brazilians Developers to share their experiences and technical knowledge working in Canada',
};

// Max post to query per page
const LIMIT = 10;

async function getPosts() {
  const postsQuery = firestore
  .collectionGroup('posts')
  .where('published', '==', true)
  .orderBy('createdAt', 'desc')
  .limit(LIMIT);

  const initialPosts = (await postsQuery.get()).docs.map(postToJSON);
  return initialPosts;
}

export default async function Page() {
  const initialPosts: any = await getPosts();

  return <HomePage initialPosts={initialPosts} />
}