import PostFeed from '@app/shared/PostFeed';
import Metatags from '@app/shared/Metatags';
import Loader from '@app/shared/Loader';
import { firestore, fromMillis, postToJSON } from '@app/lib/firebase';

import { useState } from 'react';
import { Post } from '@app/types';

// Max post to query per page
const LIMIT = 10;

export async function getServerSideProps() {
  const postsQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);

  const initialPosts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { initialPosts }, // will be passed to the page component as props
  };
}

export default function Home({ initialPosts }: { initialPosts: [Post] }) {
  const [posts, setPosts] = useState<[Post] | any>(initialPosts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  // Get next page in pagination query
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
      <Metatags title="Home Page" description="Get the latest posts on our site" />

      <div className="card card-info">
        <h2>💡 Next.js + Firebase - The Full Course</h2>
        <p>Welcome! This app is built with Next.js and Firebase and is loosely inspired by Dev.to.</p>
        <p>Sign up for an 👨‍🎤 account, ✍️ write posts, then 💞 heart content created by other users. All public content is server-rendered and search-engine optimized.</p>
      </div>

      <PostFeed posts={posts} admin={false} />

      {!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>}

      <Loader show={loading} />

      {postsEnd && 'You have reached the end!'}
    </main>
  );
}
