import React from "react";

export const MAIN_CONTENT_ID = "main-content";

const SkipContentHolder = () => {
  return (
    <a
      className="bg-theme-600 absolute top-8 -left-full p-2 focus:left-8"
      href={`#${MAIN_CONTENT_ID}`}
    >
      Skip to content
    </a>
  );
};

export default SkipContentHolder;
