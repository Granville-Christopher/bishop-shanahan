import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bishop Joseph Shanahan Foundation",
    short_name: "BJSF",
    description: "Providing spiritual and material help to victims of religious persecution in Nigeria, and to troubled youth.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#b59410",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
