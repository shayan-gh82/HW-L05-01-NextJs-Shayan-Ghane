import { AuthAction } from "@/components/auth-action";
import { PostFeed } from "@/components/post-feed";
import { getPosts } from "@/lib/posts";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main>
      <section className="hero" aria-labelledby="page-title">
        <div className="site-shell hero__content">
          <nav className="navbar" aria-label="Primary navigation">
            <Link className="brand" href="/" aria-label="The Daily Five home">
              <span className="brand__mark">5</span>
              <span>The Daily Five</span>
            </Link>
            <div className="navbar__actions">
              <span className="navbar__label">Selected stories</span>
              <AuthAction />
            </div>
          </nav>

          <div className="hero__copy">
            <p className="eyebrow">A small collection worth your time</p>
            <h1 id="page-title">Five stories. Then keep exploring.</h1>
            <p className="hero__description">
              Begin with a focused set of five stories, then open the next
              chapter whenever you are ready to discover more.
            </p>
          </div>
        </div>
      </section>

      <section className="site-shell posts-section" aria-labelledby="latest-posts">
        <PostFeed initialPosts={posts} />
      </section>
    </main>
  );
}
