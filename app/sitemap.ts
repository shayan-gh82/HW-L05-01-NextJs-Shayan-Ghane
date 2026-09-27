import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://hw-l05-01-next-js-shayan-ghane.vercel.app";
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    ...Array.from({ length: 100 }, (_, index) => ({
      url: `${base}/posts/${index + 1}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
