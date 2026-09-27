import { cache } from "react";
import type { Post } from "@/types/post";
import { fetchPostsResponse } from "@/lib/fetch-posts";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export async function getPosts(start = 0, limit = 5): Promise<Post[]> {
  const query = new URLSearchParams({
    _start: String(start),
    _limit: String(limit),
  });
  const response = await fetchPostsResponse(`${API_URL}?${query}`);

  if (!response.ok) {
    throw new Error("Unable to load posts. Please try again.");
  }

  return (await response.json()) as Post[];
}

export const getPost = cache(async (id: string): Promise<Post | null> => {
  if (!/^\d+$/.test(id) || Number(id) < 1) {
    return null;
  }

  const response = await fetchPostsResponse(`${API_URL}/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Unable to load this post. Please try again.");
  }

  const post = (await response.json()) as Post;
  return post.id ? post : null;
});
