import { getPostInfoById, getPostInfos } from "@/utils/post";
import React from "react";
import dynamic from "next/dynamic";
import { SITE_TITLE } from "@/consts";
import Script from "next/script";
import { getPathWithBasePath } from "@/utils/path";

interface IParams {
  slug: string;
}

interface IProps {
  params: Promise<IParams>;
}

const PostDetailPage = async (props: IProps) => {
  const { slug } = await props.params;
  const info = await getPostInfoById(slug);
  const PostContent = dynamic(() => import(`@/posts/${info.filename}`));
  return (
    <article className="prose">
      <h1 className="text-center text-4xl font-black">
        {info.fontmatter.title}
      </h1>
      <div className="text-content-light-desc dark:text-content-dark-desc my-3 text-center">
        {info.fontmatter.date}
      </div>
      <PostContent />
      <Script
        strategy="beforeInteractive"
        src={getPathWithBasePath("/progress-bar.js")}
      />
    </article>
  );
};

export const dynamicParams = false;

export const generateStaticParams = async () => {
  const infos = await getPostInfos();
  const slugs = infos.map((item) => item.id);
  return slugs.map((slug) => ({ slug }));
};

export const generateMetadata = async ({ params }: IProps) => {
  const slug = (await params).slug;
  const info = await getPostInfoById(slug);
  const str = `${info.fontmatter.title} | ${SITE_TITLE}`;
  return {
    title: str,
    description: str,
  };
};

export default PostDetailPage;
