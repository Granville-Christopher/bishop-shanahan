import type { Metadata } from "next";
import { Providers } from "./Providers";
import "@/index.css"; // Ensure index.css is updated to standard Next.js path if needed, we'll keep it here.

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://shanahan.vercel.app"),
  title: "Bishop Joseph Shanahan Foundation — Help for the Persecuted in Nigeria",
  description: "A non-profit providing spiritual and material help to victims of religious persecution in Nigeria, and to troubled youth.",
  openGraph: {
    title: "Bishop Joseph Shanahan Foundation",
    description: "Spiritual and material help for victims of religious persecution in Nigeria, and for troubled youth.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/WhatsApp Image 2026-05-16 at 3.51.00 PM.jpeg",
        width: 1200,
        height: 630,
        alt: "Bishop Joseph Shanahan Foundation Community",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bishop Joseph Shanahan Foundation",
    description: "Spiritual and material help for victims of religious persecution in Nigeria, and for troubled youth.",
    images: ["/WhatsApp Image 2026-05-16 at 3.51.00 PM.jpeg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
