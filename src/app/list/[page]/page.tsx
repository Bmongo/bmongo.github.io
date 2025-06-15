import PostList from "../list-page";
import { LIST_POST_PAGE_SIZE } from "@/consts";
import { getPostInfos } from "@/utils/post";
import { redirect } from "next/navigation";
import React from "react";

interface IParams {
  page: string;
}

interface IProps {
  params: Promise<IParams>;
}

const ListPage = async ({ params }: IProps) => {
  const page = (await params).page;
  if (!page || Number(page) <= 1) {
    return redirect("/");
  }
  return <PostList page={Number(page)} />;
};

export const dynamicParams = false;

export const generateStaticParams = async () => {
  const infos = await getPostInfos();
  const len = Math.ceil(infos.length / LIST_POST_PAGE_SIZE);
  return Array.from({ length: len }, (_, i) => ({
    page: (i + 1).toString(),
  }));
};

export default ListPage;
