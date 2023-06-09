import { getUserWithUsername, postToJSON } from '@app/lib/firebase';
import UserProfile from '@app/shared/UserProfile';
import Metatags from '@app/shared/Metatags';
import PostFeed from '@app/shared/PostFeed';
import { Post, User } from '@app/types';

export async function getServerSideProps({ query }: { query: { username: string }}) {
  const { username } = query;

  const userDoc = await getUserWithUsername(username);

  // If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  // JSON serializable data
  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref
      .collection('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(5);
    posts = (await postsQuery.get()).docs.map(postToJSON);
  }

  return {
    props: { user, posts }, // will be passed to the page component as props
  };
}

type UserProfilePageProps = {
  user: User,
  posts: [Post]
}

export default function UserProfilePage({ user, posts }: UserProfilePageProps) {
  return (
    <main>
      <Metatags title={user.username} description={`${user.username}'s public profile`} />
      <UserProfile user={user} />
      <PostFeed posts={posts} admin={false} />
    </main>
  );
}
