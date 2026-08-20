import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts";

type PostPageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.body,
    openGraph: {
      title: post.title,
      description: post.body,
      images: [],
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.body,
      images: [],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <main className="article-page">
      <nav className="site-shell article-nav" aria-label="Article navigation">
        <Link className="brand" href="/" aria-label="The Daily Five home">
          <span className="brand__mark">5</span>
          <span>The Daily Five</span>
        </Link>
        <Link className="back-link" href="/">
          <span aria-hidden="true">←</span> Back to all posts
        </Link>
      </nav>

      <article className="site-shell article">
        <p className="article__meta">Post {String(post.id).padStart(2, "0")}</p>
        <h1>{post.title}</h1>
        <p className="article__body">{post.body}</p>
      </article>
    </main>
  );
}
