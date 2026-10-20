import type { NextConfig } from "next";
import resume from "./data/resume.json";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: new URL(resume.site.url).pathname.replace(/\/$/, ""),
};

export default nextConfig;
