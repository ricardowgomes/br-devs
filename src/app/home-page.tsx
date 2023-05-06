'use client'

import PostFeed from '@app/shared/PostFeed';
import Loader from '@app/shared/Loader';
import { firestore, fromMillis } from '@app/lib/firebase';

import { useState } from 'react';
import { Post } from '@app/types';

export default function HomePage({ initialPosts }: { initialPosts: [Post] }) {
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
      .limit(10);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts((prev: [Post]) => [...prev, ...newPosts]);

    setLoading(false);

    if (newPosts.length < 10) {
      setPostsEnd(true);
    }
  };

  return (
    <main>
      <div className="card card-info">
        <h2>💡 BR Devs | Brazilian Developers in Canada</h2>
        <p>Welcome! This app is built with Next.js and Firebase and is loosely inspired by Dev.to.</p>
        <p>Sign up for an 👨‍🎤 account, ✍️ write posts, then show 👏 support for content created by other users. All public content is server-rendered and search-engine optimized.</p>
      </div>

      <PostFeed posts={posts} admin={false} />

      {!loading && !postsEnd && <button onClick={getMorePosts} disabled={!(posts.length > 0)}>Load more</button>}

      <Loader show={loading} />

      {postsEnd && 'You have reached the end!'}
    </main>
  );
}