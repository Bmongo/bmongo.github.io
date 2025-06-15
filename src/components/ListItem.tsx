import { PostInfoItem } from "@/utils/post";
import Link from "next/link";
import React from "react";

interface IProps {
  item: PostInfoItem;
}

const ListItem = ({ item }: IProps) => {
  return (
    <div>
      <Link
        href={`/posts/${item.id}`}
        className="text-theme-600 text-xl font-medium hover:underline hover:underline-offset-6"
      >
        {item.fontmatter.title}
      </Link>
      <p className="text-content-light-desc dark:text-content-dark-desc m-1">
        {item.fontmatter.date}
      </p>
    </div>
  );
};

export default ListItem;
