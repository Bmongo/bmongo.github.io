import { globby } from "globby";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const POSTS_ROOT_DIR = "src/posts";

export interface PostInfoItem {
  id: string;
  filename: string;
  frontmatter: {
    title: string;
    date: string;
    desc: string;
    tags: string[] | string;
  };
}

export const getPostInfos = async () => {
  const filenames = await globby(["**.md", "**.mdx"], { cwd: POSTS_ROOT_DIR });

  const result = await Promise.all(
    filenames.map(async (filename) => {
      const filepath = path.resolve(POSTS_ROOT_DIR, filename);
      const steam = await fs.readFile(filepath);
      const frontmatter = matter(steam).data;
      return {
        id: frontmatter.id,
        filename,
        frontmatter,
      };
    }),
  );

  result.sort((a, b) => {
    return (
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
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

export const getAllPostTags = async () => {
  const posts = await getPostInfos();
  const tags = new Map<string, number>();

  posts.forEach((post) => {
    const frontmatterTags = post.frontmatter.tags;
    if (typeof frontmatterTags === "string") {
      tags.set(frontmatterTags, (tags.get(frontmatterTags) || 0) + 1);
    } else {
      frontmatterTags.forEach((frontmatterTags) => {
        tags.set(frontmatterTags, (tags.get(frontmatterTags) || 0) + 1);
      });
    }
  });

  return Array.from(tags.entries()).map((item) => ({
    name: item[0],
    count: item[1],
  }));
};

export const getPostInfoByTag = async (tag: string) => {
  const posts = await getPostInfos();
  return posts.filter((post) => {
    const frontmatterTags = post.frontmatter.tags;
    if (typeof frontmatterTags === "string") {
      return frontmatterTags === tag;
    } else {
      return frontmatterTags.includes(tag);
    }
  });
};
