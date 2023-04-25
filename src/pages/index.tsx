import { useState } from 'react';
import Loader from '@app/shared/Loader'
import PostFeed from '@app/shared/PostFeed'

import { firestore, fromMillis, postToJSON } from '@app/lib/firebase';
import { Post } from '@app/types/post';

// Max post to query per page
const LIMIT = 1;

export async function getServerSideProps() {
  const postsQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default function Home(props: { posts: [Post] }) {
  const [posts, setPosts] = useState<[Post] | any>(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;

    const query = firestore
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts((prev: [Post]) => [...prev, ...newPosts]);
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
      <main>
        <PostFeed posts={posts} />
        {
          !loading &&
          !postsEnd &&
          <button
            onClick={getMorePosts}
            disabled={!posts.length}
          >
            Load more
          </button>
        }
        <Loader show={loading} />
        {postsEnd && 'You have reached the end!'}
      </main>
  );
}
