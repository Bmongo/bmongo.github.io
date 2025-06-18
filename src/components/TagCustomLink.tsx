import Link from "next/link";
import React, { ReactNode } from "react";

interface IProps {
  href: string;
  title: string;
  suffix?: ReactNode;
}

const TagCustomLink = (props: IProps) => {
  return (
    <div className="flex">
      <p key={props.title} className="my-4">
        <Link className="common-link text-xl" href={props.href}>
          {props.title}
        </Link>
        <span className="mx-3 opacity-50">{props.suffix}</span>
      </p>
    </div>
  );
};

export default TagCustomLink;
