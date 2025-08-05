import TagCustomLink from "@/components/TagCustomLink";
import { getAllPostTags, getPostInforByTag } from "@/utils/post";
import React from "react";

interface IProps {
  params: Promise<{
    tag: string;
  }>;
}

const TagDetailPage = async (props: IProps) => {
  const { tag } = await props.params;
  const posts = await getPostInforByTag(tag);
  return (
    <section>
      <h2 className="mb-4 text-xl font-medium dark:text-slate-200">
        Tag &apos;{tag}&apos;:
      </h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-4">
            <TagCustomLink
              href={`/posts/${post.id}`}
              title={post.frontmatter.title}
              suffix={post.frontmatter.date}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export const generateStaticParams = async () => {
  const tags = await getAllPostTags();
  return tags.map((tag) => ({
    tag: tag.name,
  }));
};

export default TagDetailPage;
