import { LIST_POST_PAGE_SIZE } from "@/consts";
import { getPostInfos } from "@/utils/post";
import React from "react";
import Pagination from "@/components/Pagination";
import Link from "next/link";

interface IProps {
  page: number;
}

const getCurrentPost = async (page: number, pageSize = LIST_POST_PAGE_SIZE) => {
  const allPosts = await getPostInfos();
  return allPosts.slice((page - 1) * pageSize, page * pageSize);
};

const PostList = async ({ page }: IProps) => {
  const list = await getCurrentPost(page);
  return (
    <>
      <ul>
        {list.map((item) => (
          <li key={item.id} className="my-4">
            <Link href={`/posts/${item.id}`} className="common-link text-xl">
              {item.fontmatter.title}
            </Link>
            <p className="text-content-light-desc dark:text-content-dark-desc m-1">
              {item.fontmatter.date}
            </p>
          </li>
        ))}
      </ul>
      <Pagination page={page} />
    </>
  );
};

export default PostList;
