import { getUserWithUsername, postToJSON } from '@app/lib/firebase';
import UserProfile from '@app/shared/UserProfile';
import PostFeed from '@app/shared/PostFeed';
import { Post, User } from '@app/types';

// The param for getServerSideProps is actually the path query
type Query = {
  query: { username: string }
}
export async function getServerSideProps({ query }: Query) {
  const { username } = query;

  const userDoc = await getUserWithUsername(username);

  // JSON serializable data
  let user = null;
  let posts = null;

  if (!userDoc) {
    return {
      notFound: true,
    };
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

  return {
    props: { user, posts }, // will be passed to the page component as props
  };
}


const UserProfilePage = ({ user, posts }: { user: User, posts: Array<Post> }) => (
  <main>
    <UserProfile user={user} />
    <PostFeed posts={posts} />
  </main>
)

export default UserProfilePage;
