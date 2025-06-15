import { LIST_POST_PAGE_SIZE } from "@/consts";
import { getPostInfos } from "@/utils/post";
import Link from "next/link";
import React from "react";

interface IProps {
  page: number;
}

const LinkButton = ({
  href,
  children,
  disabled,
}: {
  href: string;
  children: React.ReactNode;
  disabled?: boolean;
}) => (
  <Link
    href={href}
    className={`${disabled ? "pointer-events-none opacity-50 select-none" : ""} hover:text-theme-600 my-4`}
  >
    {children}
  </Link>
);

const Pagination = async ({ page }: IProps) => {
  const len = await getPostInfos();
  const totalPage = Math.ceil(len.length / LIST_POST_PAGE_SIZE);
  const prevPage = page - 1 > 0 ? page - 1 : null;
  const nextPage = page + 1 <= totalPage ? page + 1 : null;
  return (
    <footer className="my-4 flex items-center justify-between">
      <LinkButton
        href={prevPage === 1 ? "/" : `/list/${prevPage}`}
        disabled={!prevPage}
      >
        <span className="flex items-center gap-0.5">
          <svg
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
          </svg>
          Prev
        </span>
      </LinkButton>
      <span className="select-none">
        {page} / {totalPage}
      </span>
      <LinkButton href={`/list/${nextPage}`} disabled={!nextPage}>
        <span className="flex items-center gap-0.5">
          Next
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
          </svg>
        </span>
      </LinkButton>
    </footer>
  );
};

export default Pagination;
