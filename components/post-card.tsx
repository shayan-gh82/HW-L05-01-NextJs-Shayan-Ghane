import Link from "next/link";
import type { Post } from "@/types/post";

type PostCardProps = {
  post: Post;
  index: number;
};

export function PostCard({ post, index }: PostCardProps) {
  const postUrl = `/posts/${post.id}`;
  const tone = ((index - 1) % 4) + 1;

  return (
    <article className={`post-card post-card--tone-${tone}`}>
      <div>
        <div className="post-card__topline">
          <span className="post-card__number">
            Story {String(index).padStart(2, "0")}
          </span>
          <span className="post-card__reading-time">2 min read</span>
        </div>
        <h3 className="post-card__title">
          <Link href={postUrl}>{post.title}</Link>
        </h3>
        <p className="post-card__body">{post.body}</p>
      </div>

      <Link className="post-card__link" href={postUrl} aria-label={`Read ${post.title}`}>
        <span>Read full story</span>
        <span className="post-card__arrow" aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
