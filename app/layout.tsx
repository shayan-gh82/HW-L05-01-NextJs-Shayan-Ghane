import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hw-l05-01-next-js-shayan-ghane.vercel.app"),
  title: {
    default: "Next.js Dynamic Blog - Shayan Ghane",
    template: "%s | The Daily Five",
  },
  description:
    "A focused Next.js blog featuring five selected posts from JSONPlaceholder.",
  openGraph: {
    title: "The Daily Five",
    description: "Five stories. Then keep exploring.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "The Daily Five" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Daily Five",
    description: "Five stories. Then keep exploring.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
