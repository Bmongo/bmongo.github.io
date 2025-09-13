import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.BASE_PATH,
  /* config options here */
  pageExtensions: ["tsx", "md", "mdx"],
  images: {
    unoptimized: true,
  },
};

const withMDX = createMDX({
  extension: /.(md|mdx)$/,
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      () => (tree) => {
        // 移除原始 Front Matter 节点
        tree.children = tree.children.filter(
          /* eslint-disable @typescript-eslint/no-explicit-any */
          (node: any) => node.type !== "yaml",
        );
      },
    ],
  },
});

export default withMDX(nextConfig);
