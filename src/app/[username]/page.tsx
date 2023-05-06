import { notFound } from "next/navigation"
import { getUserWithUsername, postToJSON } from '@app/lib/firebase';
import UserProfilePage from './user-profile-page';
import { Post, User } from '@app/types';

{/* <Metatags title={user.username} description={`${user.username}'s public profile`} />

export const metadata: Metadata = {
  title: 'BR Devs | Brazilian Developers in Canada',
  description: 'BR Devs is a blog for Brazilians Developers to share their experiences and technical knowledge working in Canada',
}; */}

async function getUser(username: string) {
  const userDoc = await getUserWithUsername(username);

  // JSON serializable data
  let user = null;
  let posts = null;

  if (!userDoc) {
    notFound();
  }

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref
      .collection('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(5);
    posts = (await postsQuery.get()).docs.map(postToJSON);
  }

  return { user, posts };
}

export default async function Page({ params }: { params: { username: string }}) {
  const { user, posts }: { user: User, posts: [Post] } = await getUser(params.username);
  
  return <UserProfilePage user={user} posts={posts} />
}
