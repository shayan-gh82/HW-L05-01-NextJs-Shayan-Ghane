"use client";

import { useState } from "react";
import { PostCard } from "@/components/post-card";
import type { Post } from "@/types/post";

const BATCH_SIZE = 5;
const TOTAL_POSTS = 100;

type PostFeedProps = {
  initialPosts: Post[];
};

export function PostFeed({ initialPosts }: PostFeedProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasMore = posts.length < TOTAL_POSTS;

  async function loadMorePosts() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/posts?start=${posts.length}&limit=${BATCH_SIZE}`,
      );

      if (!response.ok) {
        throw new Error("The next stories could not be loaded.");
      }

      const nextPosts = (await response.json()) as Post[];
      setPosts((currentPosts) => [...currentPosts, ...nextPosts]);
    } catch {
      setError("We could not open the next chapter. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="section-heading">
        <div>
          <p className="eyebrow eyebrow--dark">Today&apos;s selection</p>
          <h2 id="latest-posts">Latest posts</h2>
        </div>
        <p className="section-heading__meta">
          {String(posts.length).padStart(2, "0")} stories open
        </p>
      </div>

      <div className="post-list" aria-live="polite">
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index + 1} />
        ))}
      </div>

      <div className="load-more">
        <div className="load-more__track" aria-hidden="true">
          <span style={{ width: `${Math.max(5, posts.length)}%` }} />
        </div>
        <p className="load-more__count">
          Showing {posts.length} of {TOTAL_POSTS} stories
        </p>
        {hasMore ? (
          <button
            className="load-more__button"
            type="button"
            onClick={loadMorePosts}
            disabled={isLoading}
          >
            <span className="load-more__button-copy">
              <small>Continue the collection</small>
              {isLoading ? "Opening chapter…" : "Open 5 more stories"}
            </span>
            <span className="load-more__button-icon" aria-hidden="true">＋</span>
          </button>
        ) : (
          <p className="load-more__complete">You reached the end of the collection.</p>
        )}
        {error ? <p className="load-more__error" role="alert">{error}</p> : null}
      </div>
    </>
  );
}
