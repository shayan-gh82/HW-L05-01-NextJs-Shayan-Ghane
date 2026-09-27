import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/login", "/api/"] },
    sitemap: "https://hw-l05-01-next-js-shayan-ghane.vercel.app/sitemap.xml",
  };
}
