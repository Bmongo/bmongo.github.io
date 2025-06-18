import TagCustomLink from "@/components/TagCustomLink";
import { getAllPostTags } from "@/utils/post";
import React from "react";

const TagsPage = async () => {
  const tags = await getAllPostTags();
  return (
    <>
      <h2 className="mb-4 text-xl font-medium dark:text-slate-200">Tags:</h2>
      <section>
        {tags.map((tag) => (
          <div key={tag.name} className="my-4 flex items-center">
            <TagCustomLink
              href={`/tags/${tag.name}`}
              title={tag.name}
              suffix={tag.count}
            />
          </div>
        ))}
      </section>
    </>
  );
};

export default TagsPage;
