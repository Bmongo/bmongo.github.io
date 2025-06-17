import { globby } from "globby";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const POSTS_ROOT_DIR = "src/posts";

export interface PostInfoItem {
  id: string;
  filename: string;
  fontmatter: {
    title: string;
    date: string;
    desc: string;
  };
}

export const getPostInfos = async () => {
  const filenames = await globby(["**.md", "**.mdx"], { cwd: POSTS_ROOT_DIR });

  const result = await Promise.all(
    filenames.map(async (filename) => {
      const filepath = path.resolve(POSTS_ROOT_DIR, filename);
      const steam = await fs.readFile(filepath);
      const fontmatter = matter(steam).data;
      return {
        id: fontmatter.id,
        filename,
        fontmatter,
      };
    }),
  );

  result.sort((a, b) => {
    return (
      new Date(b.fontmatter.date).getTime() -
      new Date(a.fontmatter.date).getTime()
    );
  });

  return result as PostInfoItem[];
};

export const getPostInfoById = async (id: string) => {
  const allPostsInfo = await getPostInfos();
  const info = allPostsInfo.find((item) => item.id === id);
  if (!info) {
    throw new Error("post not found");
  }
  return info;
};
