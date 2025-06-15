import { LIST_POST_PAGE_SIZE } from "@/consts";
import { getPostInfos } from "@/utils/post";
import React from "react";
import ListItem from "@/components/ListItem";
import Pagination from "@/components/Pagination";

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
            <ListItem item={item} />
          </li>
        ))}
      </ul>
      <Pagination page={page} />
    </>
  );
};

export default PostList;
