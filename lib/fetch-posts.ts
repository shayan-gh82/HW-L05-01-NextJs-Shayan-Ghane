type PostRequestOptions = RequestInit & { next?: { revalidate: number } };

/** Retry only transient failures; every attempt has its own bounded timeout. */
export async function fetchPostsResponse(
  url: string,
  fetcher: typeof fetch = fetch,
  pause: (ms: number) => Promise<void> = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
): Promise<Response> {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const options: PostRequestOptions = {
        next: { revalidate: 300 },
        signal: AbortSignal.timeout(5_000),
      };
      const response = await fetcher(url, options);
      if (response.status !== 429 && response.status < 500) return response;
      if (attempt === 2) return response;
      await response.body?.cancel();
    } catch (error) {
      if (attempt === 2) throw error;
    }
    await pause(250 * 2 ** attempt);
  }
  throw new Error("Unable to reach the posts service.");
}
