import UserProfile from '@app/shared/UserProfile';
import PostFeed from '@app/shared/PostFeed';
import { Post, User } from '@app/types';

type UserProfilePageProps = {
  user: User,
  posts: [Post]
}

export default function UserProfilePage({ user, posts }: UserProfilePageProps) {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} admin={false} />
    </main>
  );
}