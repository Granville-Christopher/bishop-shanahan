import type { Metadata } from "next";
import { Providers } from "./Providers";
import "@/index.css"; // Ensure index.css is updated to standard Next.js path if needed, we'll keep it here.

export const metadata: Metadata = {
  title: "Bishop Joseph Shanahan Foundation — Help for the Persecuted in Nigeria",
  description: "A non-profit providing spiritual and material help to victims of religious persecution in Nigeria, and to troubled youth.",
  openGraph: {
    title: "Bishop Joseph Shanahan Foundation",
    description: "Spiritual and material help for victims of religious persecution in Nigeria, and for troubled youth.",
    type: "website",
    url: "https://shanahanfoundation.org", // Placeholder
  },
  twitter: {
    card: "summary_large_image",
    title: "Bishop Joseph Shanahan Foundation",
    description: "Spiritual and material help for victims of religious persecution in Nigeria, and for troubled youth.",
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
